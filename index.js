import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";


//file imports
import connectDB from "./config/db.js";

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes


//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(8080, () => {
  console.log(
    `Node server Running in ${process.env.DEV_MODE} Mode on port ${PORT}`
  );
});