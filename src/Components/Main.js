import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
// import crmHero from '../assets/crm-hero.png'; // You can use any SVG or image here

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <div className={`home-wrapper ${isDark ? 'dark' : 'light'}`}>
      <div className="home-hero">
        <div className="hero-text">
          <h1>Revolutionize Your <span>Customer Relationships</span></h1>
          <p>Supercharge your sales, support, and productivity with a modern, all-in-one CRM solution built for growing businesses.</p>
        </div>
        <div className="hero-image">
          {/* <img src={crmHero} alt="CRM Dashboard" /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
