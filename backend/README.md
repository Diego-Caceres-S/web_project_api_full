# Around the U.S. — Backend con Express

## Descripción

Este proyecto es el backend de "Around the U.S.", construido con **Node.js**, **Express** y **MongoDB** (a través de **Mongoose**). Expone una API REST que permite gestionar usuarios y tarjetas (cards), con registro/inicio de sesión reales (JWT + bcrypt), validación de datos con celebrate/Joi, manejo centralizado de errores y registro de solicitudes/errores.

## URL de la aplicación

_(agrega aquí el dominio una vez desplegado, ej: https://around.tudominio.com)_

## Tecnologías y técnicas utilizadas

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (jsonwebtoken) para la autenticación
- bcryptjs para el hash de contraseñas
- celebrate + Joi para la validación de solicitudes
- winston + express-winston para el registro de solicitudes/errores
- CORS habilitado para conectar con el front-end
- Manejo centralizado de errores

## Autenticación

- `POST /signup` — Registra un usuario nuevo (`email`, `password`, y opcionalmente `name`, `about`, `avatar`).
- `POST /signin` — Inicia sesión (`email`, `password`) y devuelve un JWT válido por 7 días.
- `GET /users/me` — Devuelve los datos del usuario autenticado (requiere `Authorization: Bearer <token>`).

Todas las rutas de abajo (excepto `/signup` y `/signin`) requieren ese mismo encabezado de autorización.

## Funcionalidad

### Usuarios

- `GET /users` — Devuelve la lista completa de usuarios.
- `GET /users/:userId` — Devuelve un usuario específico según su `_id`. Si no existe, responde con un error 404.
- `PATCH /users/me` — Actualiza el perfil (`name`, `about`) del usuario autenticado.
- `PATCH /users/me/avatar` — Actualiza el avatar del usuario autenticado.

### Tarjetas (cards)

- `GET /cards` — Devuelve la lista completa de tarjetas.
- `POST /cards` — Crea una nueva tarjeta (`name`, `link`), asignando como `owner` el `_id` del usuario autenticado.
- `DELETE /cards/:cardId` — Elimina una tarjeta según su `_id`.
- `PUT /cards/:cardId/likes` — Da like a una tarjeta (agrega el `_id` del usuario al array `likes`, sin duplicados).
- `DELETE /cards/:cardId/likes` — Quita el like de una tarjeta (elimina el `_id` del usuario del array `likes`).

Cualquier otra ruta no definida responde con un error 404 y el mensaje `"Recurso solicitado no encontrado"`.

### Manejo de errores

- **400** — Datos inválidos al crear/actualizar un usuario o tarjeta, o ID con formato inválido.
- **404** — Usuario o tarjeta no encontrado.
- **500** — Error inesperado del servidor.

### Autorización temporal

Mientras no se implementa autenticación real, un middleware en `app.js` agrega un `req.user._id` fijo a cada petición, utilizado por los controladores para operaciones como crear tarjetas o dar like.

## Base de datos

El proyecto se conecta a una base de datos MongoDB local:

```
mongodb://localhost:27017/aroundb
```

### Modelos

- **user** (`models/user.js`): `name`, `about`, `avatar` (validado con expresión regular).
- **card** (`models/data.js`): `name`, `link` (validado con expresión regular), `owner` (ref a `user`), `likes` (array de refs a `user`), `createdAt`.

## Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) (v5)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [ESLint](https://eslint.org/) con la configuración `airbnb-base`
- [Nodemon](https://nodemon.io/) para desarrollo

## Instalación

```bash
npm install
```

## Ejecución

Asegúrate de tener MongoDB corriendo localmente antes de iniciar el servidor.

Modo producción:

```bash
npm run start
```

Modo desarrollo (con recarga automática):

```bash
npm run dev
```

El servidor se levanta por defecto en `http://localhost:3000`.

## Linter

```bash
npm run lint
```

## Estructura del proyecto

```
├── app.js
├── controllers
│   ├── cards.js
│   └── users.js
├── models
│   ├── data.js
│   └── user.js
├── routes
│   ├── cards.js
│   └── users.js
├── .editorconfig
├── .eslintrc
├── .gitignore
└── package.json
```

## Pruebas

Las rutas fueron probadas manualmente con Postman, verificando los casos de éxito y de error (usuario/tarjeta no encontrado, datos inválidos, ruta inexistente).
