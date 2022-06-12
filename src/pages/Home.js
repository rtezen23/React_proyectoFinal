import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/slices/cart.slice';

import { filterCategories, filterProducts, getProducts } from '../store/slices/products.slice';
import '../styles/home.css'

const Home = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const products = useSelector(state => state.products);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getProducts());

    axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/categories/`)
      .then(res => setCategories(res.data.data.categories))
  }, [dispatch])

  const searchProducts = () => {
    dispatch(filterProducts(search));
  }

  const selectCategory = (id) => {
    dispatch(filterCategories(id))
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
    <>
      <Row className="g-4">
        <Col lg={3} className="mb-4">
          <h4>Categories</h4>
          <ListGroup>
            {
              categories.map(category => (
                <ListGroup.Item key={category.id} onClick={() => selectCategory(category.id)} className='category-item'>
                  {category.name}
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>

        <Col>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search products"
              onChange={e => setSearch(e.target.value)}
              value={search}
            />
            <Button onClick={searchProducts} variant="outline-success" id="button-addon2">
              Search
            </Button>
          </InputGroup>

          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map(product => (
              <Col key={product.id}>
                <Card onClick={() => navigate(`/products/${product.id}`)} style={{ cursor: 'pointer' }} className='ec-card-container'>
                  <Card.Img variant="top" src={product.productImgs[0]} className='product-card-img'/>
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    
                  </Card.Body>
                  <Card.Footer className='ec-card-footer'>
                    <Card.Text>
                      Price: <span className='ec-card-footer-span'>$ {product.price}</span>
                    </Card.Text>
                    <i className="fa-solid fa-cart-shopping add-to-cart-button" onClick={(e)=>addProduct(product.id,e)}></i>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;