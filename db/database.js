const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const dbPath = path.resolve(__dirname, 'blog.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données :', err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');
    }
});

// Initialize database table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT NOT NULL,
            contenu TEXT NOT NULL,
            auteur TEXT NOT NULL,
            date TEXT NOT NULL,
            categorie TEXT,
            tags TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Erreur lors de la création de la table :', err.message);
        } else {
            console.log('Table "articles" prête.');
        }
    });
});

module.exports = db;
