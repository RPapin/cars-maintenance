-- Créer la table maintenance avec les colonnes en anglais
CREATE TABLE IF NOT EXISTS maintenance (
    id SERIAL PRIMARY KEY,
    car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    maintenance TEXT NOT NULL,
    maintenance_date DATE NOT NULL,
    mileage INTEGER NOT NULL,
    cost DECIMAL(10,2),
    garage VARCHAR(255),
    next_maintenance_mileage INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_maintenance_car_id ON maintenance(car_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_date ON maintenance(maintenance_date);

-- Vérifier la structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'maintenance'
ORDER BY ordinal_position;