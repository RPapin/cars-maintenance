const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const path = require('path');
dotenv.config();

const authRoutes = require("./controllers/auth");
const carsRoutes = require("./controllers/carsController");
const taskRoutes = require("./controllers/taskController");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// Middleware
app.use(bodyParser.json());

// Use routes
app.use("/api/auth", authRoutes); // User-related routes
app.use("/api/cars", carsRoutes); // Cars-related routes
app.use("/api/task", taskRoutes); // Task-related routes

// Servir les fichiers statiques Angular (PRODUCTION)
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist/cars-maintenance');

  console.log('Frontend path:', frontendPath);
  console.log('Index.html exists:', require('fs').existsSync(path.join(frontendPath, 'index.html')));

  app.use(express.static(frontendPath));

  // Fallback pour les routes Angular (SPA)
  app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
      const indexPath = path.join(frontendPath, 'index.html');
      if (require('fs').existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).json({
          error: 'Frontend not built yet',
          path: indexPath,
          suggestion: 'Run npm run build:frontend'
        });
      }
    }
  });
} else {
  // En développement, rediriger vers le serveur Angular
  app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
      res.redirect('http://localhost:4200' + req.url);
    }
  });
}

// Health check pour Railway
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

const PORT = process.env.APP_PORT || process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
  console.log(`🚂 Cars Maintenance Server running on port ${PORT}`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
