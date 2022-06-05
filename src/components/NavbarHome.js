import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'

const NavbarHome = () => {
  return (
    <Navbar bg="dark" variant="dark" className='navbar-main'>
      <Container className='nav-container'>
        <Link to='/' className='navbar-brand'>
          <Navbar.Brand >E-commerce</Navbar.Brand>
        </Link>
        <Nav className="me-auto">
          <Nav.Link>
            <Link to='/login'>
              <i class="fa-solid fa-user"></i>
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to='/purchases'>
              <i class="fa-solid fa-box-open"></i>
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to='/'>
              <i class="fa-solid fa-cart-shopping"></i>
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarHome;