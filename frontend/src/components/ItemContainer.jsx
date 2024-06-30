import React from 'react';
import { useState,useEffect } from 'react';
import { useGetProductsMutation } from '../slices/productsApiSlice';
import { Container, Card, Image} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {toast} from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux';
import { setProducts } from '../slices/productsSlice';
import Button from 'react-bootstrap/Button';
import { addProduct, subtractProduct } from '../slices/cartSlice';

const ItemContainer = () => {
  const [getProducts, {isLoading}] = useGetProductsMutation();
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.products);
  const retrieveProducts = async () => {
      const res = await getProducts();
      dispatch(setProducts(res.data));
  }
  useEffect( () => {
      retrieveProducts();
    
  },[]);
  return (
            <Container className='row md:col d-flex sm:justify-content-center justify-content-around'>
                { products && products.map((product,index) => {
                  return (
                  <Card key={index} className="d-flex justify-content-between mt-5" style={{ width: '18rem', height:"24rem" }}>
                    <Card.Img className='pt-3 px-3' style={{height:"270px"}} src={product.image}/>
                    <Card.Body>
                      <Card.Title className="text-center">{product.name}</Card.Title>
                      <Container className="d-flex bd-highlight mt-3">
                        <Card.Text className="my-auto flex-grow-1 bd-highlight">
                          ${product.price}
                        </Card.Text>
                        <Button className="border-dark mx-2 text-dark bg-white bd-highlight" onClick={()=>{dispatch(subtractProduct(product))}}>-</Button>
                        <Button className="border-0 bg-warning bd-highlight" onClick={()=>{dispatch(addProduct(product))}}>+</Button>
                      </Container>
                    </Card.Body>
                  </Card>)
                  
                })}     
            </Container>
  )
}

export default ItemContainer