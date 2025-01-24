import express from "express";
import dotenv from "dotenv";
import { connctDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/products", async (req, res) => {
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

app.delete("/api/products/:id",async (req, res) => {
    const {id} = req.params

   try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({sucess: true,message:"Product deleted successfully"});
   } catch (error) {
    res.status(404).json({sucess: false, message:"product not found"});
   }
});

app.listen(5000, () => {
    connctDB();
    console.log("Server started at http://localhost:5000");
});