const express = require("express");
const dbService = require("../services/dbService")
const router = express.Router();

// Créer une nouvelle tâche (maintenance)
router.post('/', async (req, res) => {
  const { cars_id, name, date, mileage, cost } = req.body;

  // Validation des champs obligatoires
  if (!cars_id || !name || !date || !mileage) {
    return res.status(400).json({
      error: "Les champs 'cars_id', 'name', 'date' et 'mileage' sont obligatoires"
    });
  }

  try {
    // Vérifier que la voiture existe
    const carExists = await dbService.query("SELECT id FROM cars WHERE id = $1", [cars_id]);
    if (carExists.length === 0) {
      return res.status(404).json({ error: "Voiture non trouvée" });
    }

    // Construire la requête dynamiquement selon les champs fournis
    const fields = ['cars_id', 'name', 'date', 'mileage'];
    const values = [cars_id, name.trim(), date, mileage];
    const placeholders = ['$1', '$2', '$3', '$4'];

    if (cost !== undefined && cost !== null && cost >= 0) {
      fields.push('cost');
      values.push(cost);
      placeholders.push(`$${values.length}`);
    }

    const query = `INSERT INTO task (${fields.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;

    console.log('Executing query:', query);
    console.log('With values:', values);

    const result = await dbService.query(query, values);
    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error.message);
    res.status(500).json({ error: "Échec de la création de la tâche" });
  }
});

// Récupérer toutes les tâches avec informations de la voiture
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT
        t.*,
        c.brand as car_brand,
        c.model as car_model,
        c.license_plate as car_license_plate
      FROM task t
      JOIN cars c ON t.cars_id = c.id
      ORDER BY t.date DESC, t.id DESC
    `;
    const tasks = await dbService.query(query);
    res.json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error.message);
    res.status(500).json({ error: "Échec de la récupération des tâches" });
  }
});

// Récupérer une tâche par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT
        t.*,
        c.brand as car_brand,
        c.model as car_model,
        c.license_plate as car_license_plate
      FROM task t
      JOIN cars c ON t.cars_id = c.id
      WHERE t.id = $1
    `;
    const result = await dbService.query(query, [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de la tâche:', error.message);
    res.status(500).json({ error: "Échec de la récupération de la tâche" });
  }
});

// Récupérer les tâches par voiture
router.get('/car/:carId', async (req, res) => {
  const { carId } = req.params;

  try {
    const query = `
      SELECT
        t.*,
        c.brand as car_brand,
        c.model as car_model,
        c.license_plate as car_license_plate
      FROM task t
      JOIN cars c ON t.cars_id = c.id
      WHERE t.cars_id = $1
      ORDER BY t.date DESC, t.id DESC
    `;
    const tasks = await dbService.query(query, [carId]);
    res.json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error.message);
    res.status(500).json({ error: "Échec de la récupération des tâches" });
  }
});

// Mettre à jour une tâche
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { cars_id, name, date, mileage, cost } = req.body;

  try {
    const result = await dbService.query(
      `UPDATE task SET cars_id = $1, name = $2, date = $3, mileage = $4, cost = $5 WHERE id = $6 RETURNING *`,
      [cars_id, name, date, mileage, cost || null, id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error.message);
    res.status(500).json({ error: "Échec de la mise à jour de la tâche" });
  }
});

// Supprimer une tâche
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await dbService.query("DELETE FROM task WHERE id = $1 RETURNING *", [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    res.json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error.message);
    res.status(500).json({ error: "Échec de la suppression de la tâche" });
  }
});

module.exports = router;