"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on('connection', (socket) => {
    socket.on('message', (msg) => {
        const parsedMsg = JSON.parse(msg);
        if (parsedMsg.type === 'join') {
            allSockets.push({
                socket,
                room: parsedMsg.payload.roomId
            });
        }
        if (parsedMsg.type == 'chat') {
            let currentUserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].socket == socket) {
                    currentUserRoom = allSockets[i].room;
                    console.log(currentUserRoom);
                }
            }
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room == currentUserRoom) {
                    allSockets[i].socket.send(parsedMsg.payload.message);
                }
            }
        }
    });
});
