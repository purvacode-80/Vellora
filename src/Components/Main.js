import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../css/Mainpage.css';

const Main = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle "Get Started" button click
  const handleGetStarted = () => {
    navigate('/dashboard'); // Navigate to the /dashboard route
  };

  return (
    <div className="hero-section">
      <Container className="text-center">
        <h1 className="hero-title">
          Revolutionize Your<br />Customer Relationships
        </h1>
        <p className="hero-subtext">
          We’ve enhanced our CRM to perfectly align with your workflow, offering user-friendly tools that ensure clarity, control, and increased productivity.
        </p>
        <div className="hero-buttons">
          <Button variant="dark" className="me-2">Learn More</Button>
          <Button variant="primary" onClick={handleGetStarted}>Get Started</Button> {/* Add the onClick event */}
        </div>

        <div className="company-section">
          <p className="company-text">Used and loved by people at brilliant companies</p>
          <div className="marquee-wrapper">
            <div className="marquee">
              <span>BARCLAYS</span>
              <span>HOPIN</span>
              <span>AFTERPAY</span>
              <span>NOVARTIS</span>
              <span>BNP PARIBAS</span>
              <span>PAYPAL</span>
              <span>AMAZON</span>
              <span>INFOSYS</span>
              <span>BARCLAYS</span>
              <span>HOPIN</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Main;
