// Home.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserFriends, FaComments, FaChartLine } from 'react-icons/fa';
import '../css/Homecss.css';

const offerings = [
  {
    icon: <FaUserFriends size={35} />,
    title: 'User-friendly platform to learn more',
    description: 'Packed with modern tech, classroom learning which used to be done conventionally.',
  },
  {
    icon: <FaComments size={35} />,
    title: 'Seamless Communication Tools',
    description: 'Stay connected with your team and clients with powerful and easy-to-use tools.',
  },
  {
    icon: <FaChartLine size={35} />,
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
    image: 'https://i.ytimg.com/vi/6PvqAt590-0/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AHUCoACgAaKAgwIABABGDAgKSh_MA8=&rs=AOn4CLCvL7EamCfFJKHi3ikxNoBjT3cIQQ',
    imageLeft: false,
    imageBelow: true,
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
                  <Button className="button-purple">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <br />
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
          <Row key={index} className="align-items-center mb-5">
            {feature.imageLeft && (
              <Col md={6}>
                <img src={feature.image} alt={feature.title} className={`feature-img ${feature.imageBelow ? 'feature-img-large' : ''}`} />
              </Col>
            )}
            <Col md={6}>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </Col>
            {!feature.imageLeft && (
              <Col md={6}>
                <img src={feature.image} alt={feature.title} className={`feature-img ${feature.imageBelow ? 'feature-img-large' : ''}`} />
              </Col>
            )}
          </Row>
        ))}
      </Container>

      <div className="text-center mt-5">
        <Button className="button-purple" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </div>
    </div>
  );
};

export default Home;