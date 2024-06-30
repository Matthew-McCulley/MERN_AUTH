import express from 'express'
const router = express.Router()
import {uploadCart,getCart} from "../controllers/cartController.js";
router.put("/upload-cart", uploadCart);
router.post("/get-cart", getCart);

export default router;