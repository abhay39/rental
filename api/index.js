import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import userRoutes from './route/userRoute.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())

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

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});