import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterCategories } from '../store/slices/products.slice';

const ProductsDetail = () => {

    const [product, setProduct] = useState({});

    const { id } = useParams();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const productsList = useSelector(state => state.products)

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/`)
            .then(res => {
                const productSearch = res.data.data.products.find(
                    productItem => productItem.id === Number(id)
                );
                /* dispatch(filterCategories(res.data.data.product)) */
                setProduct(productSearch);
                dispatch(filterCategories(productSearch.category.id));
            })
    }, []);

    console.log(product);


    return (
        <div>
            <span onClick={() => navigate('/')}>Home</span>
            <p>{product.title}</p>

            <img src={product.productImgs?.[1]} alt="image" className='img-fluid' />
            <h1>{product.title}</h1>
            <p>{product.description}</p>

            <span>Price</span>
            <p>{product.price}</p>

            <p>Quantity</p>
            <button>-</button>
            <p>1</p>
            <button>+</button>
            <br />
            <br />
            <button>Add to cart</button>

            <h2>Discover similar items</h2>

            <Row xs={1} md={2} lg={3} className="g-4">
                {productsList.map(productItem => (
                    <Col>
                        <Card onClick={() => navigate(`/products/${productItem.id}`)} style={{ cursor: 'pointer' }}>
                            <Card.Img variant="top" src={productItem.productImgs[0]} className='product-card-img' />
                            <Card.Body>
                                <Card.Title>{productItem.title}</Card.Title>

                            </Card.Body>
                            <Card.Footer>
                                <p>Price</p>
                                <Card.Text>
                                    {productItem.price}
                                </Card.Text>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductsDetail;