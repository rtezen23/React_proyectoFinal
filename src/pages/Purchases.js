import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchases } from '../store/slices/purchases.slice';
import '../styles/purchases.css';

const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const purchases = useSelector(state => state.purchases.data?.purchases);

    useEffect(() => {
        dispatch(getPurchases());
    }, [dispatch])

    return (
        <div>
            <h1>Purchases</h1>

            <ul>
                {
                    purchases?.map(purchase => (
                        <li key={purchase.cart.id} className="purchase-data-main">
                                <h3 className='purchase-data-date'>{(new Date(purchase.createdAt).toDateString())}</h3>
                            <div className='purchase-data-container'>
                                {purchase.cart.products.map(product => (
                                    <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} className='purchase-data-item'>
                                        <p className='purchase-data-title'>{product.title}</p>
                                        <p className='purchase-data-quantity'>{product.productsInCart.quantity}</p>
                                        <p className='purchase-data-price'>$ {product.price}</p>
                                    </div>
                                ))}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;