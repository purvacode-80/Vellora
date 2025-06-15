import React from 'react';
import { useNavigate } from 'react-router-dom';


import '../css/LearnMore.css';
import Navbar from '../Components/Navbar.js'
import  Footer from '../Components/footer.js';
import heroImage from '../Assets/testimonials1.jpg';
import crmIcon1 from '../Assets/customer.webp';
import crmIcon2 from '../Assets/data.png';
import crmIcon3 from '../Assets/testimonials5.jpg';
import site1 from '../Assets/ss1.png';
import site2 from '../Assets/ss2.png';
import site3 from '../Assets/ss3.png';
import site4 from '../Assets/ss4.png';
import site5 from '../Assets/ss5.png';
import site6 from '../Assets/ss6.png';
import site7 from '../Assets/ss7.png';
import site8 from '../Assets/ss8.png';
import site9 from '../Assets/ss9.png';
import site10 from '../Assets/ss10.png';
import site11 from '../Assets/ss11.png';
import site12 from '../Assets/ss12.png';
import site13 from '../Assets/ss13.png';
import site14 from '../Assets/ss14.png';
import site15 from '../Assets/ss17.png';
import site16 from '../Assets/ss16.png';


import {
  FaUsers,
  FaProjectDiagram,
  FaTasks,
  FaChartLine,
  FaEnvelope,
  FaUserShield,
  FaComments,
  FaBell
} from 'react-icons/fa';
import { FaUserPlus, FaRegComments, FaHandshake, FaChartBar } from 'react-icons/fa';



const LearnMoreHero = () => {
   const features = [
    { icon: <FaUsers />, title: 'Contact & Lead Management' },
    { icon: <FaProjectDiagram />, title: 'Sales Pipeline Tracking' },
    { icon: <FaTasks />, title: 'Task & Activity Management' },
    { icon: <FaChartLine />, title: 'Real-Time Analytics' },
    { icon: <FaEnvelope />, title: 'Email & SMS Integration' },
    { icon: <FaUserShield />, title: 'Role-Based Access Control' },
    { icon: <FaComments />, title: 'Client Communication' },
    { icon: <FaBell />, title: 'Automated Reminders' }
  ];
  const steps = [
    { icon: <FaUserPlus />, title: 'Add Your Leads', desc: 'Import or manually add leads into the system.' },
    { icon: <FaRegComments />, title: 'Track Engagement', desc: 'See all interactions, updates, and notes.' },
    { icon: <FaHandshake />, title: 'Convert to Clients', desc: 'Move deals through your pipeline.' },
    { icon: <FaChartBar />, title: 'Monitor Performance', desc: 'Use dashboards to get performance insights.' }
  ];
  const images = [
  site1, site2, site3, site4,
  site5, site6, site7, site8,
  site9, site10, site11, site12,site13,site14,site15,site16,
];


    
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    
  <>
  <Navbar/>
      <section className="learnmore-hero-section">
        <div className="learnmore-hero-container">
          <div className="learnmore-hero-text">
            <h1 className="learnmore-hero-title">
              Transform the Way You Manage Customer Relationships
            </h1>
            <p className="learnmore-hero-subtitle">
              Our CRM platform empowers your team to build stronger relationships, close more deals, and grow your business.
            </p>
            <div className="learnmore-hero-buttons">
              <button className="learnmore-btn-primary" onClick={handleLoginRedirect}>
                Start Free Trial
              </button>
              <button className="learnmore-btn-secondary">Request Demo</button>
            </div>
          </div>
          <div className="learnmore-hero-image">
            <img src={heroImage} alt="CRM Dashboard" />
          </div>
        </div>
      </section>

      <section className="learnmore-crm-section">
        <div className="learnmore-crm-container">
          <h2 className="learnmore-crm-title">What is a CRM and Why Do You Need One?</h2>
          <p className="learnmore-crm-description">
            A Customer Relationship Management (CRM) system helps businesses organize and manage customer data, streamline sales processes, and improve communication. It enables teams to build lasting relationships, enhance productivity, and ultimately drive business growth.
          </p>
          <div className="learnmore-crm-icons">
            <div className="crm-icon-box">
              <img src={crmIcon1} alt="Relationship Management" />
              <p>Stronger Customer Relationships</p>
            </div>
            <div className="crm-icon-box">
              <img src={crmIcon2} alt="Data Analytics" />
              <p>Smart Analytics & Insights</p>
            </div>
            <div className="crm-icon-box">
              <img src={crmIcon3} alt="Sales Growth" />
              <p>Faster Sales Growth</p>
            </div>
          </div>
        </div>
      </section>
      <section className="learnmore-featuregrid-section">
      <div className="learnmore-featuregrid-container">
        <h2 className="learnmore-featuregrid-title">Powerful Features Built for Growing Businesses</h2>
        <div className="learnmore-featuregrid-grid">
          {features.map((feature, index) => (
            <div className="learnmore-featuregrid-item" key={index}>
              <div className="learnmore-featuregrid-icon">{feature.icon}</div>
              <p className="learnmore-featuregrid-text">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="learnmore-howitworks-section">
      <div className="learnmore-howitworks-container">
        <h2 className="learnmore-howitworks-title">How Our CRM Works</h2>
        <div className="learnmore-howitworks-steps">
          {steps.map((step, index) => (
            <div className="howitworks-step-box" key={index}>
              <div className="howitworks-icon">{step.icon}</div>
              <h4 className="howitworks-step-title">{step.title}</h4>
              <p className="howitworks-step-desc">{step.desc}</p>
              {index < steps.length - 1 && <div className="howitworks-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
     <section className="showcase-section">
      <h2 className="showcase-title">Our Website Gallery</h2>
      <div className="showcase-grid">
        {images.map((img, index) => (
          <div key={index} className="showcase-card">
            <img src={img} alt={`Website Screenshot ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
    
       <Footer/>
    </>
  );
};

export default LearnMoreHero;
