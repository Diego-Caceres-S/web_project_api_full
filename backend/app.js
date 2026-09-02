require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { isCelebrateError } = require('celebrate');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./utils/logger');
const centralizedErrorHandler = require('./middlewares/errors');
const NotFoundError = require('./errors/NotFoundError');
const BadRequestError = require('./errors/BadRequestError');
const { createUser, login } = require('./controllers/users');
const { validateCreateUser, validateLogin } = require('./utils/validation');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const { MONGO_URL = 'mongodb://127.0.0.1:27017/aroundb' } = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError('El recurso solicitado no existe'));
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    return next(new BadRequestError('Los datos enviados no son válidos'));
  }
  return next(err);
});

app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
