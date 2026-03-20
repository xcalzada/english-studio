# Hono API — Node 22 Alpine
FROM node:22-alpine
WORKDIR /app

# Instalar dependencias de producción
COPY package.json ./
RUN npm install --omit=dev

# Copiar fuentes TypeScript
COPY src/ ./src/

EXPOSE 3001
ENV PORT=3001

# tsx ejecuta TypeScript directamente (sin paso de compilación separado)
CMD ["npx", "tsx", "src/index.ts"]
