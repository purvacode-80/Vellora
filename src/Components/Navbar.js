import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';  // Import Link here
import logo from '../Assets/logo-removebg-preview.png';
import '../App.css';

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="sticky-top" style={{ backgroundColor: "#3b3b3b", height: "60px", zIndex: 1030 }}>
      <Container className="d-flex align-items-center">
        <Image
          src={logo}
          alt="Website Logo"
          height="60"
          width="60"
          className="me-2"
          rounded
          style={{ marginLeft: "-80px" }}
        />
        <span className="gradient-text" style={{ marginRight: "auto" }}>
          Vellora
        </span>

        {/* Add About Us Link */}
        <Link 
          to="/about" 
          style={{ color: 'white', textDecoration: 'none',marginRight:"-60px", fontWeight: 'bold',fontSize:"20px" }}
        >
          About Us
        </Link>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
