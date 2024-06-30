import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : new Array()
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct:(state,action) => {
            let cartItems = state.cartItems;
            let obj = undefined;
            if (cartItems.length > 0){
                obj = cartItems.find((obj) => {
                    return action.payload._id === obj.product._id;
                });
            }
            

            if(obj === undefined){
                cartItems.push({product:action.payload, quantity:1});
            }else{
                obj.quantity++;
            }
            state.cartItems = cartItems;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));


        },
        subtractProduct:(state,action) => {
            let cartItems = state.cartItems;

            let obj = cartItems.find((obj) => {
                return action.payload._id === obj.product._id;
            })

            if(obj !== undefined){
                obj.quantity--;
                if (obj.quantity <= 0){
                    cartItems = cartItems.filter((o) => {
                        return o.product._id != obj.product._id;
                    })
                }
                state.cartItems = cartItems;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            }
        },
        resetCart: (state) => {
            state.cartItems = new Array();
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        setCart: (state, action) => {
            state.cartItems = action.payload;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
    }
});

export const {addProduct,subtractProduct, resetCart, setCart} = cartSlice.actions;
export default cartSlice.reducer;