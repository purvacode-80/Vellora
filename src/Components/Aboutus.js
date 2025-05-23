import React from 'react';
import '../css/Aboutus.css';
import whoimg from "../Assets/visimg.avif"
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


  return (
    <div className="about-container">
      <section className="landing">

        <h1>Build Smarter Relationships. Grow Faster. Succeed Together.</h1>
        <p>Welcome to Vellora — powering connections through smart relationship management.</p>
      </section>

      
<section className="section">
  <h2>👥 Who We Are</h2>
  <div className="who-we-are-cards">
    <div className="card text-card">
      <p>
        <strong>Vellora </strong>CRM is a modern, intelligent, and user-centric Customer Relationship Management platform designed to help businesses of all sizes manage, understand, and grow their customer base with ease.

        In an age where customer experience defines brand loyalty, Vellora CRM empowers teams with the tools they need to nurture relationships, streamline processes, and drive data-informed decisions. Whether you're a startup or a growing enterprise, Vellora adapts to your needs—combining powerful features with simplicity and elegance.
      </p>
    </div>
    <div className="card image-card">
      <img src={whoimg}  />
    </div>
  </div>
</section>


      <section className="vision-mission">
  <h2>🚀 Our Vision & Mission</h2>
  <div className="vision-mission-content">
    <p><strong>Empowering businesses to build meaningful customer relationships through intelligent, intuitive, and integrated CRM solutions.</strong><br></br> We envision a digital ecosystem where every business — from startups to enterprises — can harness the power of real-time data, automation, and personalization to create exceptional customer experiences. Our vision is to be the most trusted partner in customer relationship success by continuously innovating and evolving with the needs of modern businesses.</p>
    <p><strong>To deliver an all-in-one CRM platform that simplifies sales, enhances customer engagement, and accelerates business growth.</strong> <br />To empower businesses by simplifying customer management, automating daily tasks, delivering powerful analytics, and enhancing customer satisfaction at every touchpoint.</p>
  </div>
</section>


      <section className="team-section">
      <h2 className="team-title">Meet Our Team</h2>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.photo} alt={member.name} className="profile-pic" />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
<div className="social-icons">
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
    </div>
  );
};

export default AboutUs;
