import mongoose from "mongoose";
const cartSchema = mongoose.Schema({
    id:{
        type: String,
        required:true,
    },
    cart:{
        type:Array,
        required:true
    }
},{
    timestamps:true
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

