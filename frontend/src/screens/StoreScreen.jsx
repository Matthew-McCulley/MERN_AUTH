import React, { useState } from 'react'
import {Form,Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {toast} from 'react-toastify'
import { useCreateProductMutation } from '../slices/productsApiSlice'
const StoreScreen = () => {
    const [name,setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [createProduct, {isLoading}] = useCreateProductMutation();
    const checkPrice = (cost) => {
        const parse = parseFloat(cost);
        if(isNaN(parse)){
        }else{
            setPrice(cost);
        }
    };

    const submitHandler = async(e) => {
        e.preventDefault()
        if(name === '' || price === '' || image === ''){
            toast.warning("Please upload all fields");
        }else{
            try{
                const formData = new FormData();
                formData.append('name', name);
                formData.append('price', price);
                formData.append('image', image);
                console.log(image);
                //TODO: SEND ITEM TO BACKEND
                const res = await createProduct(formData).unwrap();
                toast.success('Product Uploaded');
            }catch(err){
                toast.error(err?.data?.message || err.error);
            }
        }
    }
  return (
    <FormContainer>
        <h1>Upload T-shirt</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className = 'my-2' controlId = 'name'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder = 'Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Form.Group className = 'my-2' controlId = 'price'>
                <Form.Label>Price</Form.Label>
                <Form.Control 
                    type='number'
                    placeholder = 'Enter Price'
                    value={price}
                    onChange={(e) => checkPrice(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Form.Group className = 'my-2' controlId = 'image'>
                <Form.Label>Image</Form.Label>
                <Form.Control 
                    type='file'
                    name = "image"
                    accept="image/*"
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}
                    ></Form.Control>
            </Form.Group>


            <Button type = 'submit' style={{ "backgroundColor": 'rgb(245, 198, 42)', "border":"0"}} className = 'mt-3'>
                Upload
            </Button>
        </Form>
    </FormContainer>
  )
}

export default StoreScreen