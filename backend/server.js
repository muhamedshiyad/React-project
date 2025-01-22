import express from "express";
import dotenv from "dotenv";
import { connctDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/products", (req, res) => {});


app.listen(5000, () => {
    connctDB();
    console.log("Server started at http://localhost:5000");
});