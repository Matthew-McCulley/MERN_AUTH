import {Navbar, Nav, Container, NavDropdown, Badge} from 'react-bootstrap'
import {FaSignInAlt, FaSignOutAlt, FaShoppingCart} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/usersApiSlice'
import {logout} from '../slices/authSlice'
import {useNavigate} from 'react-router-dom'
import {resetCart} from "../slices/cartSlice";
import { useUploadCartMutation } from '../slices/cartsApiSlice'
import { useEffect } from 'react'
import { setCart } from '../slices/cartSlice';
import { useGetCartMutation } from '../slices/cartsApiSlice';


const Header = () => {
    const {userInfo} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()
    const [uploadCartApiCall] = useUploadCartMutation();
    const cart = useSelector((state) => state.cart);
    const [getCart] = useGetCartMutation();

    const callGetCart = async(userInfo) => {
        const res = await getCart({id: userInfo._id}).unwrap();
        dispatch(setCart(res));
    }

    useEffect(() => {
        if(userInfo){
            callGetCart(userInfo);
        }
    }, [userInfo])
    
    const logoutHandler = async() => {
        try{
            await uploadCartApiCall({
                id: userInfo._id,
                cartItems:cart.cartItems
            }).unwrap();
            await logoutApiCall().unwrap()
            dispatch(logout());
            dispatch(resetCart());
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }
    const getCartLength = () => {
        let count = 0;
        if (cart.cartItems.length > 0){
            cart.cartItems.forEach((obj)=> {
                count += obj.quantity;
            });
        }
        
        return count;
    }
    return(
        <header>
            <Navbar style={{ "backgroundColor": 'rgb(245, 198, 42)'}}  expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to = '/'>
                        <Navbar.Brand className='text-white'>Gee-Tees.com</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id = 'basic-navbar-nav'>

                        <Nav className="ms-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <FaShoppingCart className='text-white'/> 
                                    <span className='badge badge-warning' id='lblCartCount'>{getCartLength()}</span>
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <>
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer style={{ "color": 'rgb(245, 198, 42)'}} to="/store">
                                            <NavDropdown.Item >
                                                Store
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer style={{ "color": 'rgb(245, 198, 42)'}} to='/profile'>
                                            <NavDropdown.Item >
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item style={{ "color": 'rgb(245, 198, 42)'}} onClick={logoutHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ): (
                                <>
                                    <LinkContainer className='text-white' to='/login'>
                                        <Nav.Link>
                                            <FaSignInAlt/> Sign In 
                                        </Nav.Link>
                                     </LinkContainer>
                                
                                    <LinkContainer className='text-white' to='/register'>
                                        <Nav.Link>
                                            <FaSignOutAlt/> Sign up
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                            


                        </Nav>


                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header