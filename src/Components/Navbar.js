import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';  // Import Link here
import logo from '../Assets/logo-removebg-preview.png';
import '../App.css';
import '../css/Navbar.css';

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="sticky-top navbar">
      <Container className="d-flex align-items-center">
        <Image
          src={logo}
          alt="Website Logo"
          height="60"
          width="60"
          className="me-2"
          rounded
        />

        <Link 
          to="/" 
          className="gradient-text link"
        >
          Vellora
        </Link>

        {/* Add About Us Link */}
        <Link 
          to="/about" 
          className='link about-us'
        >
          About Us
        </Link>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
