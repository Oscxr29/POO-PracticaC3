# Proyecto API

API REST construida con Node.js, Express, TypeScript, TypeORM y PostgreSQL. Este proyecto funciona como base de aprendizaje para una arquitectura simple pero profesional, con separación entre rutas, controladores, servicios, entidades y conexión a base de datos.

## Objetivo del proyecto

El objetivo principal es construir una API clara, ordenada y fácil de mantener. El proyecto nació como práctica para aprender a conectar TypeORM con PostgreSQL, trabajar con entidades, exponer endpoints REST y organizar el código por capas.

## Tecnologías usadas

- Node.js
- Express
- TypeScript
- TypeORM
- PostgreSQL
- Docker
- dotenv
- bcrypt
- express-validator
- morgan

## Estructura general

```text
src/
  controllers/        Controlan las peticiones HTTP.
  database/           Configuración y conexión con TypeORM.
  entities/           Modelos que representan tablas de la base de datos.
  interfaces/         Tipos y contratos de datos.
  routes/             Definición de endpoints.
  services/           Lógica de negocio y acceso a la base de datos.
  index.ts            Punto de entrada de la aplicación.
```

## Cómo funciona la API

El flujo real de la aplicación es este:

1. El cliente hace una petición HTTP.
2. La ruta recibe la petición y la envía al controlador.
3. El controlador valida lo necesario y llama al servicio.
4. El servicio aplica la lógica de negocio y usa TypeORM para consultar la base de datos.
5. La base de datos responde.
6. El controlador devuelve una respuesta JSON al cliente.

## Arranque del proyecto

El archivo `src/index.ts` hace tres cosas importantes:

1. Crea la app de Express.
2. Inicializa la base de datos con `initializeDatabase()`.
3. Monta las rutas y levanta el servidor en el puerto `3000`.

## Variables de entorno

El proyecto lee la configuración desde `.env`.

Ejemplo de variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DATABASE=ecommerce
```

Nota importante:
- El código acepta `DATABASE` y también puede tomar `DB_NAME` como respaldo.
- No se debe subir el archivo `.env` real a GitHub.

## Base de datos

Se usa PostgreSQL dentro de Docker. La aplicación se conecta a una base llamada `ecommerce`.

La tabla principal ya alineada con la entidad `User` contiene estas columnas:

- `id`
- `name`
- `email`
- `password`

## Entidades del proyecto

### User

Representa a los usuarios del sistema.

Campos principales:

- `id` UUID
- `name` varchar(50)
- `email` varchar(25), único
- `password` varchar(100)

### Category

Representa categorías de productos.

### Product

Representa productos y su relación con una categoría.

### Order

Representa pedidos hechos por un usuario.

### OrderDetail

Representa el detalle de cada pedido.

## Relación entre capas

### Routes

Definen qué URL existe y qué controlador debe atenderla.

### Controllers

Reciben la petición, extraen parámetros y responden con JSON.

### Services

Contienen la lógica de negocio, validaciones y acceso a la base de datos.

### Entities

Representan la estructura de las tablas.

## Endpoints actuales

La API actualmente expone estas rutas para usuarios.

### Obtener todos los usuarios

```http
GET /users
```

Respuesta esperada: `200 OK`

### Obtener un usuario por ID

```http
GET /users/:id
```

Respuesta esperada: `200 OK` o `404 Not Found`

### Crear un usuario

```http
POST /users
```

Body JSON:

```json
{
  "name": "Juan",
  "email": "juan@mail.com",
  "password": "123456"
}
```

Respuesta esperada: `201 Created`

### Actualizar un usuario

```http
PUT /users/:id
```

Body JSON de ejemplo:

```json
{
  "name": "Juan Actualizado"
}
```

Respuesta esperada: `200 OK`

### Eliminar un usuario

```http
DELETE /users/:id
```

Respuesta esperada: `200 OK`

## Seguridad aplicada

Este proyecto ya incluye varias prácticas importantes:

- Las contraseñas se guardan con hash usando `bcrypt`.
- Las respuestas no devuelven el campo `password`.
- Los errores de entrada se responden con status adecuados.

## Pruebas manuales recomendadas

1. Crear un usuario.
2. Listar usuarios.
3. Consultar el usuario por ID.
4. Actualizar el usuario.
5. Eliminar el usuario.
6. Probar un email inválido.
7. Probar una contraseña corta.

## Registro de estudio

Esta sección sirve como bitácora del aprendizaje del proyecto.

### Lo que se aprendió

- Cómo separar un proyecto en rutas, controladores y servicios.
- Cómo conectar Express con TypeORM.
- Cómo trabajar con PostgreSQL dentro de Docker.
- Cómo definir entidades a partir de una estructura de base de datos.
- Cómo validar datos antes de guardarlos.
- Cómo proteger contraseñas con hash.

### Problemas resueltos

- La base de datos tenía columnas viejas como `nombre` y se corrigió a `name`.
- La aplicación tenía un arranque duplicado en `index.ts` y se limpió.
- Se ajustó la lectura de variables de entorno para usar `DATABASE`.

### Buenas prácticas para seguir

- No subir `.env` real a GitHub.
- Mantener `README.md` actualizado.
- Guardar ejemplos de requests para Thunder Client.
- Agregar Swagger cuando el proyecto crezca.
- Documentar cada cambio importante en la bitácora.

## Próximas mejoras

- Agregar Swagger/OpenAPI.
- Separar validaciones en middlewares.
- Agregar manejo centralizado de errores.
- Implementar autenticación con JWT.
- Crear endpoints para Category, Product, Order y OrderDetail.
- Agregar migraciones de TypeORM para no depender de sincronización manual.

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Asegúrate de que Docker esté encendido y que el contenedor de PostgreSQL esté corriendo antes de iniciar la app.

## Conclusión

Este proyecto es una base sólida para aprender backend con TypeScript. La meta no es solo que funcione, sino que quede entendible, ordenado y listo para crecer.