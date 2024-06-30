import {apiSlice} from './apiSlice'
const PRODUCTS_URL = '/api/products'

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts:builder.mutation({
            query: () => ({
                url: `${PRODUCTS_URL}/get-products`,
                method: 'GET',
            }),
        }),
        createProduct:builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/create-product`,
                method: 'POST',
                body: data
            }),
        }),
    }),
})

export const { useGetProductsMutation, useCreateProductMutation} = productsApiSlice;