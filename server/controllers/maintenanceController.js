const express = require("express");
const dbService = require("../services/dbService")
const router = express.Router();

// Créer une nouvelle maintenance
router.post('/', async (req, res) => {
  const { car_id, maintenance, maintenance_date, mileage, cost, garage, next_maintenance_mileage } = req.body;

  // Validation des champs obligatoires
  if (!car_id || !maintenance || !maintenance_date || !mileage) {
    return res.status(400).json({
      error: "Les champs 'car_id', 'maintenance', 'maintenance_date' et 'mileage' sont obligatoires"
    });
  }

  try {
    // Vérifier que la voiture existe
    const carExists = await dbService.query("SELECT id FROM cars WHERE id = $1", [car_id]);
    if (carExists.length === 0) {
      return res.status(404).json({ error: "Voiture non trouvée" });
    }

    // Construire la requête dynamiquement selon les champs fournis
    const fields = ['car_id', 'maintenance', 'maintenance_date', 'mileage'];
    const values = [car_id, maintenance.trim(), maintenance_date, mileage];
    const placeholders = ['$1', '$2', '$3', '$4'];

    if (cost !== undefined && cost !== null) {
      fields.push('cost');
      values.push(cost);
      placeholders.push(`$${values.length}`);
    }

    if (garage) {
      fields.push('garage');
      values.push(garage.trim());
      placeholders.push(`$${values.length}`);
    }

    if (next_maintenance_mileage !== undefined && next_maintenance_mileage !== null) {
      fields.push('next_maintenance_mileage');
      values.push(next_maintenance_mileage);
      placeholders.push(`$${values.length}`);
    }

    const query = `INSERT INTO maintenance (${fields.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;

    const result = await dbService.query(query, values);
    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Erreur lors de la création de la maintenance:', error.message);
    res.status(500).json({ error: "Échec de la création de la maintenance" });
  }
});

// Récupérer toutes les maintenances avec informations de la voiture
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT
        m.*,
        c.brand as car_brand,
        c.model as car_model,
        c.license_plate as car_license_plate
      FROM maintenance m
      JOIN cars c ON m.car_id = c.id
      ORDER BY m.maintenance_date DESC, m.id DESC
    `;
    const maintenances = await dbService.query(query);
    res.json(maintenances);
  } catch (error) {
    console.error('Erreur lors de la récupération des maintenances:', error.message);
    res.status(500).json({ error: "Échec de la récupération des maintenances" });
  }
});

// Récupérer une maintenance par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT
        m.*,
        c.brand as car_brand,
        c.model as car_model,
        c.license_plate as car_license_plate
      FROM maintenance m
      JOIN cars c ON m.car_id = c.id
      WHERE m.id = $1
    `;
    const result = await dbService.query(query, [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Maintenance non trouvée" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de la maintenance:', error.message);
    res.status(500).json({ error: "Échec de la récupération de la maintenance" });
  }
});

// Récupérer les maintenances par voiture
router.get('/car/:carId', async (req, res) => {
  const { carId } = req.params;

  try {
    const query = `
      SELECT
        m.*,
        c.brand as car_brand,
        c.model as car_model,
        c.license_plate as car_license_plate
      FROM maintenance m
      JOIN cars c ON m.car_id = c.id
      WHERE m.car_id = $1
      ORDER BY m.maintenance_date DESC, m.id DESC
    `;
    const maintenances = await dbService.query(query, [carId]);
    res.json(maintenances);
  } catch (error) {
    console.error('Erreur lors de la récupération des maintenances:', error.message);
    res.status(500).json({ error: "Échec de la récupération des maintenances" });
  }
});

// Mettre à jour une maintenance
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { car_id, maintenance, maintenance_date, mileage, cost, garage, next_maintenance_mileage } = req.body;

  try {
    const result = await dbService.query(
      `UPDATE maintenance
       SET car_id = $1, maintenance = $2, maintenance_date = $3, mileage = $4,
           cost = $5, garage = $6, next_maintenance_mileage = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [car_id, maintenance, maintenance_date, mileage, cost, garage, next_maintenance_mileage, id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Maintenance non trouvée" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la maintenance:', error.message);
    res.status(500).json({ error: "Échec de la mise à jour de la maintenance" });
  }
});

// Supprimer une maintenance
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await dbService.query("DELETE FROM maintenance WHERE id = $1 RETURNING *", [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Maintenance non trouvée" });
    }

    res.json({ message: "Maintenance supprimée avec succès" });
  } catch (error) {
    console.error('Erreur lors de la suppression de la maintenance:', error.message);
    res.status(500).json({ error: "Échec de la suppression de la maintenance" });
  }
});

module.exports = router;