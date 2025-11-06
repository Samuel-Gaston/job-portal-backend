import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {Server} from 'socket.io';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import UserRouter from './Routes/Ruser.js';
import JobRouter from './Routes/Rjob.js';
import InterviewRouter from './Routes/Rinterview.js';
import ApplicationRouter from './Routes/Rapplication.js';
import AdminRouter from './Routes/Radmin.js';

dotenv.config();
const app = express();
app.use(cors({
     origin:"*",
     methods:["GET", "POST", "PUT", "DELETE"],
     allowedHeaders:["Content-Type", "Authorization"],
     credentials:true,
     
}));
app.use(express.json());
app.use(cookieParser());
const Port = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
let server = null;
mongoose
.connect(DB_URL) .then(() =>
     {server = app.listen(Port, ()=> console.log(`server running on http://localhost:${Port}`));})
.catch((error) => console.log(error));
const io = new Server(server);
app.get("/", (req, res) => res.send("hello from REST API"))
app.use("/user", UserRouter);
app.use("/admin", AdminRouter);
app.use("/job", JobRouter);
app.use("/interview", InterviewRouter);
app.use("/application", ApplicationRouter)

