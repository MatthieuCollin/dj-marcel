const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const store = require('./data/store');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---- PLAYLISTS ----
app.get('/api/playlists', (req, res) => res.json(store.getPlaylists()));

app.post('/api/playlists', (req, res) => {
  const { name } = req.body;
  res.json(store.createPlaylist(name));
});

app.delete('/api/playlists/:id/songs/:index', (req, res) => {
  const p = store.removeSong(parseInt(req.params.id), parseInt(req.params.index));
  res.json(p);
});

// ---- ASSOCIER PLAYLIST À UNE SOIRÉE ----
app.post('/api/soirees/:id/playlists', (req, res) => {
  const soiree = store.attachPlaylist(
    parseInt(req.params.id),
    parseInt(req.body.playlistId)
  );
  res.json(soiree);
});

app.listen(PORT, () => console.log(`DJ Marcel running at http://localhost:${PORT}`));
