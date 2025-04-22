/**
 * CRM Webpage Section with Theme Support (Hidden Toggle Button for Future)
 */
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserFriends, FaComments, FaChartLine } from 'react-icons/fa';

// Dynamic Data for CRM Website Section
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

  const themes = {
    light: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      cardBg: '#f8f9fa',
      cardShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      highlight: '#6a1b9a',
      border: '1px solid #6a1b9a',
    },
    dark: {
      backgroundColor: '#1e1e2f',
      textColor: '#ffffff',
      cardBg: '#2c2c3c',
      cardShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      highlight: '#6a1b9a',
      border: '1px solid #6a1b9a',
    },
  };

  const current = themes[theme];

  return (
    <div style={{ backgroundColor: current.backgroundColor, minHeight: '100vh', padding: '60px 20px', color: current.textColor }}>
      <Container >
        {/* First Container - What We Offer */}
        <div className="text-center mb-5">
          <h2
            style={{
                fontFamily:"cursive",
              fontWeight: '800',
              fontSize: '2.5rem',
              color: current.textColor,
              letterSpacing: '1px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            What We Offer
          </h2>
          <p style={{ maxWidth: '650px', margin: '10px auto', fontSize: '16px' }}>
            From foundational courses that lay the groundwork for your educational journey to advanced specializations.
          </p>
        </div>
        <Row>
          {offerings.map((item, index) => (
            <Col key={index} md={6} lg={4} className="d-flex justify-content-center">
              <Card
                style={{
                  backgroundColor: current.cardBg,
                  color: current.textColor,
                  borderRadius: '20px',
                  padding: '30px 20px',
                  textAlign: 'center',
                  boxShadow: current.cardShadow,
                  transition: '0.3s ease',
                  width: '100%',
                  border: current.border,
                }}
                className="mb-4"
              >
                <div className="mb-3" style={{ color: current.highlight }}>{item.icon}</div>
                <Card.Body>
                  <Card.Title style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.title}</Card.Title>
                  <Card.Text style={{ fontSize: '15px' }}>{item.description}</Card.Text>
                  <Button style={{ backgroundColor: current.highlight, border: 'none' }}>Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <br /><br />

        {/* Second Container - Features Section */}
        <div className="text-center mt-5 mb-4">
          <h2
            style={{
             fontFamily:"cursive", 
             fontWeight: '800',
              fontSize: '2.5rem',
              color: current.textColor,
              letterSpacing: '1px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            We Have Various Features <br/>That Can Help You
          </h2>
          <p style={{ maxWidth: '650px', margin: '10px auto', fontSize: '16px' }}>
            From foundational courses that lay the groundwork for your educational journey to advanced specializations.
          </p>
        </div><br />
        {featureData.map((feature, index) => (
          <Row key={index} className="justify-content-center mb-5">
            <Col md={12}>
              <Card
                style={{
                  backgroundColor: current.cardBg,
                  color: current.textColor,
                  borderRadius: '20px',
                  padding: '20px 30px',
                  boxShadow: current.cardShadow,
                  border: current.border,
                }}
              >
                <Card.Body>
                  <Row className="align-items-center">
                    {feature.imageBelow ? (
                      <Col md={12}>
                        <h3 style={{ color: current.textColor, fontSize: '2rem', fontWeight: '700' }}>{feature.title}</h3>
                        <p style={{ fontSize: '16px' }}>{feature.description}</p>
                        <img
                          src={feature.image}
                          alt="Feature"
                          style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }}
                        />
                      </Col>
                    ) : (
                      <>
                        {feature.imageLeft && (
                          <Col md={6} className="mb-4">
                            <img
                              src={feature.image}
                              alt="Feature"
                              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px' }}
                            />
                          </Col>
                        )}
                        <Col md={6} className="mb-4">
                          <h3 style={{ color: current.textColor, fontSize: '2rem', fontWeight: '700' }}>{feature.title}</h3>
                          <p style={{ fontSize: '16px' }}>{feature.description}</p>
                          <Button style={{ backgroundColor: current.highlight, border: 'none' }}>Explore</Button>
                        </Col>
                        {!feature.imageLeft && (
                          <Col md={6} className="mb-4">
                            <img
                              src={feature.image}
                              alt="Feature"
                              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px' }}
                            />
                          </Col>
                        )}
                      </>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Home;
