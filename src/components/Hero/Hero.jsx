import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
  FaRocket,
} from "react-icons/fa";
import "./Hero.css";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Network & Firmware Engineer";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skills = [
    "TCP/IP Protocol Suite",
    "Routing Protocols",
    "Network Security",
    "Wireless Protocols",
  ];
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="network-grid"></div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="floating-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
            ></div>
          ))}
        </div>
        <div className="connection-lines">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="connection-line"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="rgba(0, 255, 65, 0.2)"
                strokeWidth="1"
              />
            </svg>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Available for opportunities
            </div>

            <p className="hero-greeting">
              <span className="terminal-prompt">$</span>
              <span className="greeting-text">Hello, I'm</span>
            </p>

            <h1 className="hero-name">
              <span className="name-wrapper">
                Sriramkarthick{" "}
                <span className="glow-text-strong highlight-letter">S</span>
              </span>
              <div className="name-underline"></div>
            </h1>

            <h2 className="hero-title">
              <span className="typing-cursor">|</span>
              <span className="typed-text">{displayText}</span>
              <span
                className={`blinking-cursor ${isTypingComplete ? "visible" : ""}`}
              >
                _
              </span>
            </h2>

            <div className="skills-carousel">
              <span className="skills-label">Specialized in:</span>
              <div className="skills-slider">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`skill-item ${index === currentSkillIndex ? "active" : ""}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <p className="hero-description">
              <span className="description-highlight">Passionate</span> about
              building intelligent network infrastructures and embedded
              solutions from the ground up. Specialized in TCP/IP networking,
              wireless protocols, and security implementations that power
              connected devices and modern digital ecosystems.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">5+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">10+</div>
                <div className="stat-label">Certifications</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">99%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>

            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary btn-enhanced">
                <span className="btn-text">Get In Touch</span>
                <span className="btn-icon">
                  <FaRocket />
                </span>
                <span className="btn-shine"></span>
              </a>
              <a href="#projects" className="btn btn-secondary">
                <span className="btn-text">View Projects</span>
                <span className="btn-arrow">→</span>
              </a>
              <a href="/resume.pdf" download className="btn btn-outline">
                <FaDownload />
                <span>Resume</span>
              </a>
            </div>

            <div className="hero-social">
              <p className="social-label">Connect with me</p>
              <div className="social-links">
                {/* <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-tooltip="GitHub"
                >
                  <FaGithub />
                  <span className="social-ripple"></span>
                </a> */}
                <a
                  href="https://www.linkedin.com/in/sriramkarthick-srinivasan-0b09b8212/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-tooltip="LinkedIn"
                >
                  <FaLinkedin />
                  <span className="social-ripple"></span>
                </a>
                <a
                  href="mailto:sriramkarthicksrinivasan@gmail.com"
                  className="social-link"
                  data-tooltip="Email"
                >
                  <FaEnvelope />
                  <span className="social-ripple"></span>
                </a>
              </div>
            </div>
          </div>

          <div
            className="hero-visual"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
            }}
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span
                    className="terminal-button red"
                    data-action="close"
                  ></span>
                  <span
                    className="terminal-button yellow"
                    data-action="minimize"
                  ></span>
                  <span
                    className="terminal-button green"
                    data-action="maximize"
                  ></span>
                </div>
                <div className="terminal-title">
                  <span className="title-icon">⚡</span>
                  network-status.sh
                </div>
                <div className="terminal-actions">
                  <span className="action-dot"></span>
                  <span className="action-dot"></span>
                  <span className="action-dot"></span>
                </div>
              </div>

              <div className="terminal-body">
                <div className="terminal-line command">
                  <span className="terminal-prompt">$</span>
                  <span className="command-text">ping network.status</span>
                </div>
                <div
                  className="terminal-line success fade-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <span className="status-icon pulse">✓</span>
                  <span className="status-label">Network:</span>
                  <span className="glow-text status-value">ONLINE</span>
                  <span className="status-bar">
                    <span
                      className="status-progress"
                      style={{ width: "100%" }}
                    ></span>
                  </span>
                </div>
                <div
                  className="terminal-line success fade-in"
                  style={{ animationDelay: "1s" }}
                >
                  <span className="status-icon pulse">✓</span>
                  <span className="status-label">Latency:</span>
                  <span className="glow-text status-value">12ms</span>
                  <span className="latency-graph">▁▂▃▂▁</span>
                </div>
                <div
                  className="terminal-line success fade-in"
                  style={{ animationDelay: "1.5s" }}
                >
                  <span className="status-icon pulse">✓</span>
                  <span className="status-label">Uptime:</span>
                  <span className="glow-text status-value">99.9%</span>
                  <span className="uptime-badge">Excellent</span>
                </div>

                <div
                  className="terminal-line command"
                  style={{ animationDelay: "2s" }}
                >
                  <span className="terminal-prompt">$</span>
                  <span className="command-text">status --cloud-services</span>
                </div>

                <div
                  className="terminal-line success fade-in"
                  style={{ animationDelay: "2.5s" }}
                >
                  <span className="status-icon pulse">✓</span>
                  <span className="status-label">AWS:</span>
                  <span className="glow-text status-value">CONNECTED</span>
                  <span className="service-indicator aws"></span>
                </div>
                <div
                  className="terminal-line success fade-in"
                  style={{ animationDelay: "3s" }}
                >
                  <span className="status-icon pulse">✓</span>
                  <span className="status-label">Security:</span>
                  <span className="glow-text status-value">ENABLED</span>
                  <span className="service-indicator secure">🔒</span>
                </div>

                <div
                  className="terminal-line"
                  style={{ animationDelay: "3.5s" }}
                >
                  <span className="terminal-prompt">$</span>
                  <span className="blinking-cursor terminal-cursor">_</span>
                </div>
              </div>

              <div className="terminal-footer">
                <span className="footer-item">
                  <span className="footer-dot green"></span>
                  Connected
                </span>
                <span className="footer-item">
                  <span className="footer-icon">⚡</span>
                  Live
                </span>
              </div>
            </div>

            <div className="floating-badge badge-1">
              <span className="badge-icon">🛡️</span>
              <span className="badge-text">Secure</span>
            </div>
            <div className="floating-badge badge-2">
              <span className="badge-icon">⚡</span>
              <span className="badge-text">Fast</span>
            </div>
            <div className="floating-badge badge-3">
              <span className="badge-icon">☁️</span>
              <span className="badge-text">Cloud</span>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p className="scroll-text">Explore More</p>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
};

export default Hero;
