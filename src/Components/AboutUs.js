import React from 'react';
import '../css/Aboutus.css';
import whoimg from "../Assets/visimg.avif";
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
    <div className="aboutus-container">
      <section className="aboutus-landing">
        <h1>Build Smarter Relationships. Grow Faster. Succeed Together.</h1>
        <p>Welcome to Vellora — powering connections through smart relationship management.</p>
      </section>

      <section className="aboutus-section">
        <h2>👥 Who We Are</h2>
        <div className="aboutus-who-we-are-cards">
          <div className="aboutus-card aboutus-text-card">
            <p>
              Vellora is an innovative platform dedicated to transforming the way businesses connect, 
              operate, and grow. With a focus on modern technology and user-centric design, Vellora offers 
              seamless solutions tailored for efficiency, scalability, and success. Whether you're a startup or an established enterprise,
               Vellora empowers you with tools and insights to thrive in a competitive digital landscape.
            </p>
          </div>
          <div className="aboutus-card aboutus-image-card">
            <img src={whoimg} alt="Who We Are" />
          </div>
        </div>
      </section>

      <section className="aboutus-vision-mission">
        <h2>🚀 Our Vision & Mission</h2>
        <div className="aboutus-vision-mission-content">
          <p><strong>Empowering businesses to build meaningful customer relationships through intelligent CRM solutions.</strong></p>
          <p><strong>To deliver an all-in-one CRM platform that simplifies sales, enhances engagement, and accelerates growth.</strong></p>
        </div>
      </section>

      <section className="aboutus-team-section">
        <h2 className="aboutus-team-title">Meet Our Team</h2>
        <div className="aboutus-team-container">
          {teamMembers.map((member, index) => (
            <div className="aboutus-team-card" key={index}>
              <img src={member.photo} alt={member.name} className="aboutus-profile-pic" />
              <h3>{member.name}</h3>
              <div className="aboutus-social-icons">
                <a href={member.socials.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>
                <a href={member.socials.instagram} target="_blank" rel="noreferrer"><FaInstagram /></a>
                <a href={member.socials.github} target="_blank" rel="noreferrer"><FaGithub /></a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;