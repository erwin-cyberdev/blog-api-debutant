const Article = require('../models/articleModel');

const articleController = {
    // Créer un article (POST /api/articles)
    createArticle: (req, res) => {
        const { titre, contenu, auteur, date, categorie, tags } = req.body;
        
        // Validation basique (titre, contenu, auteur, date obligatoires)
        if (!titre || !contenu || !auteur || !date) {
            return res.status(400).json({ 
                erreur: "Les champs 'titre', 'contenu', 'auteur', et 'date' sont obligatoires." 
            });
        }

        const newArticle = { titre, contenu, auteur, date, categorie, tags };
        
        Article.create(newArticle, (err, id) => {
            if (err) {
                return res.status(500).json({ erreur: "Erreur serveur lors de la création de l'article." });
            }
            res.status(201).json({ message: "Article créé avec succès", id: id });
        });
    },

    // Récupérer tous les articles, ou filtrer (GET /api/articles) avec pagination
    getAllArticles: (req, res) => {
        const filters = {
            categorie: req.query.categorie,
            date: req.query.date
        };
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        Article.getAll(filters, limit, offset, (err, articles) => {
            if (err) {
                return res.status(500).json({ erreur: "Erreur serveur lors de la récupération des articles." });
            }
            res.status(200).json({ 
                articles: articles,
                page: page,
                limit: limit,
                total: articles.length // info basique
            });
        });
    },

    // Récupérer un article unique par ID (GET /api/articles/:id)
    getArticleById: (req, res) => {
        const id = req.params.id;
        
        Article.getById(id, (err, article) => {
            if (err) {
                return res.status(500).json({ erreur: "Erreur serveur." });
            }
            if (!article) {
                return res.status(404).json({ erreur: "Article non trouvé." });
            }
            res.status(200).json(article);
        });
    },

    // Mettre à jour un article partiellement (PUT/PATCH /api/articles/:id)
    updateArticle: (req, res) => {
        const id = req.params.id;
        
        // Seules les clés présentes dans la requête seront conservées
        const updatedArticle = {};
        const fields = ['titre', 'contenu', 'auteur', 'date', 'categorie', 'tags'];
        
        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                updatedArticle[field] = req.body[field];
            }
        });

        if (Object.keys(updatedArticle).length === 0) {
            return res.status(400).json({ erreur: "Aucune donnée fournie pour la mise à jour." });
        }

        Article.update(id, updatedArticle, (err, changes) => {
            if (err) {
                return res.status(500).json({ erreur: "Erreur serveur lors de la mise à jour." });
            }
            if (changes === 0) {
                return res.status(404).json({ erreur: "Article non trouvé pour la mise à jour." });
            }
            res.status(200).json({ message: "Article mis à jour avec succès" });
        });
    },

    // Supprimer un article (DELETE /api/articles/:id)
    deleteArticle: (req, res) => {
        const id = req.params.id;
        
        Article.delete(id, (err, changes) => {
            if (err) {
                return res.status(500).json({ erreur: "Erreur serveur lors de la suppression." });
            }
            if (changes === 0) {
                return res.status(404).json({ erreur: "Article non trouvé pour la suppression." });
            }
            res.status(200).json({ message: "Article supprimé avec succès" });
        });
    },

    // Rechercher dans les articles (GET /api/articles/search?query=texte)
    searchArticles: (req, res) => {
        const query = req.query.query;
        
        if (!query) {
            return res.status(400).json({ erreur: "Le paramètre de recherche 'query' est obligatoire." });
        }

        Article.search(query, (err, articles) => {
            if (err) {
                return res.status(500).json({ erreur: "Erreur serveur lors de la recherche." });
            }
            // Retourner sous forme de tableau
            res.status(200).json(articles);
        });
    }
};

module.exports = articleController;
