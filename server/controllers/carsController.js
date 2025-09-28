const express = require("express");
const dbService = require("../services/dbService")
const router = express.Router();

// Créer une nouvelle voiture
router.post('/', async (req, res) => {
  const { brand, model, year, license_plate, current_mileage, fuel_type } = req.body;

  // Validation des champs obligatoires
  if (!brand || !model) {
    return res.status(400).json({
      error: "Les champs 'brand' et 'model' sont obligatoires"
    });
  }

  try {
    // Construire la requête dynamiquement selon les champs fournis
    const fields = ['brand', 'model'];
    const values = [brand.trim(), model.trim()];
    const placeholders = ['$1', '$2'];

    if (year) {
      fields.push('year');
      values.push(year);
      placeholders.push(`$${values.length}`);
    }

    if (license_plate) {
      fields.push('license_plate');
      values.push(license_plate.trim());
      placeholders.push(`$${values.length}`);
    }

    if (current_mileage !== undefined && current_mileage !== null) {
      fields.push('current_mileage');
      values.push(current_mileage);
      placeholders.push(`$${values.length}`);
    }

    if (fuel_type) {
      fields.push('fuel_type');
      values.push(fuel_type);
      placeholders.push(`$${values.length}`);
    }

    const query = `INSERT INTO cars (${fields.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;
    const result = await dbService.query(query, values);
    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Erreur lors de la création de la voiture:', error.message);
    res.status(500).json({ error: "Échec de la création de la voiture" });
  }
});

// Récupérer toutes les voitures
router.get('/', async (req, res) => {
  try {
    const cars = await dbService.query("SELECT * FROM cars ORDER BY id DESC");
    res.json(cars);
  } catch (error) {
    console.error('Erreur lors de la récupération des voitures:', error.message);
    res.status(500).json({ error: "Échec de la récupération des voitures" });
  }
});

// Récupérer une voiture par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await dbService.query("SELECT * FROM cars WHERE id = $1", [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Voiture non trouvée" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de la voiture:', error.message);
    res.status(500).json({ error: "Échec de la récupération de la voiture" });
  }
});

// Mettre à jour une voiture
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { brand, model, year, license_plate, current_mileage, fuel_type } = req.body;

  try {
    const result = await dbService.query(
      "UPDATE cars SET brand = $1, model = $2, year = $3, license_plate = $4, current_mileage = $5, fuel_type = $6 WHERE id = $7 RETURNING *",
      [brand, model, year, license_plate, current_mileage, fuel_type, id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Voiture non trouvée" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la voiture:', error.message);
    res.status(500).json({ error: "Échec de la mise à jour de la voiture" });
  }
});

// Supprimer une voiture
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await dbService.query("DELETE FROM cars WHERE id = $1 RETURNING *", [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Voiture non trouvée" });
    }

    res.json({ message: "Voiture supprimée avec succès" });
  } catch (error) {
    console.error('Erreur lors de la suppression de la voiture:', error.message);
    res.status(500).json({ error: "Échec de la suppression de la voiture" });
  }
});

module.exports = router;
