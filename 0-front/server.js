const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---- PAGES ----
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/admin.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin.html')));
app.get('/client.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'client.html')));
app.get('/client', (req, res) => res.sendFile(path.join(__dirname, 'views', 'client.html')));
app.get('/dj.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dj.html')));
app.get('/dj', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dj.html')));

app.listen(PORT, () => console.log(`DJ Marcel running at http://localhost:${PORT}`));
