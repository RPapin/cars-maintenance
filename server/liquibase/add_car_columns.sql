-- Ajouter les colonnes manquantes à la table cars
ALTER TABLE cars
ADD COLUMN IF NOT EXISTS marque VARCHAR(100),
ADD COLUMN IF NOT EXISTS immatriculation VARCHAR(20),
ADD COLUMN IF NOT EXISTS carburant VARCHAR(50);

-- Mettre à jour les données existantes si nécessaire
UPDATE cars SET marque = name WHERE marque IS NULL;