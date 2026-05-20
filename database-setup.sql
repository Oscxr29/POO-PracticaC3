-- Script para crear/limpiar tablas de la base de datos ecommerce
-- Ejecuta estos comandos en PostgreSQL

-- 1. LIMPIAR DATOS EXISTENTES (si los hay)
DELETE FROM "order_detail";
DELETE FROM "order";
DELETE FROM "product";
DELETE FROM "category";
DELETE FROM "user";

-- 2. CREAR TABLA category
CREATE TABLE IF NOT EXISTS "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(15) NOT NULL UNIQUE
);

-- 3. INSERTAR CATEGORÍAS DE EJEMPLO
INSERT INTO "category" ("name") VALUES
    ('Electrónica'),
    ('Ropa'),
    ('Libros'),
    ('Hogar'),
    ('Deportes');

-- 4. ACTUALIZAR TABLA user (si existen valores NULL)
UPDATE "user" SET "name" = 'Usuario Defecto' WHERE "name" IS NULL;

-- Verificar que todo se creó correctamente
SELECT * FROM "category";
SELECT * FROM "user";
