import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import {apiSlice} from './slices/apiSlice'
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
const store = configureStore({
    reducer:{
        auth:authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        products:productsReducer,
        cart:cartReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    }).concat(apiSlice.middleware),
    devTools:true
})

export default store