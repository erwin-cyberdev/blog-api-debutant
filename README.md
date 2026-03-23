# Mon API Blog (Débutant)

Une API backend complète avec une interface simple pour gérer un blog. 
Développée avec Node.js (Express), SQLite et servie avec une interface graphique minimaliste.

## 1. Installation

1. Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.
2. Ouvrez votre terminal, placez-vous dans ce dossier (là où se trouve ce fichier `README.md`).
3. Installez toutes les dépendances requises en tapant la commande suivante :
   ```bash
   npm install
   ```

## 2. Démarrage local

Pour lancer l'application sur votre ordinateur, tapez simplement :
```bash
node app.js
```
Vous devriez voir un message indiquant que le serveur écoute sur le port 3000.

## 3. Utiliser l'Interface Graphique (Frontend)

C'est la méthode la plus simple pour tester !
Ouvrez votre navigateur web et allez à l'adresse suivante :
**http://localhost:3000**

Depuis cette page web épurée, vous pouvez :
- **Voir la liste des articles** (qui se met à jour toute seule).
- **Créer de nouveaux articles** en remplissant le petit formulaire (Titre, Auteur, Date, Contenu, etc.).

## 4. Utiliser la Documentation API (Swagger)

Si vous voulez comprendre comment l'API fonctionne ou la tester "comme un développeur" sans passer par l'interface web :
Ouvrez votre navigateur et allez à l'adresse :
**http://localhost:3000/api-docs**

Swagger liste tous les "Endpoints" (*routes*) disponibles :
- `POST /api/articles` (Créer un article)
- `GET /api/articles` (Lire tous les articles)
- `GET /api/articles/{id}` (Lire un article)
- `PUT /api/articles/{id}` (Modifier un article)
- `DELETE /api/articles/{id}` (Supprimer un article)
- `GET /api/articles/search` (Rechercher par mot-clé)

Vous pouvez cliquer sur n'importe quelle route, puis sur **"Try it out"** pour tester vous-même l'envoi de requêtes !

## 5. Comment Déployer (Mettre en ligne)

Pour que votre API soit accessible sur Internet (par exemple via Render ou Railway), suivez ces étapes :

1. Créez un dossier distant (nouveau *Repository* vide) sur **GitHub**.
2. Dans votre terminal (dans ce dossier de l'API), tapez les commandes suivantes pour lier et envoyer votre code (remplacez l'URL par la vôtre) :
   ```bash
   git add .
   git commit -m "Mon Blog API"
   git remote add origin https://github.com/VOTRE_PSEUDO/VOTRE_DEPOT.git
   git push -u origin main
   ```
3. Allez sur [Render.com](https://render.com) ou [Railway.app](https://railway.app).
4. Créez un nouveau "Web Service" et connectez simplement votre dépôt GitHub !
5. Ces plateformes détecteront automatiquement que c'est une application Node.js (grâce au `package.json`). Assurez-vous simplement que la commande de démarrage (`Start Command`) est bien `node app.js`.
