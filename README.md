# TIENDA EN LINEA

API REST para gestión de tienda online desarrollada con **NestJS**, **TypeORM** y **PostgreSQL**.

# Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/) (v9 o superior)
- [PostgreSQL](https://www.postgresql.org/) (v14 o superior)
- [pgAdmin4](https://www.pgadmin.org/) (opcional, para administrar la BD)

# Instalación y Ejecución

# puedes Clonar el repositorio

# en la terminal o cmd

git clone https://github.com/TU_USUARIO/tienda-online-nestjs.git
cd tienda-online-nestjs

# debes Instalar dependencias

# en la terminal o cmd

npm install

# debes Configurar variables de entorno

# Crear un archivo .env en la raíz del proyecto:

# configura o revisa este archivo

.env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=tu_contrase;a de postgres
DB_NAME=tienda

# debes crear la base de datos

# Desde pgAdmin4

sql
CREATE DATABASE tienda;

# ejecuta

# Modo desarrollo en visual code

npm run start:dev

La API estará disponible en: http://localhost:3000

# Documentación API

La documentación interactiva está disponible en:

text
http://localhost:3000/api/docs

# Ejemplos de uso con Postman

# Crear un cliente

json
POST http://localhost:3000/clientes
{
"nombres": "Freddy Elias",
"paterno": "Escobar",
"materno": "Catunta",
"email": "fescboar@email.com"
}

# Crear una categoría

json
POST http://localhost:3000/categorias
{
"nombre": "Electrónicos",
"descripcion": "Productos electrónicos"
}

# Crear un producto

json
POST http://localhost:3000/productos
{
"nombre": "Laptop",
"descripcion": "Laptop Gaming",
"precio": 1299.99,
"stock": 10,
"categoriaId": 1
}

# Crear una orden

json
POST http://localhost:3000/ordenes
{
"clienteId": 1,
"estado": "pendiente",
"productos": [
{"idProducto": 1, "cantidad": 1}
]
}

# Endpoints disponibles

# Clientes

POST /clientes Crear cliente
GET /clientes Listar clientes
GET /clientes/{id} Obtener cliente
PATCH /clientes/{id} Actualizar cliente
DELETE /clientes/{id} Eliminar cliente

# Categorías

POST /categorias Crear categoría
GET /categorias Listar categorías
GET /categorias/{id} Obtener categoría con productos
PATCH /categorias/{id} Actualizar categoría
DELETE /categorias/{id} Eliminar categoría

# Productos

POST /productos Crear producto
GET /productos Listar productos
GET /productos/{id} Obtener producto
PATCH /productos/{id} Actualizar producto
DELETE /productos/{id} Eliminar producto

# Órdenes

POST /ordenes Crear orden
GET /ordenes Listar órdenes
GET /ordenes/{id} Obtener orden
PATCH /ordenes/{id} Actualizar orden
PATCH /ordenes/{id}/estado Cambiar estado
DELETE /ordenes/{id} Eliminar orden

### 3.1 **para Ejecutar el proyecto**

npm run start:dev

### documentacion

http://localhost:3000/api/docs
