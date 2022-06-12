import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => action.payload
    }
})

export const { setCart } = cartSlice.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .catch(error=>{
            console.log(error.response);
            console.log(error.response.data.message)
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToCart = product => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', product, getConfig())
        .then(() => {
            dispatch(getCart());
            alert('Product added')
        })
        .catch(error=>{
            console.log(error.response);
            alert(error.response.data.message)
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteFromCart = id => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(() => {
            dispatch(getCart());
            alert('Product removed')
        })
        .catch(error=>{
            console.log(error.response);
            alert(error.response.data.message)
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToPurchases = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
        .then(() => {
            dispatch(setCart([]));
            dispatch(getCart());
            alert('Products added to purchases');
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export default cartSlice.reducer;
