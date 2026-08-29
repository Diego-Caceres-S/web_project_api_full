module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (statusCode === 500) {
    res.status(500).send({ message: "An error has ocurred on the server" });
  } else {
    res.status(statusCode).send({ message });
  }

  next();
};
