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
├── controllers/           # Controlan las peticiones HTTP y responden JSON
│   ├── user.controller.ts
│   └── category.controller.ts
├── database/              # Configuración y conexión con TypeORM
│   └── db.ts
├── entities/              # Modelos que representan tablas de la BD
│   ├── user.entity.ts
│   ├── category.entity.ts
│   ├── product.entity.ts
│   ├── order.entity.ts
│   └── order-detail.entity.ts
├── interfaces/            # Tipos y contratos de datos
│   ├── user.interface.ts
│   └── category.interface.ts
├── routes/                # Definición de endpoints
│   ├── user.route.ts
│   └── category.route.ts
├── services/              # Lógica de negocio y acceso a la BD
│   ├── user.service.ts
│   └── category.service.ts
└── index.ts               # Punto de entrada de la aplicación

Archivos raíz importantes:
├── .env.example           # Template de variables (sin secretos)
├── .gitignore             # Archivos ignorados en Git
├── database-setup.sql     # Script para crear tablas e insertar datos
├── package.json           # Dependencias del proyecto
├── tsconfig.json          # Configuración de TypeScript
└── README.md              # Este archivo
```

## Ejemplo completo: Cómo funciona el flujo

Supongamos que haces una petición POST para crear un usuario:

```
1. CLIENTE (Thunder Client/Postman)
   ↓ Envía petición HTTP
   POST /users
   { "name": "Juan", "email": "juan@mail.com", "password": "123456" }
   
2. SERVIDOR - src/index.ts
   ↓ Express recibe la petición y enruta a las rutas
   
3. src/routes/user.route.ts
   ↓ Identifica que es POST /users
   ↓ Llama al controlador correspondiente
   
4. src/controllers/user.controller.ts - createUser()
   ↓ Extrae datos del body: { name, email, password }
   ↓ Intenta crear el usuario llamando al servicio
   
5. src/services/user.service.ts - createUser()
   ↓ Valida que email sea válido (regex)
   ↓ Valida que password tenga al menos 6 caracteres
   ↓ Hace hash de la contraseña con bcrypt
   ↓ Guarda en la BD usando TypeORM
   ↓ Retorna el usuario (sin password)
   
6. src/database/db.ts
   ↓ TypeORM ejecuta INSERT en PostgreSQL
   ↓ Retorna el usuario creado
   
7. src/controllers/user.controller.ts
   ↓ Recibe el usuario creado
   ↓ Arma la respuesta JSON
   ↓ Devuelve status 201 Created
   
8. CLIENTE (Thunder Client/Postman)
   ↓ Recibe respuesta:
   { "status": 201, "data": {...}, "message": "..." }
