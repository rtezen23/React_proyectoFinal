import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../store/slices/cart.slice';
import '../styles/navbar.css'
import PurchasesSidebar from './PurchasesSidebar';

const NavbarHome = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.setItem('token', '');
    navigate('/login');
    alert('Sesión cerrada')
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {

    const token = localStorage.getItem('token');
    if (token!=='') setShow(true)
    else navigate('/login')

};


  return (
    <div>
      <Navbar bg="dark" variant="dark" className='navbar-main' expand='lg' fixed='top'>
        <Container className='nav-container'>
          <Navbar.Brand href='/#/'>E-commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href='/#/login'>
                <i className="fa-solid fa-user"> <span className='icon-text'>Login</span> </i>
              </Nav.Link>
              <Nav.Link href='/#/purchases'>
                <i className="fa-solid fa-box-open"> <span className='icon-text'>Purchases</span></i>
              </Nav.Link>
              <Nav.Link roles='button' onClick={handleShow}>
                <i className="fa-solid fa-cart-shopping"> <span className='icon-text'>Show cart</span></i>
              </Nav.Link>
              <Nav.Link roles='button' onClick={logout}>
              <i className="fa-solid fa-right-from-bracket"><span className='icon-text'>Log out</span></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <PurchasesSidebar show={show} handleClose={handleClose} handleShow={handleShow}/>
    </div>
  );
};

export default NavbarHome;