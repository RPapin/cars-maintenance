# 🚂 Railway - Correction déploiement Angular

## ❌ Problème résolu : `ng: not found`

### 🔧 Solutions appliquées :

#### 1. **Package.json corrigé**
```json
{
  "scripts": {
    "build:frontend": "cd frontend && npm ci && npx ng build --configuration production"
  }
}
```
- ✅ Utilise `npx ng` au lieu de `ng`
- ✅ Install complète avec devDependencies
- ✅ Build avec configuration production

#### 2. **Nixpacks.toml optimisé**
```toml
[phases.build]
cmds = [
  "cd frontend && npx ng build --configuration production",
  "ls -la frontend/dist/"
]
```

#### 3. **Script de build dédié**
- ✅ `build.sh` avec vérifications
- ✅ Logs détaillés pour debug
- ✅ Validation des outputs

---

## 🚀 **Déploiement corrigé**

### Étape 1: Commit les changements
```bash
git add .
git commit -m "🚂 Fix: Angular CLI not found - use npx ng"
git push origin main
```

### Étape 2: Railway va automatiquement :
1. **Install** : `npm ci` + `cd frontend && npm ci`
2. **Build** : `cd frontend && npx ng build --configuration production`
3. **Verify** : Création de `frontend/dist/cars-maintenance/index.html`
4. **Start** : `cd server && npm start`

### Étape 3: Vérification
```bash
# Tester l'API
curl https://ton-app.railway.app/api/health

# Tester le frontend
curl https://ton-app.railway.app
```

---

## 📊 **Logs Railway attendus**

### ✅ Build réussi :
```
✅ npm ci
✅ cd frontend && npm ci
✅ cd frontend && npx ng build --configuration production
✅ Initial chunk files | Names         |  Raw size
✅ main.js             | main          |   XXX kB
✅ styles.css          | -             |   XX kB
✅ Build at: YYYY-MM-DD - bundle generated successfully
✅ ls -la frontend/dist/cars-maintenance/
✅ index.html found ✅
```

### ✅ Démarrage réussi :
```
✅ cd server && npm start
🚂 Cars Maintenance Server running on port 3000
🌐 Frontend: https://ton-app.railway.app
🔗 API: https://ton-app.railway.app/api
Frontend path: /app/frontend/dist/cars-maintenance
Index.html exists: true
```

---

## 🎯 **Points clés de la correction**

### 1. **npx ng** au lieu de **ng**
- Utilise Angular CLI local au projet
- Pas besoin d'installation globale
- Fonctionne avec les devDependencies

### 2. **npm ci** complet**
- Install toutes les dépendances (prod + dev)
- Nécessaire pour Angular CLI
- Plus rapide que npm install

### 3. **Vérifications ajoutées**
- Check existence des fichiers buildés
- Logs détaillés pour debugging
- Gestion d'erreur gracieuse

---

## ✅ **Succès !**

Quand tout fonctionne, tu verras :

1. **Railway Dashboard** : Build ✅ + Deploy ✅
2. **URL accessible** : https://ton-app.railway.app
3. **API fonctionnelle** : https://ton-app.railway.app/api/health
4. **Frontend chargé** : Interface Angular visible

🎉 **Ton app Cars Maintenance est maintenant en ligne !** 🎉