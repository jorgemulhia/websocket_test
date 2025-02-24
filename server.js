const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');
const port = 8080;

var certContent = fs.readFileSync("./cert.pem", "utf8");
var keysContent = fs.readFileSync("./key.pem", "utf8");
//console.log("Cert content:", certContent, keysContent);

const server = https
    .createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'),
        passphrase: "Tigri_1806"
    })
    .listen(port, () => {
        console.log(`Secure server listening on port:${port}`);
    });

const wss = new WebSocket.Server({
    server,
    verifyClient: (info, cb) => {
        console.log('-> info: ' + info);
        console.log('-> cb: ' + cb);
        const origin = info.origin;
        // Validate origin here
        cb(true);
    }
});

wss.on('connection', (ws) => {
    console.log('New client connected');

    // When the server receives a message from the client
    ws.on('message', (message) => {
        console.log('Received:', message);

        // Respond to the client
        ws.send('Server received: ' + message);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
//console.log('WebSocket server is running on ws://localhost:', port);