import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendar,
  FaLanguage,
  FaHeart,
  FaCheckCircle,
} from "react-icons/fa";
import "./About.css";

const About = () => {
  const [activeCard, setActiveCard] = useState(null);

  const personalInfo = [
    {
      icon: <FaCalendar />,
      label: "Date of Birth",
      value: "09/11/2001",
      color: "#3b82f6",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: "Tamil Nadu, India",
      color: "#ef4444",
    },
    {
      icon: <FaLanguage />,
      label: "Languages",
      value: "Tamil, English, Telugu",
      color: "#8b5cf6",
    },
    {
      icon: <FaHeart />,
      label: "Hobbies",
      value: "Movies, Badminton",
      color: "#ec4899",
    },
  ];

  const strengths = [
    { text: "Excel communication skills", icon: "💬" },
    { text: "Optimistic mindset", icon: "✨" },
    { text: "Team player", icon: "🤝" },
    { text: "Flexible & Adaptable", icon: "🔄" },
  ];

  const interests = [
    { text: "Gadgets & Emerging Technologies", icon: "🔧", color: "#06b6d4" },
    { text: "Internet of Things (IoT)", icon: "📡", color: "#8b5cf6" },
    { text: "Network Security & Automation", icon: "🔒", color: "#f59e0b" },
    { text: "Cloud Infrastructure", icon: "☁️", color: "#10b981" },
  ];

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title glow-text">
            About Me
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">Get to know me better</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <div className="about-intro card floating-card">
              <div className="card-header">
                <h3 className="glow-text">
                  <span className="emoji-icon">👨‍💻</span>
                  Who I Am
                </h3>
              </div>
              <div className="card-body">
                <p className="text-highlight">
                  I'm a dedicated networking and embedded systems professional
                  with a passion for building secure, scalable, and efficient
                  solutions from infrastructure to devices. With expertise in
                  TCP/IP networking, wireless protocols, and security
                  implementation, I strive to create end-to-end solutions that
                  drive connectivity and innovation.
                </p>
                <p>
                  My journey in networking and embedded systems has been driven
                  by curiosity and a commitment to continuous learning. I
                  believe in staying ahead by embracing emerging technologies
                  like wireless protocols, network automation, and IoT security
                  in the ever-evolving world of connected infrastructure.
                </p>
              </div>
              <div className="card-shine"></div>
            </div>

            <div className="personal-strengths card floating-card">
              <div className="card-header">
                <h3 className="glow-text">
                  <span className="emoji-icon">💪</span>
                  Personal Strengths
                </h3>
              </div>
              <div className="card-body">
                <div className="strengths-grid">
                  {strengths.map((strength, index) => (
                    <div
                      key={index}
                      className="strength-item"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onMouseEnter={() => setActiveCard(`strength-${index}`)}
                      onMouseLeave={() => setActiveCard(null)}
                    >
                      <div className="strength-icon">
                        <span className="strength-emoji">{strength.icon}</span>
                      </div>
                      <span>{strength.text}</span>
                      <div className="strength-checkmark">
                        <FaCheckCircle />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="about-info">
            <div className="info-card card floating-card">
              <div className="card-header">
                <h3 className="glow-text">
                  <span className="emoji-icon">📋</span>
                  Personal Profile
                </h3>
              </div>
              <div className="card-body">
                <div className="info-grid">
                  {personalInfo.map((info, index) => (
                    <div
                      key={index}
                      className={`info-item ${activeCard === `info-${index}` ? "active" : ""}`}
                      onMouseEnter={() => setActiveCard(`info-${index}`)}
                      onMouseLeave={() => setActiveCard(null)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className="info-icon"
                        style={{ "--icon-color": info.color }}
                      >
                        {info.icon}
                        <div className="icon-pulse"></div>
                      </div>
                      <div className="info-content">
                        <span className="info-label">{info.label}</span>
                        <span className="info-value">{info.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="interests-card card floating-card">
              <div className="card-header">
                <h3 className="glow-text">
                  <span className="emoji-icon">🎯</span>
                  Areas of Interest
                </h3>
              </div>
              <div className="card-body">
                <ul className="interests-list">
                  {interests.map((interest, index) => (
                    <li
                      key={index}
                      className={`interest-item ${activeCard === `interest-${index}` ? "active" : ""}`}
                      onMouseEnter={() => setActiveCard(`interest-${index}`)}
                      onMouseLeave={() => setActiveCard(null)}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        "--interest-color": interest.color,
                      }}
                    >
                      <span className="interest-icon">{interest.icon}</span>
                      <span className="interest-text">{interest.text}</span>
                      <span className="interest-arrow">→</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
