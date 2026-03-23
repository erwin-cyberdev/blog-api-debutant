const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');

const articleRoutes = require('./routes/articleRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // Pour analyser le corps des requêtes JSON
app.use(cors());         // Pour permettre les requêtes depuis un frontend

// Chargement et configuration de Swagger (Documentation API)
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Intégration des routes de l'API (toutes les routes d'articles commenceront par /api/articles)
app.use('/api/articles', articleRoutes);

// Servir l'interface web frontend sur la route de base (remplace la page de base)
app.use(express.static('public'));

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
    console.log(`Documentation disponible sur http://localhost:${port}/api-docs`);
});
