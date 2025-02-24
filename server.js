const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');
const port = 8080;

var certContent = fs.readFileSync('./cert.pem', 'utf8');
var keyContent = fs.readFileSync('./key.pem', 'utf8');
var passphrase = 'Tigri_1806';
//console.log('Cert content:', certContent, keyContent);

const server = https
    .createServer({
        key: keyContent,
        cert: certContent,
        passphrase: passphrase
    })
    .listen(port, () => {
        console.log('Secure server listening on port:' + port);
    });

const wss = new WebSocket.Server({
    server,
    verifyClient: (info, cb) => {
        //console.log('-> info: ' + info);
        //console.log('-> cb: ' + cb);
        const origin = info.origin;
        // Validate origin here
        cb(true);
    }
});

wss.on('connection', socket => {
    console.log('New client connected');

    socket.on('error', console.error);

    socket.on('message', message => {
        console.log('Received: ' + message);

        // Respond to the client
        socket.send('Server received: ' + message);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });

    socket.onerror = error => {
        console.log('Client Error: ' + error);
    };
});
console.log('WebSocket server is running');