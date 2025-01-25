import express from "express";
import dotenv from "dotenv";
import { connctDB } from "./config/db.js";

import productRoutes from "./routes/productroutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products",productRoutes);

app.listen(5000, () => {
    connctDB();
    console.log("Server started at http://localhost:5000");
});