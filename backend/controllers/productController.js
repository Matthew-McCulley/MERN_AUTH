import asyncHandler from 'express-async-handler'
import Product from '../models/productModels.js'
import { uploadFile } from '../utils/s3.js';
// @desc    create Product
// route    POST /api/products
// @access  Public
const createProduct = asyncHandler(async (req,res) => {
    const {name,price} = req.body;
    const image = `${process.env.AWS_BASE_URL}/${req.file.originalname}`;
    uploadFile(req.file);
    const product = await Product.create({
        name,
        image,
        price
    })
    if(product)
    {
        res.status(201).json({
            _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price
        })
    }else{
        res.status(400)
        throw new Error('Invalid product data')
    }
} );

// @desc    create Product
// route    GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find();
    if(products){
        res.status(200).json(products);
    }else{
        res.status(400)
        throw new Error('Invalid product data')
    }
} );

export {createProduct,getProducts}