import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../Assets/logo-removebg-preview.png';
import '../App.css'; // <-- Ensure your CSS file with gradient-text class is imported

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
          style={{ marginLeft: "-150px" }}
        />
        <span className="gradient-text" style={{ marginRight: "1300px" }}>
          Vellora
        </span>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
