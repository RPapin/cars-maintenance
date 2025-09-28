#!/bin/bash

# ===== SCRIPT DE BUILD POUR RAILWAY =====

echo "🚂 Starting Railway build process..."

# Étape 1: Vérifier Node.js
echo "📋 Node.js version:"
node --version
npm --version

# Étape 2: Installer les dépendances du frontend
echo "📦 Installing frontend dependencies..."
cd frontend
npm ci
if [ $? -ne 0 ]; then
    echo "❌ Frontend npm install failed"
    exit 1
fi

# Étape 3: Build du frontend Angular
echo "🔨 Building Angular frontend..."
npx ng build --configuration production
if [ $? -ne 0 ]; then
    echo "❌ Angular build failed"
    exit 1
fi

# Étape 4: Vérifier que les fichiers sont créés
echo "✅ Checking build output..."
ls -la dist/
ls -la dist/cars-maintenance/

if [ ! -f "dist/cars-maintenance/index.html" ]; then
    echo "❌ index.html not found in build output"
    exit 1
fi

# Étape 5: Installer les dépendances du backend
echo "📦 Installing backend dependencies..."
cd ../server
npm ci --only=production
if [ $? -ne 0 ]; then
    echo "❌ Backend npm install failed"
    exit 1
fi

echo "🎉 Build completed successfully!"
echo "📁 Frontend built in: frontend/dist/cars-maintenance/"
echo "🚀 Ready for deployment!"