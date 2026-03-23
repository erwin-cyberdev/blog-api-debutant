const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Définition des routes CRUD

// Créer un article
router.post('/', articleController.createArticle);

// Récupérer tous les articles (ou filtrer via query params)
router.get('/', articleController.getAllArticles);

// Rechercher un article
// (Attention: il faut le placer avant 'getArticleById' pour éviter que "search" soit pris pour un ID)
router.get('/search', articleController.searchArticles);

// Récupérer un article unique par ID
router.get('/:id', articleController.getArticleById);

// Mettre à jour un article
router.put('/:id', articleController.updateArticle);

// Supprimer un article
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
