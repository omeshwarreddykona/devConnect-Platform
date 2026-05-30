import express from "express";
import router from "./routes/routes.js";
import connectDB from "./database/db.js";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
config();

const Port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(helmet());
app.use(morgan("dev"));

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