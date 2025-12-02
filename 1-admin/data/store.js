// ---- STORE EN MÉMOIRE ----

// Une soirée n’a plus de playlist interne : juste une liste d’IDs
// Une playlist est indépendante et contient ses chansons

let store = {
    soirees: [
        {
            id: 1,
            name: "Alice Dupont",
            date: "2025-12-15",
            location: "Club Sunset",
            capacity: 50,
            playlistIds: [1]   // Association vers des playlists
        },
        {
            id: 2,
            name: "Bob Martin",
            date: "2025-12-22",
            location: "Bar Moonlight",
            capacity: 30,
            playlistIds: [2]
        }
    ],

    playlists: [
        { id: 1, name: "Sunset Vibes", songs: ["Song 1", "Song 2"] },
        { id: 2, name: "Moonlight Mix", songs: ["Track A"] }
    ]
};

let idCounters = {
    soirees: 3,
    playlists: 3
};

// ---- SOIREES ----
exports.getSoirees = () => store.soirees;

exports.createSoiree = (name, date, location, capacity, playlistIds) => {
    const s = {
        id: idCounters.soirees++,
        name, date, location,
        capacity,
        playlistIds: playlistIds || []
    };
    store.soirees.push(s);
    return s;
};

exports.deleteSoiree = (id) => {
    store.soirees = store.soirees.filter(s => s.id !== id);
};

// ---- PLAYLISTS ----
exports.getPlaylists = () => store.playlists;

exports.createPlaylist = (name) => {
    const p = { id: idCounters.playlists++, name, songs: [] };
    store.playlists.push(p);
    return p;
};

exports.addSong = (playlistId, song) => {
    const playlist = store.playlists.find(p => p.id === playlistId);
    if (playlist) playlist.songs.push(song);
    return playlist;
};

exports.removeSong = (playlistId, index) => {
    const playlist = store.playlists.find(p => p.id === playlistId);
    if (playlist && playlist.songs[index])
        playlist.songs.splice(index, 1);
    return playlist;
};

// Associer une playlist à une soirée
exports.attachPlaylist = (soireeId, playlistId) => {
    const s = store.soirees.find(s => s.id === soireeId);
    if (!s) return null;
    if (!s.playlistIds.includes(playlistId))
        s.playlistIds.push(playlistId);
    return s;
};
