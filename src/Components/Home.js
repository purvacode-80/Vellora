import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserFriends, FaComments, FaChartLine  } from 'react-icons/fa';
import '../css/Homecss.css';
import img2 from '../Assets/ss2.png';
import img9 from '../Assets/ss9.png';
import img11 from '../Assets/ss11.png';
import img12 from '../Assets/ss12.png';
import img14 from '../Assets/ss14.png';
import img16 from '../Assets/ss16.png';
import img18 from '../Assets/ss18.png';

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
    title: 'Easy Contact & Lead Management System',
    description: 'Seamlessly view, update, delete, convert, and organize your valuable connections to optimize your workflow and enhance your success.',
    image: img9,
    imageLeft: false,
  },
  {
    title: 'Dynamic Analytics Dashboard',
    description: 'Visualize real-time insights about leads, contacts, emails, and user activity across weekly, monthly, or yearly intervals.',
    image: img2,
    imageLeft: true,
  },
  {
    title: 'Conversational CRM Bot',
    description: 'Ask anything — the AI chatbot reads your CRM data to answer, guide, and act like a smart virtual assistant.',
    image: img16,
    imageLeft: false,
  },
  {
    title: 'Bulk Email Campaigns',
    description: 'Select multiple leads or contacts and send personalized emails in one go — with tracking and AI content generation.',
    image: img18,
    imageLeft: true,
  },
  {
    title: 'Calendar Integration',
    description: 'Easily add tasks, reminders about meetings, follow-ups, and task deadlines to a unified calendar and add notifications to keep you reminded of things.',
    image: img11,
    imageLeft: false,
  },
  {
    title: 'Interactive Kanban Task Board',
    description: 'Organize and visualize your tasks across intuitive categories like Not Started, In Progress, Deferred, and Completed. With drag-and-drop functionality, effortlessly update task status in real time',
    image: img12,
    imageLeft: true,
  },
  {
    title: 'Integrated Meeting Scheduler',
    description: 'Plan and manage meetings directly within your CRM. Schedule one-on-one or team meetings with contacts or leads, assign agendas.',
    image: img14,
    imageLeft: false,
  },
];

const Home = () => {

  return (
    <div className="home-container">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-desc">
            From foundational courses that lay the groundwork for your educational journey to advanced specializations.
          </p>
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