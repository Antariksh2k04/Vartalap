import express from "express";
import bodyParser from "body-parser"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
dotenv.config()
const PORT=process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)


app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}` );
    connectDB();
})