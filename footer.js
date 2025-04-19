import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Column 1: Logo + Description */}
        <div className="footer-col">
          <h2 className="footer-logo">Vellora CRM</h2>
          <p className="footer-description">
            Manage your clients, streamline workflows, and grow your business with Vellora CRM.
          </p>
        </div>

        {/* Column 2: Contact Info */}
        <div className="footer-col">
          <h3 className="footer-title">Contact Us</h3>
          <p><strong>Address:</strong> 123 Business Park, Tech City, IN 560001</p>
          <p><strong>Email:</strong> support@vellora.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
        </div>

        {/* Column 3: Social Icons */}
        <div className="footer-col">
          <h3 className="footer-title">Follow Us</h3>
          <div className="footer-socials">
            <a href="https://www.linkedin.com" className="social linkedin" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://www.instagram.com" className="social instagram" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com" className="social facebook" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" className="social twitter" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Vellora CRM. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
