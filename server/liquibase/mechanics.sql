-- Create mechanics table
CREATE TABLE IF NOT EXISTS public.mechanics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default mechanic for when no specific mechanic is provided
INSERT INTO public.mechanics (id, name, phone, email, address)
VALUES (1, 'Mécanicien par défaut', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;