// Stockage en mémoire pour le POC
let store = {
  clients: [
    { id: 1, name: "Alice Dupont", email: "alice@example.com" },
    { id: 2, name: "Bob Martin", email: "bob@example.com" }
  ],
  
  soirees: [
    { 
      id: 1, 
      date: "2025-12-15", 
      location: "Club Sunset", 
      capacity: 50,
      reservations: [1],
      playlistId: 1
    },
    { 
      id: 2, 
      date: "2025-12-22", 
      location: "Bar Moonlight", 
      capacity: 30,
      reservations: [2],
      playlistId: 2
    }
  ],
  
  playlists: [
    { 
      id: 1, 
      soireeId: 1, 
      name: "Sunset Vibes", 
      songs: ["Song 1", "Song 2", "Song 3"] 
    },
    { 
      id: 2, 
      soireeId: 2, 
      name: "Moonlight Mix", 
      songs: ["Track A", "Track B"] 
    }
  ]
};

let idCounters = {
  clients: 3,
  soirees: 3,
  playlists: 3
};

// Clients
exports.getClients = () => store.clients;
exports.getClient = (id) => store.clients.find(c => c.id === parseInt(id));
exports.createClient = (name, email) => {
  const client = { id: idCounters.clients++, name, email };
  store.clients.push(client);
  return client;
};

// Soirées
exports.getSoirees = () => store.soirees;
exports.getSoiree = (id) => store.soirees.find(s => s.id === parseInt(id));
exports.createSoiree = (date, location, capacity) => {
  const soiree = { 
    id: idCounters.soirees++, 
    date, 
    location, 
    capacity,
    reservations: [],
    playlistId: null
  };
  store.soirees.push(soiree);
  return soiree;
};

// Réservations
exports.addReservation = (soireeId, clientId) => {
  const soiree = exports.getSoiree(soireeId);
  if (!soiree) return null;
  
  if (soiree.reservations.includes(clientId)) {
    return { error: "Client already reserved for this party" };
  }
  
  if (soiree.reservations.length >= soiree.capacity) {
    return { error: "Party is full" };
  }
  
  soiree.reservations.push(clientId);
  return soiree;
};

exports.removeReservation = (soireeId, clientId) => {
  const soiree = exports.getSoiree(soireeId);
  if (!soiree) return null;
  
  soiree.reservations = soiree.reservations.filter(id => id !== clientId);
  return soiree;
};

// Playlists
exports.getPlaylists = () => store.playlists;
exports.getPlaylist = (id) => store.playlists.find(p => p.id === parseInt(id));
exports.getPlaylistBySoiree = (soireeId) => store.playlists.find(p => p.soireeId === parseInt(soireeId));

exports.createPlaylist = (soireeId, name) => {
  const playlist = {
    id: idCounters.playlists++,
    soireeId: parseInt(soireeId),
    name,
    songs: []
  };
  store.playlists.push(playlist);
  
  // Link to soiree
  const soiree = exports.getSoiree(soireeId);
  if (soiree) {
    soiree.playlistId = playlist.id;
  }
  
  return playlist;
};

exports.updatePlaylist = (playlistId, songs) => {
  const playlist = exports.getPlaylist(playlistId);
  if (!playlist) return null;
  
  playlist.songs = songs;
  return playlist;
};

exports.addSongToPlaylist = (playlistId, song) => {
  const playlist = exports.getPlaylist(playlistId);
  if (!playlist) return null;
  
  playlist.songs.push(song);
  return playlist;
};
