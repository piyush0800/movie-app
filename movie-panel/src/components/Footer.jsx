import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
