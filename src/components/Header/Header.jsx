import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Glitch Text Component
  const GlitchText = ({ text }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isGlitching, setIsGlitching] = useState(false);

    const handleMouseEnter = () => {
      setIsGlitching(true);
      let iteration = 0;
      const letters = "01";
      
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return letters[Math.floor(Math.random() * 2)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
          setIsGlitching(false);
        }
        
        iteration += 1 / 3;
      }, 30);
    };

    const handleMouseLeave = () => {
      setDisplayText(text);
      setIsGlitching(false);
    };

    return (
      <span 
        className={`glitch-wrapper ${isGlitching ? 'glitching' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="glitch-text" data-text={text}>
          {displayText}
        </span>
      </span>
    );
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
            <span className="logo-bracket">{'<'}</span>
            <span className="logo-text glow-text">SK</span>
            <span className="logo-bracket">{'/>'}</span>
            <div className="logo-pulse"></div>
          </a>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a
                  href={item.href}
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <span className="nav-number">0{index + 1}.</span>
                  <GlitchText text={item.name} />
                  <span className="nav-link-particles">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className="particle"></span>
                    ))}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="menu-icon">
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </span>
            <span className="menu-bg"></span>
          </button>
        </nav>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;