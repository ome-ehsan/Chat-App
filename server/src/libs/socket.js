import {Server} from 'socket.io';
import express from 'express';
import http from 'http';

const app = express();

const server = http.createServer(app);

const io = new Server( server, {
    cors : {
        origin: ["http://localhost:5173"]
    }
});

const userSocketMap = {}; // will store user_id : socket_id

export const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId];
}


io.on( "connection", (socket)=>{
    console.log("A user has connceted", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id; // mapping user_id to socket_id

    io.emit("getActiveUsers", Object.keys(userSocketMap)); // sending active users to all clients

    socket.on("disconnect", ()=>{
        console.log("A user has disconnected", socket.id);
        delete userSocketMap[userId]; // removing user from active users list
        io.emit("getActiveUsers", Object.keys(userSocketMap)); // sending active users to all clients
    })
});




export { io, server, app };
