import React from 'react';
import { FaHeart, FaCode, FaArrowUp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title glow-text">Sriramkarthick S</h3>
            <p className="footer-description">
              Networking & Cloud Expert passionate about building secure and scalable solutions.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">More</h4>
            <ul className="footer-links">
              <li><a href="#skills">Skills</a></li>
              <li><a href="#certifications">Certifications</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <p className="footer-text">
              Let's build something amazing together!
            </p>
            <a href="#contact" className="footer-cta-btn">
              Get In Touch
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Sriramkarthick S. Made with <FaHeart className="heart-icon" /> and <FaCode className="code-icon" />
          </p>
          <p className="footer-credit">
            Designed & Developed with passion for networking excellence
          </p>
        </div>

        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
