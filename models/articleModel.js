const db = require('../db/database');

const ArticleModel = {
    // Créer un nouvel article
    create: (article, callback) => {
        const sql = `INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
                     VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(sql, [
            article.titre,
            article.contenu,
            article.auteur,
            article.date,
            article.categorie,
            article.tags
        ], function(err) {
            // this.lastID contient l'ID du nouvel enregistrement
            callback(err, this ? this.lastID : null);
        });
    },

    // Récupérer tous les articles avec possibilité de filtrer par catégorie et date
    getAll: (filters, callback) => {
        let sql = `SELECT * FROM articles`;
        let params = [];
        let conditions = [];

        if (filters.categorie) {
            conditions.push(`categorie = ?`);
            params.push(filters.categorie);
        }
        if (filters.date) {
            conditions.push(`date = ?`);
            params.push(filters.date);
        }

        if (conditions.length > 0) {
            sql += ` WHERE ` + conditions.join(' AND ');
        }

        db.all(sql, params, (err, rows) => {
            callback(err, rows);
        });
    },

    // Récupérer un article spécifiquement par son ID
    getById: (id, callback) => {
        const sql = `SELECT * FROM articles WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            callback(err, row);
        });
    },

    // Mettre à jour un article existant
    update: (id, article, callback) => {
        const sql = `UPDATE articles 
                     SET titre = ?, contenu = ?, categorie = ?, tags = ?
                     WHERE id = ?`;
        db.run(sql, [
            article.titre,
            article.contenu,
            article.categorie,
            article.tags,
            id
        ], function(err) {
            // this.changes contient le nombre de lignes modifiées
            callback(err, this ? this.changes : 0);
        });
    },

    // Supprimer un article
    delete: (id, callback) => {
        const sql = `DELETE FROM articles WHERE id = ?`;
        db.run(sql, [id], function(err) {
            callback(err, this ? this.changes : 0);
        });
    },

    // Rechercher un mot-clé dans le titre ou le contenu
    search: (query, callback) => {
        const sql = `SELECT * FROM articles 
                     WHERE titre LIKE ? OR contenu LIKE ?`;
        const searchQuery = `%${query}%`;
        db.all(sql, [searchQuery, searchQuery], (err, rows) => {
            callback(err, rows);
        });
    }
};

module.exports = ArticleModel;
