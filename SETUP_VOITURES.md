# Guide d'installation - Fonctionnalité Voitures

## Étapes à suivre pour activer la fonctionnalité d'ajout de voitures

### 1. Mise à jour de la base de données

Exécutez le script SQL suivant pour ajouter les colonnes manquantes à la table `cars` :

```sql
-- Ajouter les colonnes manquantes à la table cars
ALTER TABLE cars
ADD COLUMN IF NOT EXISTS marque VARCHAR(100),
ADD COLUMN IF NOT EXISTS immatriculation VARCHAR(20),
ADD COLUMN IF NOT EXISTS carburant VARCHAR(50);

-- Mettre à jour les données existantes si nécessaire
UPDATE cars SET marque = name WHERE marque IS NULL;
```

### 2. Démarrer le serveur backend

```bash
cd server
npm install
npm start
```

**Note :** Les dépendances manquantes (`jsonwebtoken` et `bcrypt`) ont été automatiquement ajoutées.

Le serveur devrait démarrer sur le port 3000.

### 3. Démarrer le frontend Angular

```bash
cd frontend
npm install
ng serve
```

Le frontend sera accessible sur http://localhost:4200

## Fonctionnalités implementées

### ✅ Formulaire d'ajout de voiture
- Marque (obligatoire)
- Modèle (obligatoire)
- Année (obligatoire)
- Plaque d'immatriculation (obligatoire)
- Kilométrage actuel (obligatoire)
- Type de carburant (obligatoire)

### ✅ Validation des formulaires
- Validation côté client avec messages d'erreur
- Bouton de soumission désactivé si formulaire invalide
- État de chargement pendant la soumission

### ✅ API REST complète
- `POST /api/cars` - Créer une nouvelle voiture
- `GET /api/cars` - Récupérer toutes les voitures
- `GET /api/cars/:id` - Récupérer une voiture par ID
- `PUT /api/cars/:id` - Mettre à jour une voiture
- `DELETE /api/cars/:id` - Supprimer une voiture

### ✅ Système de notifications
- Popup de confirmation après ajout réussi
- Messages d'erreur en cas de problème
- Auto-fermeture après quelques secondes
- Redirection automatique vers le tableau de bord

### ✅ Interface utilisateur
- Design admin simple et épuré
- Menu de navigation avec routage
- Responsive design
- Textes en français

## Structure des fichiers modifiés

```
frontend/src/app/
├── services/
│   ├── car.service.ts (nouveau)
│   └── notification.service.ts (nouveau)
├── notification/
│   ├── notification.component.ts (nouveau)
│   ├── notification.component.html (nouveau)
│   └── notification.component.scss (nouveau)
├── add-car/
│   ├── add-car.component.ts (modifié)
│   ├── add-car.component.html (modifié)
│   └── add-car.component.scss (modifié)
└── app.config.ts (modifié - ajout HttpClient)

server/
├── controllers/
│   └── carsController.js (modifié)
└── liquibase/
    └── add_car_columns.sql (nouveau)
```

## Test de l'application

1. Accédez à http://localhost:4200
2. Cliquez sur "Ajouter une voiture" dans le menu
3. Remplissez le formulaire avec les informations d'un véhicule
4. Cliquez sur "Ajouter la voiture"
5. Une popup de confirmation devrait apparaître
6. Vous serez automatiquement redirigé vers le tableau de bord

Les données sont maintenant enregistrées dans la table `cars` de votre base de données PostgreSQL !