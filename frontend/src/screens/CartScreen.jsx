import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import  Container  from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { subtractProduct, addProduct } from '../slices/cartSlice'

const CartScreen = () => {
    let cart = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const [subtotal, setSubtotal] = useState(0.00)
    const calculateSubtotal = () => {
        let temp = 0;
        cart.forEach((item) => {
          temp += item.product.price * item.quantity;
        });
        temp *= 1.13
        return temp;
    }
    
    return (
      <Container className="w-100 d-flex justify-content-evenly">
        <div className=' w-50 d-flex flex-column'>
          {cart.map((item,index) => {
            return (
              <Card key={index} className="d-flex flex-row justify-content-between mb-5">
              <Card.Img className='my-3 mx-3 w-50 border border-rounded' src={item.product.image} />
              <Card.Body className="d-flex flex-column align-items-center justify-content-between w-100">
                <Card.Title className="text-center">{item.product.name}</Card.Title>
                  <Card.Text className="my-auto">${item.product.price} X {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}</Card.Text>
                  <div className='d-flex flex-row'>
                      <Button className="border-dark mx-2 text-dark bg-white" onClick={() => { dispatch(subtractProduct(item.product)) }}>-</Button>
                      <Button className="border-0 bg-warning" onClick={() => { dispatch(addProduct(item.product)) }}>+</Button>
                  </div>
              </Card.Body>
            </Card>
            )
          })}
        </div>
        <div style={{width:"40%"}}>
        <Card>
          <Card.Title className='text-center mt-2'>Total</Card.Title>
          <Card.Body>
              {cart.map((item,index) => {
                return (
                  <div key = {index} className=" d-flex justify-content-between">
                    <Card.Text>
                      {item.product.name} X {item.quantity}
                    </Card.Text>
                    <Card.Text key={index}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Card.Text>
                  </div>
                )
              })}
              <div className='d-flex justify-content-between'>
                <Card.Text>HST</Card.Text>
                <Card.Text>${(calculateSubtotal()*0.13).toFixed(2)}</Card.Text>
              </div>
          </Card.Body>
          <Card.Footer>
                <div className=" d-flex justify-content-between">
                    <Card.Text>Subotal</Card.Text>
                    <Card.Text>${calculateSubtotal().toFixed(2)}</Card.Text>
                  </div>
          </Card.Footer>
        </Card>
        </div>
      </Container>
    )
  
}

export default CartScreen