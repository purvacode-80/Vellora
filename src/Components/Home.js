// Home.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUserFriends, FaComments, FaChartLine  } from 'react-icons/fa';
import '../css/Homecss.css';
import dashboardImage from '../Assets/dashboard.png';

const offerings = [
  {
    icon: <FaUserFriends size={35} style={{color:"#9d4edd"}} />,
    title: 'User-Friendly Platform to Manage and Grow',
    description: 'Packed with modern features and intuitive design to streamline your business workflow effortlessly.',
  },
  {
    icon: <FaComments size={35} style={{color:"#9d4edd"}}/>,
    title: 'Smart Lead & Contact Management',
    description: 'Effortlessly track leads, manage contacts, and build strong client relationships with intuitive, powerful tools.',
  },
  {
    icon: <FaChartLine size={35} style={{color:"#9d4edd"}}/>,
    title: 'Data-Driven Insights',
    description: 'Make better decisions with built-in analytics and insights for your growth.',
  },
];

const featureData = [
  {
    title: 'Live chat functionality includes two different room categories',
    description: 'The live chat functionality on our platform is thoughtfully designed to provide users with versatile communication options.',
    image: 'https://i.pinimg.com/736x/63/be/9c/63be9c11f61e40100fd1c5cae3788b70.jpg',
    imageLeft: false,
  },
  {
    title: 'Easily understand how your leads are distributed across different stages',
    description: 'The live chat functionality on our platform is thoughtfully designed to provide users with versatile communication options.',
    image: 'https://www.cloudways.com/blog/wp-content/uploads/B2B-Lead-Generation.jpg',
    imageLeft: true,
  },
  {
    title: 'Dashboard Overview',
    description: 'Our dashboard offers seamless integration of features tailored to your business needs.',
    image: dashboardImage,
    imageLeft: false,
    
  },
];

const Home = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div className="home-container">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-desc">
            From foundational courses that lay the groundwork for your educational journey to advanced specializations.
          </p>
          {/* <Button variant="outline-secondary" onClick={toggleTheme}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </Button> */}
        </div>
        <Row>
          {offerings.map((item, index) => (
            <Col key={index} md={6} lg={4} className="d-flex justify-content-center">
              <Card className={`card-custom mb-4`}>
                <div className="mb-3" style={{ color: "white" }}>{item.icon}</div>
                <Card.Body>
                  <Card.Title className="card-title-custom">{item.title}</Card.Title>
                  <Card.Text className="card-text-custom">{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <br /><br/>
      <Container>
        <div className="text-center mt-5 mb-4">
          <h2 className="section-title">
            We Have Various Features <br />That Can Help You
          </h2>
          <p className="section-desc">
            From foundational courses that lay the groundwork for your educational journey to advanced specializations.
          </p>
        </div>

       {featureData.map((feature, index) => (
  <div key={index} className="feature-box-wrapper">
    <Row className="align-items-center mb-2">
      {feature.imageLeft && (
        <Col md={6}>
          <img
            src={feature.image}
            alt={feature.title}
            className={`feature-img ${feature.imageBelow ? 'feature-img-large' : ''}`}
          />
        </Col>
      )}<br/>
      <Col md={6}>
  <div className="feature-content">
    <h3>{feature.title}</h3>
    <p>{feature.description}</p>
     
  </div>
</Col><br/>
      {!feature.imageLeft && (
        <Col md={6}>
          <img
            src={feature.image}
            alt={feature.title}
            className={`feature-img ${feature.imageBelow ? 'feature-img-large' : ''}`}
          />
        </Col>
      )}<br/>
    </Row>
  </div>
))}
      </Container>

      
      </div>
    
  );
};

export default Home;