import React, { useState, useEffect, useRef } from 'react';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaStar, FaTrophy } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const experiences = [
    {
      title: 'Associate/Permanent Engineer',
      company: 'Seco Systems Private Limited',
      location: 'Remote',
      period: 'Oct 2023 - Feb 2025',
      duration: '1 year 5 months',
      type: 'Full-time',
      icon: '💼',
      color: '#3b82f6',
      responsibilities: [
        'Developed and maintained networking solutions using cutting-edge technologies',
        'Applied academic knowledge and strong work ethic to contribute to team success and company growth',
        'Collaborated with cross-functional teams to deliver high-quality network infrastructure',
      ],
      achievements: [
        'Led 3 major network infrastructure projects',
        'Improved system efficiency by 40%',
      ],
    },
    {
      title: 'Permanent Analyst Trainee',
      company: 'Cognizant Technology Solutions',
      location: 'Chennai',
      period: 'Sep 2023 - Sep 2025',
      duration: '2 years',
      type: 'Full-time',
      icon: '🎓',
      color: '#8b5cf6',
      responsibilities: [
        'Analyzed and optimized network performance and security',
        'Implemented automation solutions for network management',
        'Participated in training programs to enhance technical skills',
      ],
      achievements: [
        'Completed 5+ certification programs',
        'Automated 60% of routine tasks',
      ],
    },
    {
      title: 'Permanent Analyst',
      company: 'Cognizant Technology Solutions',
      location: 'Chennai',
      period: 'Sep 2023 - Present',
      duration: 'Ongoing',
      type: 'Full-time',
      icon: '🚀',
      color: '#10b981',
      responsibilities: [
        'Led network infrastructure projects and implementations',
        'Provided technical expertise in cloud and networking solutions',
        'Mentored junior team members and contributed to knowledge sharing',
      ],
      achievements: [
        'Mentored 5+ junior engineers',
        'Reduced deployment time by 50%',
      ],
    },
  ];

  const internships = [
    {
      title: 'Internet of Things - Cloud Internship',
      company: 'Pantech eLearning',
      period: '24/05/2021 - 24/07/2021',
      duration: '3 months',
      icon: '☁️',
      color: '#06b6d4',
      description: 'Gained hands-on experience with IoT devices and cloud integration',
      skills: ['IoT', 'Cloud Computing', 'Data Analytics'],
    },
    {
      title: 'Embedded Engineering Internship',
      company: 'Seco Systems Private Limited',
      period: '18/10/2021 - 8/10/2023',
      duration: '2 years',
      icon: '⚙️',
      color: '#f59e0b',
      description: 'Worked on embedded systems and network protocols',
      skills: ['Embedded Systems', 'Network Protocols', 'Hardware Integration'],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="experience" className="section experience" ref={sectionRef}>
      <div className="experience-background">
        <div className="experience-pattern"></div>
      </div>

      <div className="container">
        <div className="section-header">
          <h2 className="section-title glow-text">
            Work Experience
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">My professional journey and growth</p>
        </div>

        <div className="experience-content">
          {/* Professional Experience Timeline */}
          <div className="experience-timeline">
            <div className="timeline-line">
              <div className="timeline-progress" style={{ height: isVisible ? '100%' : '0%' }}></div>
            </div>
            
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`timeline-item ${isVisible ? 'visible' : ''} ${activeIndex === index ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="timeline-marker" style={{ '--marker-color': exp.color }}>
                  <div className="marker-icon">{exp.icon}</div>
                  <div className="marker-pulse"></div>
                </div>
                
                <div className="timeline-content card">
                  <div className="card-header-row">
                    <div className="experience-badge" style={{ '--badge-color': exp.color }}>
                      <span className="badge-dot"></span>
                      {exp.type}
                    </div>
                    <div className="duration-badge">
                      <span className="duration-icon">⏱️</span>
                      {exp.duration}
                    </div>
                  </div>

                  <div className="experience-header">
                    <h3 className="experience-title">{exp.title}</h3>
                    <p className="experience-company">
                      <span className="company-icon">🏢</span>
                      {exp.company}
                    </p>
                  </div>
                  
                  <div className="experience-meta">
                    <span className="meta-item">
                      <FaCalendarAlt />
                      <span>{exp.period}</span>
                    </span>
                    <span className="meta-divider">•</span>
                    <span className="meta-item">
                      <FaMapMarkerAlt />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                  <div className="experience-body">
                    <div className="experience-section">
                      <h4 className="section-label">
                        <FaCheckCircle />
                        Key Responsibilities
                      </h4>
                      <ul className="experience-responsibilities">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} style={{ animationDelay: `${idx * 0.1}s` }}>
                            <span className="bullet">▹</span>
                            <span className="responsibility-text">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="experience-section">
                      <h4 className="section-label">
                        <FaTrophy />
                        Key Achievements
                      </h4>
                      <div className="achievements-grid">
                        {exp.achievements.map((achievement, idx) => (
                          <div key={idx} className="achievement-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <FaStar className="achievement-icon" />
                            <span className="achievement-text">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Internships Section */}
          {/* <div className="internships-section">
            <div className="subsection-header">
              <h3 className="subsection-title glow-text">
                <span className="subsection-icon">🎯</span>
                Internships & Training
              </h3>
              <span className="title-line"></span>
              <p className="subsection-subtitle">Building foundation through practical experience</p>
            </div>

            <div className="internships-grid">
              {internships.map((internship, index) => (
                <div 
                  key={index} 
                  className={`internship-card card ${isVisible ? 'visible' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    '--card-color': internship.color 
                  }}
                >
                  <div className="internship-header">
                    <div className="internship-icon">
                      <span className="icon-emoji">{internship.icon}</span>
                      <div className="icon-glow"></div>
                    </div>
                    <div className="duration-pill">
                      {internship.duration}
                    </div>
                  </div>

                  <div className="internship-content">
                    <h4 className="internship-title">{internship.title}</h4>
                    <p className="internship-company">
                      <FaBriefcase />
                      <span>{internship.company}</span>
                    </p>
                    
                    <p className="internship-period">
                      <FaCalendarAlt />
                      <span>{internship.period}</span>
                    </p>
                    
                    <p className="internship-description">{internship.description}</p>

                    <div className="skills-tags">
                      {internship.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="card-corner"></div>
                  <div className="card-shine"></div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Experience Stats */}
          <div className="experience-stats">
            <div className="stat-card">
              <div className="stat-icon">💼</div>
              <div className="stat-value">3+</div>
              <div className="stat-label">Professional Roles</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎓</div>
              <div className="stat-value">2</div>
              <div className="stat-label">Internships</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-value">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-value">10+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;