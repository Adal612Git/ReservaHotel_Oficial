# Etapa 1: Builder — instala deps, genera Prisma Client y compila
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copia definición de dependencias y las instala (prod + dev)
COPY package*.json ./
RUN npm ci --ignore-scripts

# 2. Copia todo el código (incluye prisma/schema.prisma)
COPY . .

# 3. Genera Prisma Client
RUN npx prisma generate

# 4. Compila la aplicación (NestJS)
RUN npm run build

# 5. Elimina devDependencies para aligerar
RUN npm prune --omit=dev

# Etapa 2: Producción — sólo dist y node_modules optimizados
FROM node:20-alpine AS production
WORKDIR /app

# 1. Copia la app compilada y las deps de producción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# 2. Expone el puerto
EXPOSE 3000

# 3. Arranca la aplicación
CMD ["node", "dist/src/main.js"]