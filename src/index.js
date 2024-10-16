const app = require('./app');
const { ExpressPeerServer} = require('peer');
const socket = require('./socket');
const https = require('https');
const PORT = process.env.PORT || 8080;
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, 'certs/cert.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'certs/cert.crt'), 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Création du serveur HTTPS
const server = https.createServer(credentials, app);

app.use("/peerjs", ExpressPeerServer(server));

// Initialisation de Socket.IO
socket(server);

// Démarrer le serveur
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});