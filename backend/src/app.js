import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import path from 'path'
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));



app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.get('/ok',(req,res)=>{
    res.send('server is running well')
})

// users routes
import userRoutes from './routes/user.routes.js';
app.use('/api/users', userRoutes);

// chat routes
import chatRoutes from './routes/chat.routes.js';
app.use('/api/chat', chatRoutes);


export {app}