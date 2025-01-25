import express from "express";
import Product from "../models/product.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({sucess: true, data:products});
    } catch (error) {
        console.log("Error in fetching products:",error.message);
        res.status(500).json({sucess: false, message:"server Error"});
    }
});

router.post("/", async (req, res) => {
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

router.put("/:id",async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message:"invalid product id"});
    }

    try {
       const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
       res.status(200).json({sucess: true, data:updatedProduct});
    } catch (error) {
        res.status(500).json({sucess: false, message:"server Error"});
    }
});

router.delete("/:id",async (req, res) => {
    const {id} = req.params

   try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({sucess: true,message:"Product deleted successfully"});
   } catch (error) {
    console.log("Error in delete product:",error.message);
    res.status(404).json({sucess: false, message:"product not found"});
   }
});

export default router;