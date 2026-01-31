import React, { useState, useEffect, useRef } from 'react';
import { 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaCheckCircle, 
  FaStar, 
  FaTrophy,
  FaBook,
  FaMedal,
  FaAward
} from 'react-icons/fa';
import './Education.css';

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const education = [
    {
      degree: 'B.E. Electronics and Communication Engineering',
      institution: 'Coimbatore Institute of Engineering and Technology',
      location: 'Coimbatore, Tamilnadu, India',
      period: '2018 - 2023',
      duration: '5 years',
      type: "Bachelor's Degree",
      icon: '🎓',
      color: '#3b82f6',
      gpa: '8.5/10',
      highlights: [
        'Specialized in Electronics and Communication Engineering',
        'Focused on networking and embedded systems',
        'Completed multiple IoT and networking projects',
      ],
      achievements: [
        'IoT Excellence Award',
        'Best Project - Networking',
      ],
    },
    {
      degree: 'Higher Secondary (HSC)',
      institution: 'Lisieux Matriculation Higher Secondary School',
      location: 'Coimbatore, Tamilnadu, India',
      period: '2016 - 2018',
      duration: '2 years',
      type: 'High School',
      icon: '📚',
      color: '#8b5cf6',
      gpa: '90%',
      highlights: [
        'Strong foundation in mathematics and science',
        'Developed interest in technology and electronics',
        'Active participation in science exhibitions',
      ],
      achievements: [
        'Academic Excellence',
        'Science Fair Winner',
      ],
    },
    {
      degree: 'SSLC (10th Standard)',
      institution: 'Lisieux Matriculation Higher Secondary School',
      location: 'Coimbatore, Tamilnadu, India',
      period: '2015 - 2016',
      duration: '1 year',
      type: 'Secondary School',
      icon: '📖',
      color: '#10b981',
      gpa: '95%',
      highlights: [
        'Comprehensive secondary education',
        'Excellence in academic performance',
        'Foundation in core subjects',
      ],
      achievements: [
        'Top Performer',
        'School Topper',
      ],
    },
  ];

  const certifications = [
    {
      title: 'Cloud Computing Fundamentals',
      organization: 'AWS Academy',
      period: '2022',
      duration: '3 months',
      icon: '☁️',
      color: '#06b6d4',
      description: 'Comprehensive training in cloud infrastructure and services',
      skills: ['AWS', 'Cloud Architecture', 'DevOps'],
    },
    {
      title: 'Network Security Professional',
      organization: 'Cisco Networking Academy',
      period: '2021',
      duration: '6 months',
      icon: '🔒',
      color: '#f59e0b',
      description: 'Advanced network security concepts and implementation',
      skills: ['Network Security', 'Firewall', 'Cybersecurity'],
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
    <section id="education" className="section education" ref={sectionRef}>
      <div className="education-background">
        <div className="education-pattern"></div>
      </div>

      <div className="container">
        <div className="section-header">
          <h2 className="section-title glow-text">
            Education
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">Academic background and qualifications that shaped my expertise</p>
        </div>

        <div className="education-content">
          {/* Academic Timeline */}
          <div className="education-timeline">
            <div className="timeline-line">
              <div className="timeline-progress" style={{ height: isVisible ? '100%' : '0%' }}></div>
            </div>
            
            {education.map((edu, index) => (
              <div 
                key={index} 
                className={`timeline-item ${isVisible ? 'visible' : ''} ${activeIndex === index ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="timeline-marker" style={{ '--marker-color': edu.color }}>
                  <div className="marker-icon">{edu.icon}</div>
                  <div className="marker-pulse"></div>
                </div>
                
                <div className="timeline-content card">
                  <div className="card-header-row">
                    <div className="education-badge" style={{ '--badge-color': edu.color }}>
                      <span className="badge-dot"></span>
                      {edu.type}
                    </div>
                    <div className="duration-badge">
                      <span className="duration-icon">⏱️</span>
                      {edu.duration}
                    </div>
                  </div>

                  <div className="education-header">
                    <div className="degree-row">
                      <h3 className="education-degree">{edu.degree}</h3>
                      <span className="gpa-badge" style={{ '--gpa-color': edu.color }}>
                        <FaMedal />
                        {edu.gpa}
                      </span>
                    </div>
                    <p className="education-institution">
                      <span className="institution-icon">🏛️</span>
                      {edu.institution}
                    </p>
                  </div>
                  
                  <div className="education-meta">
                    <span className="meta-item">
                      <FaCalendarAlt />
                      <span>{edu.period}</span>
                    </span>
                    <span className="meta-divider">•</span>
                    <span className="meta-item">
                      <FaMapMarkerAlt />
                      <span>{edu.location}</span>
                    </span>
                  </div>

                  <div className="education-body">
                    <div className="education-section">
                      <h4 className="section-label">
                        <FaCheckCircle />
                        Key Highlights
                      </h4>
                      <ul className="education-highlights">
                        {edu.highlights.map((highlight, idx) => (
                          <li key={idx} style={{ animationDelay: `${idx * 0.1}s` }}>
                            <span className="bullet">▹</span>
                            <span className="highlight-text">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="education-section">
                      <h4 className="section-label">
                        <FaTrophy />
                        Achievements
                      </h4>
                      <div className="achievements-grid">
                        {edu.achievements.map((achievement, idx) => (
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

          {/* Certifications Section */}
          {/* <div className="certifications-section">
            <div className="subsection-header">
              <h3 className="subsection-title glow-text">
                <span className="subsection-icon">🏆</span>
                Certifications & Training
              </h3>
              <span className="title-line"></span>
              <p className="subsection-subtitle">Professional certifications enhancing my skills</p>
            </div>

            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className={`certification-card card ${isVisible ? 'visible' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    '--card-color': cert.color 
                  }}
                >
                  <div className="certification-header">
                    <div className="certification-icon">
                      <span className="icon-emoji">{cert.icon}</span>
                      <div className="icon-glow"></div>
                    </div>
                    <div className="duration-pill">
                      {cert.duration}
                    </div>
                  </div>

                  <div className="certification-content">
                    <h4 className="certification-title">{cert.title}</h4>
                    <p className="certification-organization">
                      <FaAward />
                      <span>{cert.organization}</span>
                    </p>
                    
                    <p className="certification-period">
                      <FaCalendarAlt />
                      <span>{cert.period}</span>
                    </p>
                    
                    <p className="certification-description">{cert.description}</p>

                    <div className="skills-tags">
                      {cert.skills.map((skill, idx) => (
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

          {/* Education Stats */}
          <div className="education-stats">
            <div className="stat-card">
              <div className="stat-icon">🎓</div>
              <div className="stat-value">B.E.</div>
              <div className="stat-label">Degree</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-value">5+</div>
              <div className="stat-label">Years of Study</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-value">2+</div>
              <div className="stat-label">Certifications</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">8.5</div>
              <div className="stat-label">CGPA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;