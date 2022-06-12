import React from 'react';
import { ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToPurchases, deleteFromCart } from '../store/slices/cart.slice';
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
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        
                            { carts.map(cart=>(
                                <ListGroup.Item key={cart.id} onClick={() => selectNews(cart)}>
                                    <div className="sidebar-cart__header">
                                        <h2 className='sidebar-cart__title'>{cart.title}</h2>
                                        <i className="fa-solid fa-circle-minus" onClick={()=>deleteProduct(cart.id)}></i>
                                    </div>
                                    <div className="sidebar-cart__body">
                                        <p>Price: ${cart.price}</p>
                                        <p className='sidebar-cart__quantity'>{cart.productsInCart.quantity}</p>
                                    </div>
                                    <div className="sidebar-cart__footer">
                                        <p className='sidebar-cart__total-price'><span className='sidebar-cart__total'>Total: </span> ${cart.price * cart.productsInCart.quantity}</p>
                                    </div>
                                </ListGroup.Item>
                            )) }

                            <p>Total: {getTotal()}</p>

                            <button onClick={()=>dispatch(addToPurchases())} className='sidebar-cart__checkout'>Checkout</button>
                        
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default PurchasesSidebar;