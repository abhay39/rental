import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import userRoutes from './route/userRoute.js';
import listingRoutes from './route/listingRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import messageRoutes from './route/messageRoute.js';
import Message from './models/messageModel.js';

dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust the CORS settings as needed
  }
});

const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    }catch(error){
        console.error("Error connecting to MongoDB",error.message);
        process.exit(1);
    }
}


connect();
app.get("/",async(req,res)=>{
    res.json({
        message: "Hello, World!"
    })
})

app.get("/api/latest",async(req,res)=>{
    const response=await fetch('https://estate.100jsprojects.com/api/listing?offer=true&limit=4&order=asc&sort=createAt');
    const data=await response.json();
    res.json(data);
})


// user routes
app.use("/api/user",userRoutes)

// listing routes
app.use("/api/listing",listingRoutes)


// Socket.IO setup
const onlineUsers = new Map();
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('user connected', (userId) => {
    onlineUsers.set(userId, socket.id); // Map userId to the socket ID
    io.emit('user status', { userId, status: 'online' });
    console.log(`${userId} is online`);
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
    // Optionally, save the message to the database
    const newMessage=new Message(msg);
    newMessage.save();
    // Implement message persistence and retrieval in your database here, if required.
  });

  socket.on('disconnect', () => {
     const userId = [...onlineUsers.entries()].find(([key, value]) => value === socket.id)?.[0];
    if (userId) {
      onlineUsers.delete(userId);
      io.emit('user status', { userId, status: 'offline' });
      console.log(`${userId} is offline`);
    }
  });
});


// message routes
app.use('/api/messages', messageRoutes(io));

server.listen(5000,()=>{
    console.log("Server is running on port 5000");
});