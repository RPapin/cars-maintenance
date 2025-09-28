-- Modifier la table task pour supprimer la contrainte mechanics_id

-- Supprimer la contrainte de clé étrangère
ALTER TABLE task DROP CONSTRAINT IF EXISTS fk_mechanics;

-- Supprimer la colonne mechanics_id
ALTER TABLE task DROP COLUMN IF EXISTS mechanics_id;

-- Vérifier la structure finale
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'task'
ORDER BY ordinal_position;