import {apiSlice} from './apiSlice'
const CARTS_URL = '/api/carts'

export const cartsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart:builder.mutation({
            query: (data) => ({
                url: `${CARTS_URL}/get-cart`,
                method: 'POST',
                body: data
            }),
        }),
        uploadCart:builder.mutation({
            query: (data) => ({
                url: `${CARTS_URL}/upload-cart`,
                method: 'PUT',
                body: data
            }),
        }),
    }),
})

export const { useGetCartMutation, useUploadCartMutation} = cartsApiSlice;