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

-- Vérifier la structure finale
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'cars';