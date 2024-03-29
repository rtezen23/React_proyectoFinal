import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../store/slices/cart.slice';
import { filterCategories } from '../store/slices/products.slice';
import ControlledCarousel from '../components/ControlledCarousel';
import '../styles/productDetail.css'

const ProductsDetail = () => {

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productsList = useSelector(state => state.products)

  useEffect(() => {
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/`)
      .then(res => {
        const productSearch = res.data.data.products.find(
          productItem => productItem.id === Number(id)
        );
        /* dispatch(filterCategories(res.data.data.product)) */
        setProduct(productSearch);
        dispatch(filterCategories(productSearch.category.id));
      })
  }, [dispatch, id]);

  const addPurchase = () =>{
    const purchase = {
      id: id,
      quantity: quantity
    }
    dispatch(addToCart(purchase))
  }

  const addProduct = (id, e) => {
    e.stopPropagation();
     const product = {
      id: id,
      quantity: 1
    }
    dispatch(addToCart(product))
  }

    return (
    <div>
      <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home 🏠</span>
      <span className='product-title'>{product.title}</span>
      <section className="product-container">
        <div className="product-carrousel">
          <ControlledCarousel img={product.productImgs} />
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <div className="product-price-container">
            <div className="product-price">
              <span>Price</span>
              <p className='price__number'>{product.price}</p>
            </div>
            <div className="product-quantity">
              <p>Quantity</p>
              <div className="quantity__number">
                <button onClick={()=>quantity>1 && setQuantity(quantity-1)}>-</button>
                <p className='quantity__value'>{quantity}</p>
                <button onClick={()=>setQuantity(quantity+1)}>+</button>
              </div>
            </div>
          </div>
            <button className='product-add-button' onClick={addPurchase}>Add to cart 🎁</button>
        </div>
      </section>

      <h2>Discover similar items</h2>

      <Row xs={1} md={2} lg={3} className="g-4">
        {productsList.map(productItem => (
          <Col key={productItem.id}>
            <Card onClick={() => navigate(`/products/${productItem.id}`)} style={{ cursor: 'pointer' }} className='ec-card-container'>
              <Card.Img variant="top" src={productItem.productImgs[0]} className='product-card-img' />
              <Card.Body>
                <Card.Title>{productItem.title}</Card.Title>

              </Card.Body>
              <Card.Footer className='ec-card-footer'>
                <Card.Text>
                Price: <span className='ec-card-footer__span'>$ {productItem.price}</span>
                  
                </Card.Text>
                <i className="fa-solid fa-cart-shopping add-to-cart-button" onClick={(e)=>addProduct(productItem.id,e)}></i>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      
    </div>
  );
};

export default ProductsDetail;