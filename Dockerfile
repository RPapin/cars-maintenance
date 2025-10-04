# ===== MULTI-STAGE BUILD POUR RAILWAY =====

# Stage 1: Build Angular Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copier les fichiers de dépendances du frontend
COPY frontend/package*.json ./

# Installer TOUTES les dépendances (prod + dev) pour le build
RUN npm ci

# Copier le code source du frontend
COPY frontend/ ./

# Build de production Angular
RUN npm run build:prod

# Vérifier la structure de build
RUN ls -la dist/
RUN ls -la dist/*/ || echo "No subdirectory in dist"

# Stage 2: Setup Backend + Frontend built
FROM node:18-alpine AS production

WORKDIR /app

# Installer les dépendances système nécessaires
RUN apk add --no-cache postgresql-client

# Copier les fichiers de dépendances du backend
COPY server/package*.json ./server/

# Installer les dépendances du backend
WORKDIR /app/server
RUN npm ci --only=production

# Copier le code source du backend
COPY server/ ./

# Copier le frontend buildé depuis le stage précédent
COPY --from=frontend-builder /app/frontend/dist/cars-maintenance /app/frontend/dist/cars-maintenance

# Copier le package.json principal
COPY package.json /app/

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV APP_PORT=3000

# Port exposé
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]