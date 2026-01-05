import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../css/Mainpage.css';
import { isTokenValid } from '../Security/auth'

const Main = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleGetStarted = () => { 
    if(!isTokenValid || !token) {
      navigate('/login');
    } else {
      navigate('/dashboard/analytics');
    }
  };
  const handlelearnmore = () =>{
    navigate('/learnmore')
  }

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
          <Button variant="dark" className="me-2" onClick={handlelearnmore}>Learn More</Button>
          <Button variant='get' onClick={handleGetStarted}>Get Started</Button> {/* Add the onClick event */}
        </div>

       <div className="company-section">
  <p className="company-text">Why Teams Love Our CRM</p>
  <div className="marquee-wrapper">
    <div className="marquee">
       <span>⚡ Fast & Easy</span>
      <span>📋 Task Manager</span>
      <span>📞 Contact Hub</span>
      <span>🔔 Instant Alerts</span>
      <span>📊 Smart Reports</span>
      <span>🤖 AI Chatbot</span>
      <span>✉️ Email Writer</span>
      <span>🧰 All-in-One Tools</span>
      <span>📁 Export to Excel</span>
    </div>
  </div>
</div>

      </Container>
    </div>
  );
};

export default Main;
