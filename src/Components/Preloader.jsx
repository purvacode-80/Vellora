// src/Components/Preloader.jsx
import React, { useEffect } from 'react';
import '../css/Preloader.css';
import logo from '../Assets/logo-removebg-preview.png';

function Preloader({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone(); // callback to hide the preloader
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="preloader-container">
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <img src={logo} alt="Logo" className="logo" />
      </div>
    </div>
  );
}

export default Preloader;