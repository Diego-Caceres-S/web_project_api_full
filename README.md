# Around The U.S.

Around The U.S. es una red social de fotografías de viajes. Los usuarios pueden registrarse, iniciar sesión, editar su perfil y avatar, agregar tarjetas con fotos de lugares, darles "me gusta" y eliminarlas.

## URL de la aplicación

**https://around-diego.mooo.com**

## Descripción del proyecto y funcionalidad

Este proyecto está dividido en dos partes que viven en el mismo repositorio:

- **`frontend/`** — la interfaz de usuario, construida en React.
- **`backend/`** — la API REST, construida en Node.js/Express, que guarda los datos en MongoDB.

### Funcionalidad implementada

- Registro e inicio de sesión de usuarios, con contraseñas guardadas de forma segura (hash con bcrypt).
- Autenticación mediante JSON Web Tokens (JWT), válidos por 7 días.
- La sesión se mantiene guardada en el navegador (localStorage), así que no hace falta iniciar sesión de nuevo en cada visita.
- La ruta principal (`/`) solo es accesible para usuarios autorizados; los no autorizados son redirigidos automáticamente a la pantalla de inicio de sesión.
- Edición de perfil (nombre y descripción) y de avatar.
- Agregar y eliminar tarjetas de lugares.
- Dar y quitar "me gusta" a las tarjetas.
- Un usuario no puede eliminar tarjetas creadas por otros usuarios.
- Validación de todos los datos que llegan al servidor.
- Manejo centralizado de errores, con códigos de estado HTTP apropiados (400, 401, 403, 404, 409, 500).
- Registro de solicitudes y errores en archivos de log.

## Capturas de pantalla

_(agrega aquí tus capturas o GIFs mostrando el registro, login, perfil y tarjetas)_

## Video de demostración

_(agrega aquí el link al video, si lo grabas)_

## Tecnologías y técnicas utilizadas

### Frontend

- React (componentes funcionales + Hooks: `useState`, `useEffect`)
- React Router (manejo de rutas `/signin`, `/signup`, `/`)
- Context API (`CurrentUserContext`)
- Vite como entorno de desarrollo
- CSS con metodología BEM
- Fetch API para las solicitudes al backend

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (`jsonwebtoken`) para la autenticación
- `bcryptjs` para el hash de contraseñas
- `celebrate` + Joi para la validación de solicitudes
- `winston` + `express-winston` para el registro de solicitudes y errores
- CORS habilitado para conectar con el frontend
- Manejo centralizado de errores con clases de error personalizadas

### Infraestructura / despliegue

- Servidor en la nube: Google Cloud (Compute Engine, Ubuntu)
- Nginx como servidor web y proxy inverso (sirve el frontend y redirige `/api/` al backend)
- PM2 como gestor de procesos (mantiene el backend corriendo, incluso tras reinicios del servidor)
- Dominio gratuito vía FreeDNS
- Certificado HTTPS emitido con Let's Encrypt (Certbot)

## Estructura del repositorio

```
.
├── backend/       API REST (Node.js/Express)
├── frontend/      Interfaz de usuario (React)
└── README.md
```

## Cómo correr el proyecto localmente

### Requisitos previos

- Node.js instalado
- MongoDB corriendo localmente (o una URL de conexión a MongoDB Atlas)

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

El servidor queda escuchando en `http://localhost:3000`.

### Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Abre la dirección que te indique la terminal (normalmente `http://localhost:5173`).

## Variables de entorno

### Backend (`backend/.env`)

| Variable     | Descripción                                        |
| ------------ | -------------------------------------------------- |
| `NODE_ENV`   | `development` o `production`                       |
| `PORT`       | Puerto donde corre el servidor (por defecto 3000)  |
| `MONGO_URL`  | Cadena de conexión a MongoDB                       |
| `JWT_SECRET` | Clave secreta para firmar/verificar los tokens JWT |

### Frontend (`frontend/.env`, opcional)

| Variable       | Descripción                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `VITE_API_URL` | URL base del backend (`/api` en producción, `http://localhost:3000` en desarrollo) |

## Endpoints principales de la API

| Método | Ruta                   | Descripción                   | Requiere token |
| ------ | ---------------------- | ----------------------------- | -------------- |
| POST   | `/signup`              | Registrar un usuario nuevo    | No             |
| POST   | `/signin`              | Iniciar sesión                | No             |
| GET    | `/users/me`            | Datos del usuario autenticado | Sí             |
| PATCH  | `/users/me`            | Actualizar perfil             | Sí             |
| PATCH  | `/users/me/avatar`     | Actualizar avatar             | Sí             |
| GET    | `/cards`               | Listar tarjetas               | Sí             |
| POST   | `/cards`               | Crear tarjeta                 | Sí             |
| DELETE | `/cards/:cardId`       | Eliminar tarjeta propia       | Sí             |
| PUT    | `/cards/:cardId/likes` | Dar like                      | Sí             |
| DELETE | `/cards/:cardId/likes` | Quitar like                   | Sí             |

## Autor

Diego Cáceres
