import React, { useEffect } from 'react';
import '../css/Preloader.css';
import logo from '../Assets/logo-removebg-preview.png';

function Preloader({ onDone }) {
  useEffect(() => {
  const timeout = setTimeout(() => onDone(), 5000); // fallback after 5s
  window.addEventListener('load', handleLoad);

  function handleLoad() {
    clearTimeout(timeout);
    onDone();
  }

  return () => {
    window.removeEventListener('load', handleLoad);
    clearTimeout(timeout);
  };
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