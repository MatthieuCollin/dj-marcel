const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const store = require('./data/store');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ==================== API ROUTES ====================

// GET all parties
app.get('/api/soirees', (req, res) => {
  const soirees = store.getSoirees().map(s => ({
    ...s,
    clientsCount: s.reservations.length,
    availableSpots: s.capacity - s.reservations.length
  }));
  res.json(soirees);
});

// GET all clients
app.get('/api/clients', (req, res) => {
  res.json(store.getClients());
});

// GET all playlists
app.get('/api/playlists', (req, res) => {
  res.json(store.getPlaylists());
});

// GET playlist for a specific party
app.get('/api/soirees/:id/playlist', (req, res) => {
  const playlist = store.getPlaylistBySoiree(req.params.id);
  if (!playlist) {
    return res.status(404).json({ error: 'Playlist not found' });
  }
  res.json(playlist);
});

// GET details of one party with client info
app.get('/api/soirees/:id', (req, res) => {
  const soiree = store.getSoiree(req.params.id);
  if (!soiree) {
    return res.status(404).json({ error: 'Party not found' });
  }
  
  const clients = store.getClients();
  const reservedClients = soiree.reservations.map(clientId => 
    clients.find(c => c.id === clientId)
  );
  
  res.json({
    ...soiree,
    reservedClients,
    availableSpots: soiree.capacity - soiree.reservations.length
  });
});

// POST - Add a reservation
app.post('/api/soirees/:soireeId/reserve', (req, res) => {
  const { clientId } = req.body;
  const result = store.addReservation(parseInt(req.params.soireeId), parseInt(clientId));
  
  if (result.error) {
    return res.status(400).json(result);
  }
  
  res.json({ success: true, message: 'Reservation added', soiree: result });
});

// POST - Remove a reservation
app.post('/api/soirees/:soireeId/cancel', (req, res) => {
  const { clientId } = req.body;
  const result = store.removeReservation(parseInt(req.params.soireeId), parseInt(clientId));
  
  if (!result) {
    return res.status(404).json({ error: 'Party not found' });
  }
  
  res.json({ success: true, message: 'Reservation cancelled', soiree: result });
});

// POST - Create a new party
app.post('/api/soirees', (req, res) => {
  const { date, location, capacity } = req.body;
  
  if (!date || !location || !capacity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const soiree = store.createSoiree(date, location, parseInt(capacity));
  const playlist = store.createPlaylist(soiree.id, `Playlist - ${location}`);
  
  res.json({ success: true, soiree, playlist });
});

// PUT - Update playlist songs
app.put('/api/playlists/:id', (req, res) => {
  const { songs } = req.body;
  
  if (!Array.isArray(songs)) {
    return res.status(400).json({ error: 'Songs must be an array' });
  }
  
  const playlist = store.updatePlaylist(parseInt(req.params.id), songs);
  
  if (!playlist) {
    return res.status(404).json({ error: 'Playlist not found' });
  }
  
  res.json({ success: true, playlist });
});

// ==================== PAGE ROUTES ====================

// Page d'accueil - Réservations clients
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'client.html'));
});

// Page DJ Marcel - Gestion des soirées et playlists
app.get('/dj', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dj.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🎉 DJ Marcel POC running at http://localhost:${PORT}`);
  console.log(`📝 Client page: http://localhost:${PORT}/`);
  console.log(`🎧 DJ page: http://localhost:${PORT}/dj`);
});
