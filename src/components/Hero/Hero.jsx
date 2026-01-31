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
    <section id="home" className="hs-hero">
      <div className="hs-hero-background">
        <div className="hs-network-grid"></div>
        <div className="hs-gradient-orbs">
          <div className="hs-orb hs-orb-1"></div>
          <div className="hs-orb hs-orb-2"></div>
          <div className="hs-orb hs-orb-3"></div>
        </div>
        <div className="hs-floating-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="hs-particle"
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
        <div className="hs-connection-lines">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="hs-connection-line"
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

      <div className="hs-container">
        <div className="hs-hero-content">
          <div className="hs-hero-text">
            <div className="hs-hero-badge">
              <span className="hs-badge-dot"></span>
              Available for opportunities
            </div>

            <p className="hs-hero-greeting">
              <span className="hs-terminal-prompt">$</span>
              <span className="hs-greeting-text">Hello, I'm</span>
            </p>

            <h1 className="hs-hero-name">
              <span className="hs-name-wrapper">
                Sriramkarthick{" "}
                <span className="hs-glow-text-strong hs-highlight-letter">S</span>
              </span>
              <div className="hs-name-underline"></div>
            </h1>

            <h2 className="hs-hero-title">
              <span className="hs-typing-cursor">|</span>
              <span className="hs-typed-text">{displayText}</span>
              <span
                className={`hs-blinking-cursor ${isTypingComplete ? "hs-visible" : ""}`}
              >
                _
              </span>
            </h2>

            <div className="hs-skills-carousel">
              <span className="hs-skills-label">Specialized in:</span>
              <div className="hs-skills-slider">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`hs-skill-item ${index === currentSkillIndex ? "hs-active" : ""}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <p className="hs-hero-description">
              <span className="hs-description-highlight">Passionate</span> about
              building intelligent network infrastructures and embedded
              solutions from the ground up. Specialized in TCP/IP networking,
              wireless protocols, and security implementations that power
              connected devices and modern digital ecosystems.
            </p>

            <div className="hs-hero-stats">
              <div className="hs-stat-item">
                <div className="hs-stat-value">5+</div>
                <div className="hs-stat-label">Projects</div>
              </div>
              <div className="hs-stat-divider"></div>
              <div className="hs-stat-item">
                <div className="hs-stat-value">10+</div>
                <div className="hs-stat-label">Certifications</div>
              </div>
              <div className="hs-stat-divider"></div>
              <div className="hs-stat-item">
                <div className="hs-stat-value">99%</div>
                <div className="hs-stat-label">Uptime</div>
              </div>
            </div>

            <div className="hs-hero-cta">
              <a href="#contact" className="hs-btn hs-btn-primary hs-btn-enhanced">
                <span className="hs-btn-text">Get In Touch</span>
                <span className="hs-btn-icon">
                  <FaRocket />
                </span>
                <span className="hs-btn-shine"></span>
              </a>
              <a href="#projects" className="hs-btn hs-btn-secondary">
                <span className="hs-btn-text">View Projects</span>
                <span className="hs-btn-arrow">→</span>
              </a>
              <a href="/resume.pdf" download className="hs-btn hs-btn-outline">
                <FaDownload />
                <span>Resume</span>
              </a>
            </div>

            <div className="hs-hero-social">
              <p className="hs-social-label">Connect with me</p>
              <div className="hs-social-links">
                <a
                  href="https://www.linkedin.com/in/sriramkarthick-srinivasan-0b09b8212/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hs-social-link"
                  data-tooltip="LinkedIn"
                >
                  <FaLinkedin />
                  <span className="hs-social-ripple"></span>
                </a>
                <a
                  href="mailto:sriramkarthicksrinivasan@gmail.com"
                  className="hs-social-link"
                  data-tooltip="Email"
                >
                  <FaEnvelope />
                  <span className="hs-social-ripple"></span>
                </a>
              </div>
            </div>
          </div>

          <div
            className="hs-hero-visual"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
            }}
          >
            <div className="hs-terminal-window">
              <div className="hs-terminal-header">
                <div className="hs-terminal-buttons">
                  <span
                    className="hs-terminal-button hs-red"
                    data-action="close"
                  ></span>
                  <span
                    className="hs-terminal-button hs-yellow"
                    data-action="minimize"
                  ></span>
                  <span
                    className="hs-terminal-button hs-green"
                    data-action="maximize"
                  ></span>
                </div>
                <div className="hs-terminal-title">
                  <span className="hs-title-icon">⚡</span>
                  network-status.sh
                </div>
                <div className="hs-terminal-actions">
                  <span className="hs-action-dot"></span>
                  <span className="hs-action-dot"></span>
                  <span className="hs-action-dot"></span>
                </div>
              </div>

              <div className="hs-terminal-body">
                <div className="hs-terminal-line hs-command">
                  <span className="hs-terminal-prompt">$</span>
                  <span className="hs-command-text">ping network.status</span>
                </div>
                <div
                  className="hs-terminal-line hs-success hs-fade-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <span className="hs-status-icon hs-pulse">✓</span>
                  <span className="hs-status-label">Network:</span>
                  <span className="hs-glow-text hs-status-value">ONLINE</span>
                  <span className="hs-status-bar">
                    <span
                      className="hs-status-progress"
                      style={{ width: "100%" }}
                    ></span>
                  </span>
                </div>
                <div
                  className="hs-terminal-line hs-success hs-fade-in"
                  style={{ animationDelay: "1s" }}
                >
                  <span className="hs-status-icon hs-pulse">✓</span>
                  <span className="hs-status-label">Latency:</span>
                  <span className="hs-glow-text hs-status-value">12ms</span>
                  <span className="hs-latency-graph">▁▂▃▂▁</span>
                </div>
                <div
                  className="hs-terminal-line hs-success hs-fade-in"
                  style={{ animationDelay: "1.5s" }}
                >
                  <span className="hs-status-icon hs-pulse">✓</span>
                  <span className="hs-status-label">Uptime:</span>
                  <span className="hs-glow-text hs-status-value">99.9%</span>
                  <span className="hs-uptime-badge">Excellent</span>
                </div>

                <div
                  className="hs-terminal-line hs-command"
                  style={{ animationDelay: "2s" }}
                >
                  <span className="hs-terminal-prompt">$</span>
                  <span className="hs-command-text">status --cloud-services</span>
                </div>

                <div
                  className="hs-terminal-line hs-success hs-fade-in"
                  style={{ animationDelay: "2.5s" }}
                >
                  <span className="hs-status-icon hs-pulse">✓</span>
                  <span className="hs-status-label">AWS:</span>
                  <span className="hs-glow-text hs-status-value">CONNECTED</span>
                  <span className="hs-service-indicator hs-aws"></span>
                </div>
                <div
                  className="hs-terminal-line hs-success hs-fade-in"
                  style={{ animationDelay: "3s" }}
                >
                  <span className="hs-status-icon hs-pulse">✓</span>
                  <span className="hs-status-label">Security:</span>
                  <span className="hs-glow-text hs-status-value">ENABLED</span>
                  <span className="hs-service-indicator hs-secure">🔒</span>
                </div>

                <div
                  className="hs-terminal-line"
                  style={{ animationDelay: "3.5s" }}
                >
                  <span className="hs-terminal-prompt">$</span>
                  <span className="hs-blinking-cursor hs-terminal-cursor">_</span>
                </div>
              </div>

              <div className="hs-terminal-footer">
                <span className="hs-footer-item">
                  <span className="hs-footer-dot hs-green"></span>
                  Connected
                </span>
                <span className="hs-footer-item">
                  <span className="hs-footer-icon">⚡</span>
                  Live
                </span>
              </div>
            </div>

            <div className="hs-floating-badge hs-badge-1">
              <span className="hs-badge-icon">🛡️</span>
              <span className="hs-badge-text">Secure</span>
            </div>
            <div className="hs-floating-badge hs-badge-2">
              <span className="hs-badge-icon">⚡</span>
              <span className="hs-badge-text">Fast</span>
            </div>
            <div className="hs-floating-badge hs-badge-3">
              <span className="hs-badge-icon">☁️</span>
              <span className="hs-badge-text">Cloud</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hs-scroll-indicator">
        <div className="hs-mouse">
          <div className="hs-wheel"></div>
        </div>
        <p className="hs-scroll-text">Explore More</p>
        <div className="hs-scroll-arrow">↓</div>
      </div>
    </section>
  );
};

export default Hero;