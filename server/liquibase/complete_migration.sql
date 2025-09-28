-- Migration complète: Renommer les colonnes en anglais et rendre seuls brand et model obligatoires

-- Étape 1: Supprimer la colonne name si elle existe
ALTER TABLE cars DROP COLUMN IF EXISTS name;

-- Étape 2: Renommer les colonnes françaises en anglais
DO $$
BEGIN
    -- Vérifier et renommer marque -> brand
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cars' AND column_name = 'marque') THEN
        ALTER TABLE cars RENAME COLUMN marque TO brand;
    END IF;

    -- Vérifier et renommer immatriculation -> license_plate
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cars' AND column_name = 'immatriculation') THEN
        ALTER TABLE cars RENAME COLUMN immatriculation TO license_plate;
    END IF;

    -- Vérifier et renommer carburant -> fuel_type
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cars' AND column_name = 'carburant') THEN
        ALTER TABLE cars RENAME COLUMN carburant TO fuel_type;
    END IF;
END $$;

-- Étape 3: Modifier les contraintes pour rendre seuls brand et model obligatoires
ALTER TABLE cars ALTER COLUMN year DROP NOT NULL;
ALTER TABLE cars ALTER COLUMN license_plate DROP NOT NULL;
ALTER TABLE cars ALTER COLUMN current_mileage DROP NOT NULL;
ALTER TABLE cars ALTER COLUMN fuel_type DROP NOT NULL;

-- S'assurer que brand et model restent obligatoires
ALTER TABLE cars ALTER COLUMN brand SET NOT NULL;
ALTER TABLE cars ALTER COLUMN model SET NOT NULL;

-- Étape 4: Définir des valeurs par défaut pour les champs optionnels
ALTER TABLE cars ALTER COLUMN current_mileage SET DEFAULT 0;
ALTER TABLE cars ALTER COLUMN year SET DEFAULT EXTRACT(YEAR FROM NOW());

-- Vérifier la structure finale
SELECT column_name, is_nullable, column_default, data_type
FROM information_schema.columns
WHERE table_name = 'cars'
ORDER BY ordinal_position;