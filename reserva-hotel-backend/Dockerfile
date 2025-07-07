# Etapa 1: Builder — instala deps, compila y genera Prisma Client
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copia definición de dependencias
COPY package*.json ./

# 2. Instala todas las dependencias (prod + dev) para compilar
RUN npm ci --ignore-scripts

# 3. Copia todo el código fuente (incluye prisma/schema.prisma)
COPY . .

# 4. Compila la aplicación (NestJS)
RUN npm run build

# 5. Elimina devDependencies para preparar el entorno de producción
RUN npm prune --omit=dev

# 6. Genera Prisma Client después de prune
RUN npx prisma generate

# Etapa 2: Producción — imagen liviana solo con lo necesario
FROM node:20-alpine AS production
WORKDIR /app

# 1. Copia la app compilada y dependencias de producción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# 2. Expone el puerto
EXPOSE 3000

# 3. Arranca la aplicación
CMD ["node", "dist/src/main.js"]
