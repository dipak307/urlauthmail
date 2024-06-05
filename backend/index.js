import express from "express";
import dotenv from  "dotenv";
import mongoose from "mongoose";
import Router from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
 dotenv.config();
const app=express();
let PORT=5000;


  app.use(express.json());
  app.use(cors({
       origin:"http://localhost:3001",
       methods:['POST','GET'],
       credentials:true,
     }))
  app.use('/auth/',Router);
  app.use(cookieParser());
     
     mongoose.connect("mongodb://127.0.0.1:27017/authenticate")
     .then(console.log('db connected...'))
     .catch((err)=>{
          console.log('error to connect db',err)
     })



app.get("/",(req,res)=>{
          res.send("i am from backend....")
})

app.listen(PORT,()=>{
     console.log("server is running on ",PORT);
})




