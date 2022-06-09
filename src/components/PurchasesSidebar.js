import React from 'react';
import { ListGroup, Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PurchasesSidebar = ({show, handleClose}) => {

    const carts = useSelector(state=>state.cart);

    const navigate = useNavigate();

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