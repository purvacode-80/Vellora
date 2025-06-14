import React from 'react';
import '../css/Aboutus.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar.js'
import Footer from '../Components/footer.js'
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import purwaImg from "../Assets/purwa.jpeg";
import snehaImg from "../Assets/sneha.jpeg";
import dhanashreeImg from "../Assets/dhanashree.jpeg";
import yoginiImg from "../Assets/yogini2.jpeg";



const AboutUs = () => {
  const teamMembers = [
  {
    name: "Purwa Waykule",
    photo: purwaImg,
    socials: {
      linkedin: "https://www.linkedin.com/in/purva-waykole-40485727a",
      instagram: "https://www.instagram.com/purvaw_21?igsh=MXdnbjBqaHhleTB0dw==",
      github: "https://github.com/purvacode-80",
    },
  },
  {
    name: "Sneha More",
    photo: snehaImg,
    socials: {
      linkedin: "https://www.linkedin.com/in/sneha-more-2b0a0630b",
      instagram: "https://www.instagram.com/snehamore316?igsh=MXVwbjhzd2h5d2Uwag==",
      github: "https://github.com/snehamore555",
    },
  },
  {
    name: "Dhanashree More",
    photo: dhanashreeImg,
    socials: {
      linkedin: "https://www.linkedin.com/in/dhanashree-more-5110b62aa",
      instagram: "https://www.instagram.com/dhana_more29?igsh=N3RndG1nMmFzOHdk",
      github: "https://github.com/catherinelee",
    },
  },
  {
    name: "Yogini Patil",
    photo: yoginiImg,
    socials: {
      linkedin: "https://www.linkedin.com/in/yogini-patil-68ab78327",
      instagram: "https://www.instagram.com/yogini_patil_12?igsh=anNsaG8xYXd4bWlw",
      github: "https://github.com/yoginipatil1234",
    },
  },
];
  const navigate = useNavigate(); // Initialize the navigate function
  const handlelearnmore = () =>{
    navigate('/learnmore')
  }


  return (
    <>
    <Navbar/>
    <section>
    <div className="about-us-page-container">
      <div className="about-us-hero">
        <h1 className="about-us-headline">Your Growth Partner in Customer Success</h1>
        <p className="about-us-subheadline">
          We build intelligent, user-friendly CRM solutions that help businesses thrive through
          seamless customer engagement, streamlined processes, and smart automation.
        </p>
        <div className="about-us-cta-buttons">
          <button className="about-us-cta-button" onClick={handlelearnmore}>Learn More</button>
          <button className="about-us-cta-button">Contact Us</button>
        </div>
      </div>
    </div>
    </section>
    {/* Combined Section: Our Mission & Journey */}
<section className="about-us-combined-section">
  <div className="about-us-content-wrapper">
    <h2 className="about-us-title-highlight">Empowering Customer Connections</h2>
    <p className="about-us-tagline">
      From a spark of vision to transforming businesses—our mission is rooted in simplifying CRM for all.
    </p>

    {/* Cards Row */}
    <div className="about-us-card-grid">
      <div className="about-us-card">
        <h3 className="about-us-card-title">⚡ Scalable CRM</h3>
        <p className="about-us-card-text">
          Built to grow with you—whether you're a startup or an enterprise.
        </p>
      </div>

      <div className="about-us-card">
        <h3 className="about-us-card-title">🤖 Smart Automation</h3>
        <p className="about-us-card-text">
          Save time and reduce errors with intelligent task automation.
        </p>
      </div>

      <div className="about-us-card">
        <h3 className="about-us-card-title">📊 Actionable Insights</h3>
        <p className="about-us-card-text">
          Make better decisions with real-time analytics and reporting.
        </p>
      </div>
    </div>

    {/* Timeline Cards */}
    <div className="about-us-timeline-grid">
      <div className="about-us-timeline-card">
        <p className="about-us-timeline-year">📌 </p>
        <p className="about-us-timeline-event">Vision Sparked</p>
      </div>
      <div className="about-us-timeline-card">
        <p className="about-us-timeline-year">🚀 </p>
        <p className="about-us-timeline-event">Product Launched</p>
      </div>
      <div className="about-us-timeline-card">
        <p className="about-us-timeline-year">🌍 </p>
        <p className="about-us-timeline-event">Expanding Globally</p>
      </div>
    </div>
  </div>
</section>
<section className="about-us-team-section">
  <h2 className="about-us-team-title">Meet Our Team</h2>
  <div className="about-us-team-container">
    {teamMembers.map((member, index) => (
      <div className="about-us-team-card" key={index}>
        <img src={member.photo} alt={member.name} className="about-us-profile-pic" />
        <h3>{member.name}</h3>
        {/* Optional: <p>{member.role}</p> */}
        <div className="about-us-social-icons">
          <a href={member.socials.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
          <a href={member.socials.instagram} target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href={member.socials.github} target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </div>
      </div>
    ))}
  </div>
</section>
<Footer/>

    </>
  );
};

export default AboutUs;