```

**Cada capa tiene una responsabilidad clara:**
- **Routes**: Define las URLs
- **Controllers**: Valida HTTP (params, body, headers)
- **Services**: Valida lógica de negocio (email único, password segura)
- **Database**: Gestiona la persistencia en BD
- **Entities**: Define la estructura de datos

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

### USER CRUD

#### Obtener todos los usuarios

```http
GET /users
```

**Respuesta (200 OK):**
```json
{
  "status": 200,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Juan",
      "email": "juan@mail.com"
    },
    {
      "id": "223e4567-e89b-12d3-a456-426614174001",
      "name": "María",
      "email": "maria@mail.com"
    }
  ],
  "message": "Usuarios obtenidos correctamente"
}
```

#### Obtener un usuario por ID

```http
GET /users/:id
```

**Parámetro:** `id` (UUID del usuario)

**Ejemplo:** `GET /users/123e4567-e89b-12d3-a456-426614174000`

**Respuesta (200 OK):**
```json
{
  "status": 200,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Juan",
    "email": "juan@mail.com"
  },
  "message": "Usuario obtenido correctamente"
}
```

**Respuesta (404 Not Found):**
```json
{
  "status": 404,
  "message": "Usuario no encontrado"
}
```

#### Crear un usuario

```http
POST /users
Content-Type: application/json
```

**Body (requerido):**
```json
{
  "name": "Juan",
  "email": "juan@mail.com",
  "password": "123456"
}
```

**Validaciones:**
- `name`: string requerido, máximo 50 caracteres
- `email`: string requerido, debe ser un email válido, único en BD
- `password`: string requerido, mínimo 6 caracteres

**Respuesta (201 Created):**
```json
{
  "status": 201,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Juan",
    "email": "juan@mail.com"
  },
  "message": "Usuario creado correctamente"
}
```

**Respuesta (400 Bad Request):**
```json
{
  "status": 400,
  "message": "El email ya existe o el formato no es válido"
}
```

#### Actualizar un usuario

```http
PUT /users/:id
Content-Type: application/json
```

**Parámetro:** `id` (UUID del usuario)

**Body (parcial, solo lo que quieras cambiar):**
```json
{
  "name": "Juan Actualizado",
  "password": "nuevaPassword123"
}
```

**Respuesta (200 OK):**
```json
{
  "status": 200,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Juan Actualizado",
    "email": "juan@mail.com"
  },
  "message": "Usuario actualizado correctamente"
}
```

#### Eliminar un usuario

```http
DELETE /users/:id
```

**Parámetro:** `id` (UUID del usuario)

**Respuesta (200 OK):**
```json
{
  "status": 200,
  "message": "Usuario eliminado correctamente"
}
```

---

### CATEGORY CRUD

#### Obtener todas las categorías

```http
GET /categories
```

**Respuesta (200 OK):**
```json
{
  "status": 200,
  "data": [
    { "id": 1, "name": "Electrónica" },
    { "id": 2, "name": "Ropa" },
    { "id": 3, "name": "Libros" },
    { "id": 4, "name": "Hogar" },
    { "id": 5, "name": "Deportes" }
  ],
  "message": "Categorías obtenidas correctamente"
}
```

#### Obtener una categoría por ID

```http
GET /categories/:id
```

**Parámetro:** `id` (número entero)

**Ejemplo:** `GET /categories/1`

**Respuesta (200 OK):**
```json
{
  "status": 200,
  "data": {
    "id": 1,
    "name": "Electrónica"
  },
  "message": "Categoría obtenida correctamente"
}
```

#### Crear una categoría

```http
POST /categories
Content-Type: application/json
```

**Body (requerido):**
```json
{
  "name": "Muebles"
}
```

**Validaciones:**
- `name`: string requerido, máximo 15 caracteres, único en BD

**Respuesta (201 Created):**
```json
{
  "status": 201,
  "data": {
    "id": 6,
    "name": "Muebles"
  },
  "message": "Categoría creada correctamente"
}
```

#### Actualizar una categoría

```http
PUT /categories/:id
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Tech & Gadgets"
}
```

**Respuesta (200 OK):**
```json
{
  "status": 200,
  "data": {
    "id": 1,
    "name": "Tech & Gadgets"
  },
  "message": "Categoría actualizada correctamente"
}
```

#### Eliminar una categoría

```http
DELETE /categories/:id
```

**Respuesta (200 OK):**
```json
{
  "status": 200,
  "message": "Categoría eliminada correctamente"
}
```

---

## Códigos de estado HTTP utilizados

| Código | Significado | Cuándo ocurre |
|--------|-------------|---------------|
| `200 OK` | Éxito | GET, PUT, DELETE exitosos |
| `201 Created` | Creado | POST exitoso |
| `400 Bad Request` | Error del cliente | Datos inválidos, email duplicado, validación fallida |
| `404 Not Found` | No encontrado | ID no existe en la BD |
| `500 Server Error` | Error del servidor | Error inesperado en la aplicación |

## Seguridad aplicada

Este proyecto ya incluye varias prácticas importantes:

- **Hashing de contraseñas**: Las contraseñas se guardan con hash usando `bcrypt` (10 salt rounds), nunca en texto plano.
- **Respuestas seguras**: Las respuestas nunca devuelven el campo `password`.
- **Validaciones**: Se valida email, contraseña y otros campos antes de guardar.
- **Manejo de errores**: Los errores devuelven status HTTP adecuados sin exponer detalles internos.
- **Variables de entorno**: Las credenciales sensibles se guardan en `.env`, no en el código.

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

## Instalación y Configuración

### Requisitos previos

- Node.js v18+
- PostgreSQL 14+ (o Docker con PostgreSQL)
- npm o yarn

### Pasos para configurar localmente

#### 1. Clonar el proyecto

```bash
git clone <URL-DEL-REPOSITORIO>
cd "Proyecto API"
```

#### 2. Instalar dependencias

```bash
npm install
```

#### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DATABASE=ecommerce
```

