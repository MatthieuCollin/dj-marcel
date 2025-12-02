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

// ---- PLAYLISTS ----
app.get('/api/playlists', (req, res) => res.json(store.getPlaylists()));

app.post('/api/playlists', (req, res) => {
  const { name } = req.body;
  res.json(store.createPlaylist(name));
});

// ---- CHANSONS ----
app.post('/api/playlists/:id/songs', (req, res) => {
  const p = store.addSong(parseInt(req.params.id), req.body.song);
  res.json(p);
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

// ---- PAGES ----
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/admin.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin.html')));
app.get('/client.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'client.html')));
app.get('/client', (req, res) => res.sendFile(path.join(__dirname, 'views', 'client.html')));
app.get('/dj.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dj.html')));
app.get('/dj', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dj.html')));

app.listen(PORT, () => console.log(`DJ Marcel running at http://localhost:${PORT}`));
