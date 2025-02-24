const WebSocket = require('ws');
const readline = require('readline');

//const socket = new WebSocket('ws://localhost:8080');
const socket = new WebSocket('wss://localhost:8080/', {
    protocolVersion: 8,
    origin: 'https://localhost:8080',
    rejectUnauthorized: false
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

socket.on('error', console.error);

socket.on('open', () => {
    console.log('Connected to server');

    rl.question('Enter message to send: ', message => {
        socket.send(message);
    });
});

socket.on('message', message => {
    console.log('Message from server: ' + message);

    // Prompt for the next message after receiving a response
    rl.question('Enter message to send: ', message => {
        socket.send(message);
    });
});

socket.on('close', () => {
    console.log('Connection closed');
    rl.close();
});