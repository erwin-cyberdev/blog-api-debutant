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

    // Récupérer tous les articles avec possibilité de filtrer par catégorie et date, avec pagination
    getAll: (filters, limit, offset, callback) => {
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
        
        sql += ` ORDER BY date DESC`;

        if (limit !== undefined && offset !== undefined) {
            sql += ` LIMIT ? OFFSET ?`;
            params.push(limit, offset);
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

    // Mettre à jour un article existant (mise à jour partielle supportée)
    update: (id, article, callback) => {
        let fields = [];
        let params = [];

        if (article.titre !== undefined) { fields.push('titre = ?'); params.push(article.titre); }
        if (article.contenu !== undefined) { fields.push('contenu = ?'); params.push(article.contenu); }
        if (article.auteur !== undefined) { fields.push('auteur = ?'); params.push(article.auteur); }
        if (article.date !== undefined) { fields.push('date = ?'); params.push(article.date); }
        if (article.categorie !== undefined) { fields.push('categorie = ?'); params.push(article.categorie); }
        if (article.tags !== undefined) { fields.push('tags = ?'); params.push(article.tags); }

        if (fields.length === 0) {
            return callback(null, 0); // Rien à mettre à jour
        }

        const sql = `UPDATE articles SET ${fields.join(', ')} WHERE id = ?`;
        params.push(id);

        db.run(sql, params, function(err) {
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

    // Rechercher un mot-clé dans le titre, le contenu ou les tags
    search: (query, callback) => {
        const sql = `SELECT * FROM articles 
                     WHERE titre LIKE ? OR contenu LIKE ? OR tags LIKE ?`;
        const searchQuery = `%${query}%`;
        db.all(sql, [searchQuery, searchQuery, searchQuery], (err, rows) => {
            callback(err, rows);
        });
    }
};

module.exports = ArticleModel;
