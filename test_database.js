const dbService = require('./server/services/dbService');

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    console.log('Environment variables:');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
    console.log('DB_NAME:', process.env.DB_NAME);
    console.log('DB_PORT:', process.env.DB_PORT);

    // Vérifier si la table task existe
    const tables = await dbService.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'task'
    `);

    if (tables.length === 0) {
      console.log('❌ Table task does not exist');
      return;
    }

    console.log('✅ Table task exists');

    // Vérifier les colonnes de la table task
    const columns = await dbService.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'task' AND table_schema = 'public'
      ORDER BY ordinal_position
    `);

    console.log('Columns in task table:');
    columns.forEach(col => {
      console.log(`  - ${col.column_name} (${col.data_type}, nullable: ${col.is_nullable})`);
    });

    // Vérifier si la colonne cost existe
    const costColumn = columns.find(col => col.column_name === 'cost');
    if (costColumn) {
      console.log('✅ Column cost exists');
    } else {
      console.log('❌ Column cost does not exist - need to run migration');
    }

    // Tester une requête simple
    const taskCount = await dbService.query('SELECT COUNT(*) as count FROM task');
    console.log(`✅ Task table contains ${taskCount[0].count} records`);

  } catch (error) {
    console.error('❌ Database error:', error.message);
  }
}

testDatabase();