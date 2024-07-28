import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Import the connectDB function
import connectDB from './config/db.js';

// Import routes
import userRoutes from "./routes/userRoutes.js"

//dotEnv config
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an Express app
const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/v1/user", userRoutes)



app.get("/", (req,res)=>{
    res.send("Api Ruuning")
});

app.listen(process.env.PORT);
