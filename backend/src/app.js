import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import path from 'path'

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


export {app}