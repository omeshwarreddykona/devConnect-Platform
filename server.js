import express from "express";
import router from "./routes/routes.js";
import connectDB from "./database/db.js";
import { config } from "dotenv";
config();

const Port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


connectDB();

app.use('/', router);

app.use((error,req,res,next)=>{
    res.status(error.code || 500).json({
        success:false,
        message : error.message || "Internal Server Error"
    })
})

app.listen(Port, () => {
    console.log("Server is running")
})