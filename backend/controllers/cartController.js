import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModels.js'

// @desc    get cart
// route    POST /api/carts
// @access  Public
const getCart = asyncHandler(async (req,res) => {
    const {id} = req.body;

    const cartObject = await Cart.findOne({id:id});
    if(cartObject){
        res.status(200).json(cartObject.cart);
    }else{
        res.status(400)
        throw new Error('Could not get cart.');
    }
    
} );

const uploadCart = asyncHandler(async(req,res) => {
    const {id, cartItems} = req.body;
    try{
        const updatedCart = await Cart.findOneAndUpdate(
            {id: id},
            {cart: cartItems}
        );

        if(updatedCart){
            res.status(201).json({
                _cartId: updatedCart._id,
                _userId: updatedCart.id,
                 cart: updatedCart.cart
            })
        }else{
            res.status(400)
            throw new Error('Error updating Cart');
        }
    }catch(err){
        const usersCart = await Cart.create(
            {id: id,
            cart: cartItems}
        )
        if(usersCart)
            {
                res.status(201).json({
                    _cartId: usersCart._id,
                    _userId: usersCart.id,
                    cart: usersCart.cart
                })
        }else{
            res.status(400)
            throw new Error('Error uploading Cart');
        } 
    }
})

export {uploadCart,getCart}