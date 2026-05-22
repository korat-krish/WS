import express from 'express';
import { Server } from "socket.io";
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express();

const server = createServer(app);

const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {

    socket.on('join', (username) => {

        socket.username = username;

        console.log(`${socket.username} joined`);

        // Notify all users that someone joined
        io.emit('user-joined', username);

    });

    socket.on('message', (msg) => {

        console.log(`${socket.username}: ${msg}`);

        // Broadcast message to all connected users
        io.emit('message', {
            username: socket.username,
            msg: msg
        });

    });

    socket.on('disconnect', () => {

        console.log(`${socket.username} disconnected`);

        // Notify all users that someone left
        io.emit('user-left', socket.username);

    });

});

server.listen(5050, () => {
    console.log("Server Started");
});