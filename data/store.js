// Stockage en mémoire pour le POC
// Un client = une soirée avec une seule playlist
let store = {
  clients: [
    { id: 1, name: "Alice Dupont", date: "2025-12-15", location: "Club Sunset", capacity: 50, playlistName: "Sunset Vibes", songs: ["Song 1", "Song 2"] },
    { id: 2, name: "Bob Martin", date: "2025-12-22", location: "Bar Moonlight", capacity: 30, playlistName: "Moonlight Mix", songs: ["Track A"] }
  ]
};

let idCounters = { clients: 3 };

// CLIENTS (= SOIREES avec PLAYLISTS incluses)
exports.getClients = () => store.clients;

exports.createClient = (name, date, location, capacity, playlistName) => {
  const client = { id: idCounters.clients++, name, date, location, capacity, playlistName, songs: [] };
  store.clients.push(client);
  return client;
};

exports.deleteClient = (id) => {
  store.clients = store.clients.filter(c => c.id !== id);
};

// PLAYLIST SONGS (gérée via le client)
exports.addSongToPlaylist = (clientId, song) => {
  const client = store.clients.find(c => c.id === clientId);
  if (client) client.songs.push(song);
  return client;
};

exports.removeSongFromPlaylist = (clientId, index) => {
  const client = store.clients.find(c => c.id === clientId);
  if (client && client.songs[index]) client.songs.splice(index, 1);
  return client;
};
