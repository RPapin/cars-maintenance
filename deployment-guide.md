# Guide de déploiement Cars Maintenance

## 🚀 Déploiement gratuit avec Vercel + Supabase

### Prérequis
- Compte GitHub
- Node.js installé
- Code pushé sur GitHub

### 1. Configuration de la base de données (Supabase)

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Noter les informations de connexion :
   - Database URL
   - API Key
   - Password

### 2. Migration de la base de données

```sql
-- Exécuter dans l'éditeur SQL de Supabase
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER,
    license_plate VARCHAR(20),
    fuel_type VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mileage INTEGER,
    date TIMESTAMP,
    cars_id INTEGER NOT NULL REFERENCES cars(id),
    cost DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configuration du backend

1. Mettre à jour les variables d'environnement :
```env
DB_HOST=db.your-project.supabase.co
DB_USER=postgres
DB_PASSWORD=ton_password_supabase
DB_NAME=postgres
DB_PORT=5432
APP_PORT=3000
```

### 4. Déploiement backend (Railway)

1. Aller sur [railway.app](https://railway.app)
2. Connecter le repo GitHub
3. Sélectionner le dossier `server`
4. Ajouter les variables d'environnement
5. Déployer

### 5. Configuration frontend

1. Mettre à jour l'URL de l'API dans les services :
```typescript
// Dans les services Angular
private apiUrl = 'https://ton-backend.railway.app/api';
```

### 6. Déploiement frontend (Vercel)

1. Aller sur [vercel.com](https://vercel.com)
2. Importer le projet GitHub
3. Configuration :
   - Framework: Angular
   - Build Command: `npm run build`
   - Output Directory: `dist/cars-maintenance`
   - Root Directory: `frontend`

### 7. Configuration des environnements

**Production environment.ts :**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://ton-backend.railway.app/api'
};
```

## 🔧 Scripts utiles

### Build de production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd server
npm run start
```

### Tests avant déploiement
```bash
# Frontend
npm run lint
npm run test

# Backend
npm test
```

## 🌐 URLs finales

- **Frontend**: https://cars-maintenance.vercel.app
- **Backend**: https://ton-backend.railway.app
- **Database**: Supabase dashboard

## 📱 Optimisations post-déploiement

### Performance
- Compression gzip (automatique sur Vercel)
- CDN global (automatique sur Vercel)
- Mise en cache des assets

### Monitoring
- Vercel Analytics (gratuit)
- Supabase Dashboard
- Railway Logs

### Sécurité
- HTTPS automatique
- CORS configuré
- Variables d'environnement sécurisées

## 🔄 Déploiement continu

1. **GitHub Actions** (optionnel) :
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
```

2. **Auto-deploy** sur push vers main

## 💰 Limites gratuites

### Vercel
- 100GB bandwidth/mois
- Domaines illimités
- Fonctions serverless

### Supabase
- 500MB database
- 50MB file storage
- 2GB bandwidth

### Railway
- $5/mois de crédit gratuit
- Projets illimités

## 🚨 Troubleshooting

### Erreurs communes
1. **CORS Error** : Configurer les origines autorisées
2. **Database Connection** : Vérifier les credentials
3. **Build Failed** : Vérifier les dépendances

### Logs
- Vercel : Dashboard > Function Logs
- Railway : Dashboard > Logs
- Supabase : Dashboard > Logs