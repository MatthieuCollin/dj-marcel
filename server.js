const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const store = require('./data/store');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// CLIENTS (= SOIREES avec PLAYLISTS incluses)
app.get('/api/clients', (req, res) => res.json(store.getClients()));
app.post('/api/clients', (req, res) => {
  const { name, date, location, capacity, playlistName } = req.body;
  if (!name || !date || !location || !capacity || !playlistName) 
    return res.status(400).json({ error: 'Missing fields' });
  res.json(store.createClient(name, date, location, parseInt(capacity), playlistName));
});
app.delete('/api/clients/:id', (req, res) => {
  store.deleteClient(parseInt(req.params.id));
  res.json({ success: true });
});

// PLAYLIST SONGS
app.post('/api/clients/:id/songs', (req, res) => {
  const { song } = req.body;
  if (!song) return res.status(400).json({ error: 'Missing song' });
  const client = store.addSongToPlaylist(parseInt(req.params.id), song);
  if (!client) return res.status(404).json({ error: 'Not found' });
  res.json(client);
});
app.delete('/api/clients/:id/songs/:index', (req, res) => {
  const client = store.removeSongFromPlaylist(parseInt(req.params.id), parseInt(req.params.index));
  if (!client) return res.status(404).json({ error: 'Not found' });
  res.json(client);
});

// PAGES
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));

app.listen(PORT, () => console.log(`DJ Marcel running at http://localhost:${PORT}`));
