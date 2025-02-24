const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');

//const server = new WebSocket.Server({ port: 3000 });
const server = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
});

const wss = new WebSocket.Server({ server });

server.on('connection', (socket) => {
    console.log('Client is connected');

    socket.on('message', (message) => {
        console.log(`Received the message: ${message}`);
    });

    socket.on('close', () => {
        console.log('Client is disconnected');
    });
});