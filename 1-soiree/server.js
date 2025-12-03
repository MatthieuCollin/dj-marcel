const Consul = require('consul');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const store = require('./data/store');

const consul = new Consul({host: 'consul'});
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const CONSUL_SERVICE_NAME = 'soiree-api';
const CONSUL_SERVICE_ID = `${CONSUL_SERVICE_NAME}-${Math.floor(Math.random() * 1000)}`;
const LISTEN_PORT = 3001; 

const networkAddress = os.networkInterfaces();
const container_ip = networkAddress['eth0'][0].address;
const registerService = async () => {
  try {
    await consul.agent.service.register({
      name: CONSUL_SERVICE_NAME,
      id: CONSUL_SERVICE_ID,
      port: LISTEN_PORT,
      address: container_ip,
      check: {
        interval: '10s',
        http: `/health`,
        timeout: '10s'
      }
    });
    console.log(`Service registered with consul at ${container_ip}:${LISTEN_PORT}`);
  } catch (err) {
    console.error(`Error deregistering service from Consul;`, err);
    process.exit(1);
  }
};

const deregisterService = async () => {
  try {
    await consul.agent.service.deregister(CONSUL_SERVICE_ID);
    console.log("Service deregistered from consul");
    process.exit();
  } catch (err) {
    console.log("Error deregistering serivce from consul:", err);
    process.exit();
  }
};

process.on('SIGINT', deregisterService);
process.on('SIGTERM', deregisterService);

// ---- SOIREES ----
app.get('/api/soirees', (req, res) => res.json(store.getSoirees()));

app.post('/api/soirees', async (req, res) => {
  const { name, date, location, capacity, playlistIds } = req.body;

  let playlists = await fetch('http://playlist:3001/api/playlists').catch(e => console.log(e) );
  playlists = await playlists.json();
  const playlist = playlists.find(playlist => playlist.name === playlistIds);
  if(!playlist) return res.status(404).json({message : "Playlist non trouvée"});
  res.json(store.createSoiree(name, date, location, capacity, playlistIds));
  
});

app.get('/health', (req, res) => res.status(200).send());

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
