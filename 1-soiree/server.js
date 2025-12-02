const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const store = require('./data/store');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---- SOIREES ----
app.get('/api/soirees', (req, res) => res.json(store.getSoirees()));

app.post('/api/soirees', (req, res) => {
  const { name, date, location, capacity, playlistIds } = req.body;
  res.json(store.createSoiree(name, date, location, capacity, playlistIds));
});

app.delete('/api/soirees/:id', (req, res) => {
  store.deleteSoiree(parseInt(req.params.id));
  res.json({ success: true });
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