#### 4. Crear la estructura de Base de Datos

Ejecuta el script SQL que crea las tablas e inserta datos iniciales:

**Opción A:** Con psql instalado localmente
```bash
psql -U postgres -d ecommerce -f database-setup.sql
```

**Opción B:** Con Docker
```bash
docker exec -e PGPASSWORD=postgres db_ecommerce psql -U postgres -d ecommerce -f database-setup.sql
```

#### 5. Iniciar el servidor

```bash
npm run dev
```

El servidor estará disponible en: **`http://localhost:3000`**

### Archivos importantes

- **`database-setup.sql`** — Script que crea las tablas e inserta datos iniciales. Se sube a GitHub para que otros desarrolladores hagan setup local.
- **`.env.example`** — Template de variables de entorno (sin secretos). Se sube a GitHub.
- **`.env`** — Archivo local con credenciales reales. **NO se sube a GitHub** (está en `.gitignore`).

## Estado del proyecto

### ✅ Completado

- [x] Conexión TypeORM + PostgreSQL con Docker
- [x] 5 entidades del modelo (User, Category, Product, Order, OrderDetail)
- [x] User CRUD completo (Create, Read, Update, Delete)
- [x] Category CRUD completo (Create, Read, Update, Delete)
- [x] Validaciones en servicios
- [x] Hashing de contraseñas con bcrypt
- [x] Estructura de 3 capas (routes → controllers → services)
- [x] Variables de entorno configurables
- [x] Documentación en README

### 🔄 En progreso / Próximas mejoras

- [ ] Product CRUD (previsto para miércoles)
- [ ] Order CRUD
- [ ] OrderDetail CRUD
- [ ] Agregar Swagger/OpenAPI para documentación interactiva
- [ ] Separar validaciones en middlewares
- [ ] Agregar manejo centralizado de errores
- [ ] Implementar autenticación con JWT
- [ ] Agregar migraciones de TypeORM
- [ ] Tests automatizados (Jest)
- [ ] Logging con morgan

## Cómo ejecutar el proyecto

### Scripts disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (con recarga automática)
npm run dev

# Compilar TypeScript a JavaScript
npm run build

# Ver la versión de TypeScript y dependencias
npm list
```

### Iniciando el servidor

```bash
npm run dev
```

Deberías ver en la terminal:
```
DB conectada
Servidor corriendo en http://localhost:3000
```

---

## Pruebas manuales con Thunder Client

Thunder Client es una extensión de VS Code que permite hacer requests HTTP fácilmente.

### Instalación

1. Abre VS Code
2. Ve a **Extensiones** (Ctrl+Shift+X)
3. Busca "Thunder Client"
4. Instala la extensión oficial

### Ejemplo de prueba completa

**1. Crear un usuario:**
- Método: `POST`
- URL: `http://localhost:3000/users`
- Headers: `Content-Type: application/json`
- Body: `{ "name": "Juan", "email": "juan@mail.com", "password": "123456" }`

**2. Obtener todos los usuarios:**
- Método: `GET`
- URL: `http://localhost:3000/users`

**3. Crear una categoría:**
- Método: `POST`
- URL: `http://localhost:3000/categories`
- Headers: `Content-Type: application/json`
- Body: `{ "name": "Electrónica" }`

**4. Obtener todas las categorías:**
- Método: `GET`
- URL: `http://localhost:3000/categories`

---

## Conclusión

Este proyecto es una base sólida para aprender backend con TypeScript. La meta no es solo que funcione, sino que quede entendible, ordenado y listo para crecer.