# Migration des Colonnes vers l'Anglais

## Script SQL à exécuter

Exécutez ce script pour supprimer la colonne `name` et renommer toutes les colonnes en anglais :

```sql
-- Supprimer la colonne name et renommer toutes les colonnes en anglais
-- Étape 1: Supprimer la colonne name
ALTER TABLE cars DROP COLUMN IF EXISTS name;

-- Étape 2: Renommer les colonnes en anglais
ALTER TABLE cars RENAME COLUMN marque TO brand;
ALTER TABLE cars RENAME COLUMN model TO model; -- déjà en anglais
ALTER TABLE cars RENAME COLUMN year TO year; -- déjà en anglais
ALTER TABLE cars RENAME COLUMN immatriculation TO license_plate;
ALTER TABLE cars RENAME COLUMN current_mileage TO current_mileage; -- déjà en anglais
ALTER TABLE cars RENAME COLUMN carburant TO fuel_type;
```

## Structure finale de la table cars

| Colonne          | Type          | Description                    |
|------------------|---------------|--------------------------------|
| id               | SERIAL        | Identifiant unique (PK)        |
| brand            | VARCHAR(100)  | Marque du véhicule             |
| model            | VARCHAR(100)  | Modèle du véhicule             |
| year             | INT           | Année de fabrication           |
| license_plate    | VARCHAR(20)   | Plaque d'immatriculation       |
| current_mileage  | INT           | Kilométrage actuel             |
| fuel_type        | VARCHAR(50)   | Type de carburant              |

## Valeurs des types de carburant

Les valeurs du champ `fuel_type` ont été standardisées en anglais :

- `gasoline` - Essence
- `diesel` - Diesel
- `electric` - Électrique
- `hybrid` - Hybride
- `lpg` - GPL

## Modifications apportées au code

### 1. Interface TypeScript (car.service.ts)
```typescript
export interface Car {
  id?: number;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  current_mileage: number;
  fuel_type: string;
}
```

### 2. Contrôleur Backend (carsController.js)
- Mise à jour des variables de destructuration
- Modification des requêtes SQL pour utiliser les nouveaux noms de colonnes
- Harmonisation avec les noms anglais

### 3. Formulaire Frontend (add-car.component.html)
- Mise à jour des attributs `name`, `id` et `[(ngModel)]`
- Conservation des labels en français pour l'interface utilisateur
- Standardisation des valeurs des options de carburant

### 4. Composant TypeScript (add-car.component.ts)
- Mise à jour de l'objet `car` avec les nouvelles propriétés
- Modification du message de confirmation

## Tests à effectuer

1. **Appliquer le script SQL** dans votre base de données PostgreSQL
2. **Redémarrer le serveur** backend : `cd server && npm start`
3. **Lancer le frontend** : `cd frontend && ng serve`
4. **Tester l'ajout** d'une nouvelle voiture
5. **Vérifier la sauvegarde** en base de données

## Avantages de cette migration

✅ **Consistance** - Toutes les variables et colonnes sont en anglais
✅ **Standards** - Respect des conventions de nommage internationales
✅ **Maintenabilité** - Code plus facile à comprendre pour les développeurs
✅ **Évolutivité** - Préparation pour l'internationalisation future

La migration est maintenant complète et le système est entièrement en anglais au niveau du code et de la base de données !