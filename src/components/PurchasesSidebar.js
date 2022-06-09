import React from 'react';
import { ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFromCart } from '../store/slices/cart.slice';
import '../styles/purchasesSidebar.css';

const PurchasesSidebar = ({show, handleClose}) => {

    const carts = useSelector(state=>state.cart);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectNews = cart => {
        handleClose();
        navigate(`/products/${cart.id}`);
    }

    let total = 0;

    const getTotal = () =>{
        carts.forEach(cart => {
            total += Number(cart.price * cart.productsInCart.quantity);
        });
        return total;
    }

    const deleteProduct = id => {
        dispatch(deleteFromCart(id))
    }

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton variant='dark'>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        
                            { carts.map(cart=>(
                                <ListGroup.Item onClick={() => selectNews(cart)}>
                                    <h2>{cart.title}</h2>
                                    <p>Price: ${cart.price}</p>
                                    <p>Quantity: {cart.productsInCart.quantity}</p>
                                    <p>Total: ${cart.price * cart.productsInCart.quantity}</p>
                                    <i className="fa-solid fa-circle-minus" onClick={()=>deleteProduct(cart.id)}></i>
                                </ListGroup.Item>
                            )) }

                            <p>Total: {getTotal()}</p>
                        
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default PurchasesSidebar;