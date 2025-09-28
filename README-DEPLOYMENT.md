# 🚀 Cars Maintenance - Guide de déploiement

Application de gestion d'entretien automobile avec Angular 19 et Node.js

## 📋 Déploiement rapide (gratuit)

### Option recommandée : Vercel + Railway + Supabase

## 🌟 Coûts (100% GRATUIT)

| Service | Plan gratuit | Limites |
|---------|-------------|----------|
| **Vercel** | Hobby | 100GB/mois, domaines illimités |
| **Railway** | Starter | $5/mois de crédit |
| **Supabase** | Free | 500MB DB, 2GB bandwidth |

## 🚀 Instructions de déploiement

### 1. Base de données (Supabase)
```bash
# 1. Créer un compte sur supabase.com
# 2. Nouveau projet
# 3. Copier Database URL et Password
# 4. Exécuter les migrations SQL dans l'éditeur
```

### 2. Backend (Railway)
```bash
# 1. Créer un compte sur railway.app
# 2. Nouveau projet depuis GitHub
# 3. Sélectionner le dossier 'server'
# 4. Ajouter les variables d'environnement :

DB_HOST=db.your-project.supabase.co
DB_USER=postgres
DB_PASSWORD=ton_password_supabase
DB_NAME=postgres
DB_PORT=5432
APP_PORT=3000
```

### 3. Frontend (Vercel)
```bash
# 1. Créer un compte sur vercel.com
# 2. Importer depuis GitHub
# 3. Configuration :
#    - Framework: Angular
#    - Root Directory: frontend
#    - Build Command: npm run build
#    - Output Directory: dist/cars-maintenance

# 4. Mettre à jour l'URL de l'API
# Dans environment.prod.ts:
export const environment = {
  production: true,
  apiUrl: 'https://ton-projet.railway.app/api'
};
```

## 🔧 Configuration locale

### Frontend
```bash
cd frontend
npm install
ng serve
# http://localhost:4200
```

### Backend
```bash
cd server
npm install
npm run dev
# http://localhost:3000
```

## 📱 Architecture déployée

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Vercel)      │────│   (Railway)     │────│  (Supabase)     │
│   Angular 19    │    │   Node.js       │    │  PostgreSQL     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🌐 URLs de production

- **Frontend**: `https://cars-maintenance.vercel.app`
- **API**: `https://ton-projet.railway.app/api`
- **Database**: Dashboard Supabase

## ⚡ Optimisations incluses

### Performance
- ✅ Compression automatique (Vercel)
- ✅ CDN global (Vercel)
- ✅ Cache des assets optimisé
- ✅ Notifications responsive
- ✅ CSS en rem (responsive)

### Sécurité
- ✅ HTTPS automatique
- ✅ CORS configuré
- ✅ Variables d'environnement sécurisées
- ✅ Validation des données

### Fonctionnalités
- ✅ Gestion des voitures (CRUD)
- ✅ Gestion des maintenances (CRUD)
- ✅ Notifications modernes stackées
- ✅ Interface entièrement responsive
- ✅ Validation formulaires en temps réel

## 📊 Monitoring

### Logs disponibles
- **Vercel**: Fonction logs dans le dashboard
- **Railway**: Logs en temps réel
- **Supabase**: Query logs et métriques

### Analytics
- **Vercel Analytics** (gratuit)
- **Railway Metrics** (CPU, RAM, réseau)
- **Supabase Dashboard** (requêtes, connexions)

## 🔄 Déploiement continu

### Auto-deploy activé sur :
- Push vers `main` branch
- Merge des pull requests
- Tags de release

### Workflow :
```
1. Code push → GitHub
2. GitHub webhook → Vercel/Railway
3. Build automatique
4. Déploiement en production
5. Tests post-déploiement
```

## 🚨 Support & Dépannage

### Erreurs communes :
1. **CORS Error**: Vérifier l'origine dans les headers
2. **Database Connection**: Credentials Supabase
3. **Build Failed**: Dépendances manquantes

### Ressources :
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Railway](https://docs.railway.app)
- [Documentation Supabase](https://supabase.com/docs)

---

## 🎉 Ton app est maintenant en ligne !

L'application Cars Maintenance est maintenant accessible dans le monde entier, gratuite, rapide et sécurisée !