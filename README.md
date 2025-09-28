# 🚗 Cars Maintenance

Application web moderne de gestion d'entretien automobile avec Angular 19 et Node.js.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Angular](https://img.shields.io/badge/Angular-19-red.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)

## 🌟 Fonctionnalités

### ✅ Gestion des véhicules
- 🚗 Ajouter, modifier, supprimer des voitures
- 📋 Liste complète avec informations détaillées
- 🏷️ Marque, modèle, année, plaque, carburant
- ✏️ Édition inline avec double-clic

### ✅ Gestion des maintenances
- 🔧 Enregistrement des interventions
- 📅 Suivi des dates et kilométrages
- 💰 Gestion des coûts
- 📊 Historique complet

### ✅ Interface moderne
- 🎨 Design responsive (mobile-first)
- 🔔 Notifications stackées modernes
- 📱 PWA-ready
- 🌙 Mode sombre (à venir)

## 🏗️ Architecture

```
cars-maintenance/
├── frontend/          # Angular 19 application
│   ├── src/
│   │   ├── app/       # Composants et services
│   │   ├── assets/    # Images et styles
│   │   └── environments/
│   └── package.json
├── server/            # Node.js API
│   ├── controllers/   # Routes API
│   ├── services/      # Services (DB, etc.)
│   └── package.json
└── docs/             # Documentation
```

## 🚀 Installation locale

### Prérequis
- Node.js 18+
- PostgreSQL 15+
- Git

### 1. Cloner le projet
```bash
git clone https://github.com/ton-username/cars-maintenance.git
cd cars-maintenance
```

### 2. Installation des dépendances
```bash
# Installation globale
npm run install:all

# Ou manuellement
cd frontend && npm install
cd ../server && npm install
```

### 3. Configuration de la base de données
```bash
# Créer la base de données
createdb cars_maintenance

# Variables d'environnement (server/.env)
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=ton_password
DB_NAME=cars_maintenance
DB_PORT=5432
APP_PORT=3000
```

### 4. Exécuter les migrations
```sql
-- Dans PostgreSQL
\i server/liquibase/cars.sql
\i server/liquibase/task.sql
```

### 5. Lancement en développement
```bash
# Lancer frontend + backend simultanément
npm run dev

# Ou séparément
npm run dev:frontend  # http://localhost:4200
npm run dev:backend   # http://localhost:3000
```

## 🌐 Déploiement

### Option 1 : Railway (One-Click Deploy)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

1. Cliquer sur "Deploy on Railway"
2. Connecter ton repo GitHub
3. Attendre le déploiement (2-3 minutes)
4. Ton app est en ligne ! 🎉

### Option 2 : Vercel + Railway
Voir [deployment-guide.md](./deployment-guide.md)

### Option 3 : Docker
```bash
docker-compose up -d
```

## 📊 Stack technique

### Frontend
- **Framework** : Angular 19
- **Styling** : SCSS + CSS Grid
- **UI** : Standalone components
- **State** : Services + RxJS
- **Validation** : Template-driven forms

### Backend
- **Runtime** : Node.js 18+
- **Framework** : Express.js
- **Database** : PostgreSQL
- **ORM** : SQL natif
- **Security** : CORS, Helmet

### DevOps
- **CI/CD** : GitHub Actions
- **Hosting** : Railway / Vercel
- **Database** : Supabase / Railway PostgreSQL
- **Monitoring** : Railway Dashboard

## 🧪 Tests

```bash
# Frontend
cd frontend
npm run test
npm run e2e

# Backend
cd server
npm test
```

## 📱 Responsive Design

L'application est entièrement responsive avec des breakpoints optimisés :

- **Mobile** : < 480px
- **Tablet** : 481px - 768px
- **Desktop** : > 768px

Toutes les valeurs CSS utilisent des unités `rem` pour une meilleure accessibilité.

## 🔔 Notifications

Système de notifications modernes avec :
- ✅ Stack latéral (top-right)
- ✅ Auto-disparition (4 secondes)
- ✅ Types : success, error, warning, info
- ✅ Barre de progression animée
- ✅ Fermeture manuelle

## 🛠️ Scripts disponibles

```bash
# Développement
npm run dev                # Frontend + Backend
npm run dev:frontend       # Angular dev server
npm run dev:backend        # Node.js avec nodemon

# Build
npm run build              # Build complet
npm run build:frontend     # Build Angular
npm run build:backend      # Préparation backend

# Production
npm start                  # Lancer en production

# Utilitaires
npm run install:all        # Installer toutes les dépendances
npm run lint              # Linter le code
npm run test              # Tests
```

## 🐛 Dépannage

### Erreurs communes

**CORS Error**
```javascript
// server/server.js
app.use(cors({
  origin: ['http://localhost:4200', 'https://ton-domaine.com']
}));
```

**Database Connection Error**
- Vérifier les credentials dans `.env`
- S'assurer que PostgreSQL est démarré
- Vérifier que la base de données existe

**Build Failed**
```bash
# Nettoyer les caches
rm -rf node_modules package-lock.json
npm install
```

## 📄 Licence

MIT License - voir [LICENSE](./LICENSE)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changes (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 👥 Auteurs

- **Développeur Principal** - [@ton-username](https://github.com/ton-username)

## 🙏 Remerciements

- Angular Team pour le framework
- Railway pour l'hébergement
- Toute la communauté open source

---

⭐ **N'hésite pas à mettre une étoile si ce projet t'aide !** ⭐