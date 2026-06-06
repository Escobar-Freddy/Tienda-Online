# Etapa de construcción
FROM node:24-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:24-alpine

WORKDIR /app

# Copiar dependencias y build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "dist/main"]