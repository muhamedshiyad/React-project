import express from "express";
import mongoose from "mongoose";

import Product from "../models/product.model.js";
import { createProduct, deleteProduct, getproducts, updateProduct } from "../controllers/productcontroller.js";

const router = express.Router();
router.get("/",getproducts );
router.post("/", createProduct);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);

export default router;