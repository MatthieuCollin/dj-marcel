# DJ Marcel - POC Système de Gestion des Réservations

Un POC minimal et fonctionnel pour gérer les réservations de soirées, les playlists et les clients de DJ Marcel.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│           FRONTEND (HTML/CSS/JS)                │
├─────────────────────────────────────────────────┤
│  📅 Page Client         │   🎧 Page DJ Marcel   │
│  - Réserver soirées     │   - Voir soirées      │
│  - Voir réservations    │   - Gérer playlists   │
└─────────────────────────────────────────────────┘
              ↕ (Fetch API)
┌─────────────────────────────────────────────────┐
│         BACKEND (Node.js + Express)             │
├─────────────────────────────────────────────────┤
│  Routes API                                     │
│  - GET/POST /api/soirees                        │
│  - GET/POST /api/clients                        │
│  - GET/PUT /api/playlists                       │
└─────────────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────────────┐
│         DATA STORE (En mémoire)                 │
├─────────────────────────────────────────────────┤
│  • Clients (id, name, email)                    │
│  • Soirées (id, date, location, capacity, ...)  │
│  • Playlists (id, soireeId, songs)              │
└─────────────────────────────────────────────────┘
```

## 📁 Structure des fichiers

```
dj-marcel/
├── server.js              # Serveur Express principal
├── package.json           # Dépendances
├── data/
│   └── store.js          # Logique de stockage en mémoire
├── views/
│   ├── client.html       # Page de réservation client
│   └── dj.html           # Page de gestion DJ Marcel
└── public/               # Fichiers statiques (vides pour POC)
```

## ✨ Fonctionnalités

### 🎯 Page Client (`/`)
- **Sélectionner son profil** : Choisir parmi les clients existants
- **Voir les soirées disponibles** : Liste avec date, lieu et places
- **Visualiser la capacité** : Barre de progression des places occupées
- **Réserver une soirée** : S'inscrire à une soirée (si places disponibles)
- **Annuler une réservation** : Libérer sa place

### 🎧 Page DJ Marcel (`/dj`)
- **Voir toutes les soirées** : Liste complète des soirées
- **Voir les clients réservés** : Affichage des participants à chaque soirée
- **Gérer les playlists** : 
  - Ajouter des chansons à la playlist
  - Voir la liste des chansons
  - Supprimer des chansons

## 🚀 Démarrage rapide

### Installation
```bash
npm install
```

### Lancer le serveur
```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`

### URLs
- **Page Client** : http://localhost:3000/
- **Espace DJ** : http://localhost:3000/dj
- **API** : http://localhost:3000/api/...

## 📊 API Endpoints

### Soirées
```
GET    /api/soirees              # Lister toutes les soirées
GET    /api/soirees/:id          # Détails d'une soirée
POST   /api/soirees              # Créer une soirée
POST   /api/soirees/:id/reserve  # Ajouter une réservation
POST   /api/soirees/:id/cancel   # Annuler une réservation
```

### Clients
```
GET    /api/clients              # Lister tous les clients
```

### Playlists
```
GET    /api/playlists            # Lister toutes les playlists
GET    /api/playlists/:id        # Détails d'une playlist
GET    /api/soirees/:id/playlist # Playlist d'une soirée
PUT    /api/playlists/:id        # Modifier les chansons
```

## 💾 Données initiales

Le POC inclut des données d'exemple :
- **2 clients** : Alice Dupont, Bob Martin
- **2 soirées** : Club Sunset (15/12), Bar Moonlight (22/12)
- **2 playlists** : Une par soirée

Les données sont stockées **en mémoire** et seront réinitialisées au redémarrage du serveur.

## 🛠️ Technologies utilisées

- **Node.js** : Runtime JavaScript serveur
- **Express.js** : Framework web minimal
- **Body-parser** : Parser pour les requêtes POST
- **HTML5 / CSS3** : Interface utilisateur
- **Fetch API** : Communication client-serveur

## 📝 Exemple d'utilisation

### 1. Réserver une soirée (Client)
```javascript
// POST /api/soirees/1/reserve
{
  "clientId": 1
}
// Réponse : { success: true, soiree: {...} }
```

### 2. Ajouter une chanson (DJ)
```javascript
// PUT /api/playlists/1
{
  "songs": ["Song 1", "Song 2", "Song 3", "Nouvelle chanson"]
}
// Réponse : { success: true, playlist: {...} }
```

## 🎯 Améliorations futures

- Persistence en base de données (MongoDB, SQLite)
- Authentification des utilisateurs
- Suppression et modification des soirées
- Export des playlists (Spotify, Apple Music)
- Notifications de réservation
- Galerie de photos des soirées
- Système de notation/commentaires

## 📄 Licence

POC - Libre d'usage

---

**DJ Marcel POC** - Créé en 2025 pour la gestion des réservations de soirées
