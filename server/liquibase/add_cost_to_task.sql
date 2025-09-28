-- Ajouter le champ cost à la table task
ALTER TABLE task ADD COLUMN IF NOT EXISTS cost DECIMAL(10,2);

-- Vérifier la structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'task'
ORDER BY ordinal_position;