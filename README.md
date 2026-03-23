# Mon API Blog (Débutant)

Une première partie d'une API backend pour gérer un blog simple.
Développée avec Node.js (Express) et SQLite.

## Installation

1. Assurez-vous d'avoir Node.js installé sur votre machine.
2. Clonez ce dépôt ou copiez les fichiers.
3. Installez les dépendances depuis le terminal :
   ```bash
   npm install
   ```

## Démarrage

Pour lancer le serveur :
```bash
node index.js
```
Le serveur démarrera sur `http://localhost:3000`.

## Documentation et Tests (Swagger)

L'API est entièrement documentée avec Swagger !
Une fois le serveur lancé, ouvrez votre navigateur et allez sur :
> **http://localhost:3000/api-docs**

Vous pourrez y tester tous les endpoints directement depuis la page sans avoir besoin de Postman ou de la ligne de commande. 

## Exemples d'utilisation (Endpoints)

Voici une liste rapide des requêtes possibles :

### 1. Créer un article (POST)
**Endpoint :** `POST /api/articles`
**Exemple de corps (JSON) :**
```json
{
  "titre": "Découverte de Express",
  "contenu": "Express est un super framework pour Node.js. Très simple à apprendre.",
  "auteur": "Alice",
  "date": "2026-03-24",
  "categorie": "Developpement",
  "tags": "nodejs, express"
}
```

### 2. Lire les articles (GET)
**Endpoint :** `GET /api/articles`
*(Optionnel) Filtrer : `GET /api/articles?categorie=Developpement`*

### 3. Lire un article unique (GET)
**Endpoint :** `GET /api/articles/1`

### 4. Rechercher un article (GET)
**Endpoint :** `GET /api/articles/search?query=Express`

### 5. Modifier un article (PUT)
**Endpoint :** `PUT /api/articles/1`
**Exemple de corps :**
```json
{
  "titre": "Découverte de Express (Mis à jour)",
  "contenu": "Le texte a été modifié."
}
```

### 6. Supprimer un article (DELETE)
**Endpoint :** `DELETE /api/articles/1`

## Technologies Utilisées
* **Node.js**: Langage serveur
* **Express**: Framework web
* **SQLite**: Base de données légère intégrée
* **Swagger-UI-Express / yamljs**: Autogénération de l'interface de documentation
