# 🚂 Railway - Guide de dépannage

## ❌ Erreur: ENOENT index.html

### Problème
```
Error: ENOENT: no such file or directory, stat '/app/frontend/dist/cars-maintenance/index.html'
```

### ✅ Solutions

#### 1. Vérifier les logs de build
Dans Railway Dashboard → Deployments → Build Logs :
```bash
# Chercher ces lignes
✅ cd frontend && npm ci
✅ cd frontend && npm run build:prod
✅ ls -la frontend/dist/
```

#### 2. Variables d'environnement requises
Dans Railway → Variables :
```env
NODE_ENV=production
DATABASE_URL=postgresql://... (auto-généré)
```

#### 3. Forcer un nouveau déploiement
```bash
# Faire un commit vide pour re-déclencher
git commit --allow-empty -m "🚂 Force Railway redeploy"
git push origin main
```

#### 4. Vérifier la structure après build
Les logs doivent montrer :
```
frontend/dist/cars-maintenance/
├── index.html ✅
├── main.js ✅
├── styles.css ✅
└── assets/ ✅
```

---

## 🔧 Configuration Railway

### Service Configuration
1. **Root Directory**: `/` (racine du projet)
2. **Build Command**: `npm run build`
3. **Start Command**: `npm start`
4. **Node Version**: 18.x

### Variables d'environnement
```env
NODE_ENV=production
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

---

## 🚀 Redéploiement manuel

### Option 1: Via l'interface Railway
1. Railway Dashboard
2. Votre projet
3. Deployments tab
4. "Redeploy" button

### Option 2: Via Git
```bash
git add .
git commit -m "🚂 Fix Railway deployment"
git push origin main
```

### Option 3: Variables d'environnement
1. Ajouter/modifier `NODE_ENV=production`
2. Railway va automatiquement redéployer

---

## 📊 Vérification post-déploiement

### 1. Tester l'API
```bash
curl https://votre-app.railway.app/api/health
```

Réponse attendue :
```json
{
  "status": "OK",
  "timestamp": "2024-01-XX...",
  "environment": "production"
}
```

### 2. Tester le frontend
```bash
curl https://votre-app.railway.app
```

Doit retourner du HTML avec Angular.

### 3. Tester les routes API
```bash
curl https://votre-app.railway.app/api/cars
curl https://votre-app.railway.app/api/task
```

---

## 🐛 Autres erreurs communes

### Build Failed
```
Error: Cannot find module 'something'
```

**Solution** :
```bash
# Vérifier package.json et package-lock.json
# Puis redéployer
```

### Database Connection Error
```
Error: connect ECONNREFUSED
```

**Solution** :
1. Vérifier que PostgreSQL service est créé
2. Variables DATABASE_URL correctes
3. Service Dependencies configurés

### Memory Limit Exceeded
```
Error: JavaScript heap out of memory
```

**Solution** :
```bash
# Dans frontend/package.json
"build:prod": "node --max_old_space_size=4096 ./node_modules/@angular/cli/bin/ng build --configuration production"
```

---

## 🎯 Checklist de déploiement

### Avant le push :
- [ ] `package.json` scripts corrects
- [ ] `environment.prod.ts` avec `/api`
- [ ] Build local fonctionne : `npm run build`
- [ ] `.gitignore` complet

### Configuration Railway :
- [ ] PostgreSQL service ajouté
- [ ] Variables d'environnement configurées
- [ ] Build et Start commands corrects

### Test post-déploiement :
- [ ] Health check API répond
- [ ] Frontend s'affiche
- [ ] Routes API fonctionnent
- [ ] Database connection OK

---

## 🆘 Support

### Logs Railway
1. Dashboard → Deployments
2. Build Logs (pendant le build)
3. Deploy Logs (pendant l'exécution)

### Logs en temps réel
```bash
# Dans Railway CLI
railway logs
```

### Contact
- Discord Railway Community
- GitHub Issues
- Documentation Railway

---

## ✅ Déploiement réussi !

Quand tout fonctionne, tu devrais voir :

```
🚂 Cars Maintenance Server running on port 3000
🌐 Frontend: https://votre-app.railway.app
🔗 API: https://votre-app.railway.app/api
📊 Health: https://votre-app.railway.app/api/health
```

🎉 **Ton app est maintenant en ligne !** 🎉