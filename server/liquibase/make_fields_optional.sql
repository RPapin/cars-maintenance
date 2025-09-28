-- Modifier les contraintes pour rendre seuls brand et model obligatoires

-- Supprimer les contraintes NOT NULL des colonnes optionnelles
ALTER TABLE cars ALTER COLUMN year DROP NOT NULL;
ALTER TABLE cars ALTER COLUMN license_plate DROP NOT NULL;
ALTER TABLE cars ALTER COLUMN current_mileage DROP NOT NULL;
ALTER TABLE cars ALTER COLUMN fuel_type DROP NOT NULL;

-- S'assurer que brand et model restent obligatoires
ALTER TABLE cars ALTER COLUMN brand SET NOT NULL;
ALTER TABLE cars ALTER COLUMN model SET NOT NULL;

-- Définir des valeurs par défaut pour les champs optionnels
ALTER TABLE cars ALTER COLUMN current_mileage SET DEFAULT 0;
ALTER TABLE cars ALTER COLUMN year SET DEFAULT EXTRACT(YEAR FROM NOW());

-- Vérifier la structure finale
-- SELECT column_name, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'cars' ORDER BY ordinal_position;