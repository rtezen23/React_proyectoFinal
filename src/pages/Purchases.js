import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchases } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const purchases = useSelector(state=>state.purchases.data?.purchases);

    useEffect(()=>{
        dispatch(getPurchases());
    },[dispatch])

    return (
        <div>
            <h1>Purchases</h1>

            <ul>
                {
                    purchases?.map(purchase=>(
                        <li key={purchase.cart.id} >
                            <hr/>
                            {purchase.cart.products.map(product=>(
                                <div key={product.id} onClick={()=>navigate(`/products/${product.id}`)}>
                                    <p>Title: {product.title}</p>
                                    <p>Price: {product.price}</p>
                                    <p>Quantity: {product.productsInCart.quantity}</p>
                                </div>
                            ))}
                            <hr/>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;