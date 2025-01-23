import express from "express";
import dotenv from "dotenv";
import { connctDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.get("/products", async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({sucess: false, message: "All fields are required"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({sucess: true, data:newProduct});
    } catch (error) {
        console.error("Error in create product:",error.message);
        res.status(500).json({sucess: false, message:"server Error"});
    }
});


app.listen(5000, () => {
    connctDB();
    console.log("Server started at http://localhost:5000");
});