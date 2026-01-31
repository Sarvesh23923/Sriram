import React, { useState, useEffect } from 'react';
import { FaCertificate, FaAward, FaCalendarAlt, FaMedal, FaTrophy, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';
import { SiCisco, SiCoursera, SiUdemy } from 'react-icons/si';
import './Certifications.css';

const Certifications = () => {
  const certifications = [
    {
      title: 'Cisco - Robotic Process Automation',
      provider: 'Cisco',
      icon: <SiCisco />,
      date: 'June 2020',
      type: 'Professional',
      color: '#1BA0D7',
      verified: true,
      credentialId: 'CISCO-RPA-2020',
    },
    {
      title: 'Introduction to Artificial Intelligence (AI)',
      provider: 'Coursera - IBM',
      icon: <SiCoursera />,
      date: 'August 2020',
      type: 'Professional',
      percentage: '100%',
      color: '#0056D2',
      verified: true,
      credentialId: 'IBM-AI-2020',
    },
    {
      title: 'Coursera - Data Science Math Skills',
      provider: 'Coursera - Duke University',
      icon: <SiCoursera />,
      date: 'August 2020',
      type: 'Professional',
      percentage: '99%',
      color: '#0056D2',
      verified: true,
      credentialId: 'DUKE-DSMS-2020',
    },
    {
      title: 'Getting Started with AWS Machine Learning',
      provider: 'Coursera - AWS',
      icon: <SiCoursera />,
      date: 'September 2020',
      type: 'Cloud',
      percentage: '100%',
      color: '#FF9900',
      verified: true,
      credentialId: 'AWS-ML-2020',
    },
    {
      title: 'Cloud Computing Basics (Cloud 101)',
      provider: 'Coursera - LearnQuest',
      icon: <SiCoursera />,
      date: 'October 2020',
      type: 'Cloud',
      percentage: '97%',
      color: '#0056D2',
      verified: true,
      credentialId: 'LQ-CC101-2020',
    },
    {
      title: 'Networking Technologies and Consulting',
      provider: 'Udemy - Deloitte',
      icon: <SiUdemy />,
      date: 'August 2020',
      type: 'Networking',
      color: '#A435F0',
      verified: true,
    },
    {
      title: 'Network Virtualization Concepts',
      provider: 'Udemy',
      icon: <SiUdemy />,
      date: 'August 2020',
      type: 'Networking',
      color: '#A435F0',
      verified: true,
    },
    {
      title: 'Cisco CCNA 200-301 - Full Course for Networking Basics',
      provider: 'Udemy',
      icon: <SiUdemy />,
      date: 'August 2021',
      type: 'Networking',
      color: '#A435F0',
      verified: true,
    },
    {
      title: 'Cisco CCNA 200-301 - The Complete Guide to Getting Certified',
      provider: 'Udemy',
      icon: <SiUdemy />,
      date: 'August 2021',
      type: 'Networking',
      color: '#A435F0',
      verified: true,
    },
    {
      title: 'Introduction to Computer Networking',
      provider: 'Udemy - Crash Course',
      icon: <SiUdemy />,
      date: 'August 2024',
      type: 'Networking',
      color: '#A435F0',
      verified: true,
    },
    {
      title: 'The Beginner\'s Guide to IoT Business',
      provider: 'Udemy',
      icon: <SiUdemy />,
      date: 'August 2024',
      type: 'IoT',
      color: '#A435F0',
      verified: true,
    },
    {
      title: 'Pose IB Masterclass from Couch to 10 minutes',
      provider: 'Udemy',
      icon: <SiUdemy />,
      date: 'August 2024',
      type: 'Professional',
      color: '#A435F0',
      verified: true,
    },
    {
      title: 'GPT Builder Course: Mastering Specialized AI Agents',
      provider: 'Udemy',
      icon: <SiUdemy />,
      date: 'August 2024',
      type: 'AI',
      color: '#A435F0',
      verified: true,
    },
    {
      title: 'NPTEL - Sensors and Actuators',
      provider: 'NPTEL - IITs',
      icon: <FaCertificate />,
      date: 'April 2022',
      type: 'IoT',
      percentage: 'Elite (62%)',
      color: '#FF6B35',
      verified: true,
      credentialId: 'NPTEL-SA-2022',
    },
  ];

  const certTypes = [
    { label: 'All', icon: <FaTrophy /> },
    { label: 'Networking', icon: <FaCertificate /> },
    { label: 'Cloud', icon: <FaAward /> },
    { label: 'Professional', icon: <FaMedal /> },
    { label: 'IoT', icon: <FaCertificate /> },
    { label: 'AI', icon: <FaCertificate /> },
  ];

  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCards, setAnimateCards] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredCerts = activeFilter === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.type === activeFilter);

  useEffect(() => {
    setAnimateCards(false);
    const timeout = setTimeout(() => setAnimateCards(true), 50);
    setVisibleCount(6); // Reset visible count on filter change
    return () => clearTimeout(timeout);
  }, [activeFilter]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredCerts.length));
  };

  const displayedCerts = filteredCerts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCerts.length;

  return (
    <section id="certifications" className="section certifications">
      {/* Background Effects */}
      <div className="cert-background">
        <div className="cert-grid-bg"></div>
        <div className="cert-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="cert-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="cert-header">
          <div className="cert-header-icon">
            <FaTrophy />
          </div>
          <h2 className="section-title">
            Certifications & <span className="glow-text">Achievements</span>
          </h2>
          <p className="section-description">
            Continuous learning and professional development through industry-recognized certifications
          </p>
        </div>

        {/* Stats Summary */}
        <div className="cert-stats-top">
          <div className="stat-item">
            <div className="stat-icon"><FaCertificate /></div>
            <div className="stat-info">
              <div className="stat-number">{certifications.length}</div>
              <div className="stat-label">Total Certifications</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><FaCheckCircle /></div>
            <div className="stat-info">
              <div className="stat-number">{certifications.filter(c => c.verified).length}</div>
              <div className="stat-label">Verified</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><FaAward /></div>
            <div className="stat-info">
              <div className="stat-number">5+</div>
              <div className="stat-label">Platforms</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="cert-filters">
          {certTypes.map((type) => (
            <button
              key={type.label}
              className={`cert-filter-btn ${activeFilter === type.label ? 'active' : ''}`}
              onClick={() => setActiveFilter(type.label)}
            >
              <span className="filter-icon">{type.icon}</span>
              <span className="filter-label">{type.label}</span>
              <span className="filter-count">
                {type.label === 'All' 
                  ? certifications.length 
                  : certifications.filter(c => c.type === type.label).length}
              </span>
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className={`certifications-grid ${animateCards ? 'animate' : ''}`}>
          {displayedCerts.map((cert, index) => (
            <div 
              key={index} 
              className="cert-card"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                '--cert-color': cert.color 
              }}
            >
              {/* Verified Badge */}
              {cert.verified && (
                <div className="verified-badge" title="Verified Certification">
                  <FaCheckCircle />
                </div>
              )}

              {/* Card Header */}
              <div className="cert-card-header">
                <div className="cert-icon-wrapper">
                  <div className="cert-icon" style={{ color: cert.color }}>
                    {cert.icon}
                  </div>
                  <div className="cert-icon-glow" style={{ background: cert.color }}></div>
                </div>
                <div className="cert-type-badge">
                  {cert.type}
                </div>
              </div>

              {/* Card Body */}
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                
                <div className="cert-meta">
                  <p className="cert-provider">
                    <FaAward />
                    <span>{cert.provider}</span>
                  </p>
                  <p className="cert-date">
                    <FaCalendarAlt />
                    <span>{cert.date}</span>
                  </p>
                </div>

                {/* Score/Percentage */}
                {cert.percentage && (
                  <div className="cert-score">
                    <div className="score-bar">
                      <div 
                        className="score-fill" 
                        style={{ 
                          width: cert.percentage,
                          background: cert.color 
                        }}
                      ></div>
                    </div>
                    <div className="score-text">
                      <span className="score-label">Score:</span>
                      <span className="score-value">{cert.percentage}</span>
                    </div>
                  </div>
                )}

                {/* Credential ID */}
                {cert.credentialId && (
                  <div className="cert-credential">
                    <span className="credential-label">ID:</span>
                    <code className="credential-id">{cert.credentialId}</code>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="cert-card-footer">
                <button className="cert-view-btn">
                  <span>View Certificate</span>
                  <FaExternalLinkAlt />
                </button>
              </div>

              {/* Hover Effect */}
              <div className="cert-card-shine"></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore}>
              <span>Load More Certifications</span>
              <span className="load-more-count">
                ({filteredCerts.length - visibleCount} remaining)
              </span>
            </button>
          </div>
        )}

        {/* Bottom Stats */}
        <div className="cert-stats-bottom">
          <div className="stat-card">
            <div className="stat-icon-large">
              <FaCertificate />
            </div>
            <div className="stat-number glow-text-strong">{certifications.length}+</div>
            <div className="stat-label">Certifications</div>
            <div className="stat-description">Across multiple domains</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-large">
              <FaTrophy />
            </div>
            <div className="stat-number glow-text-strong">5+</div>
            <div className="stat-label">Platforms</div>
            <div className="stat-description">Industry leaders</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-large">
              <FaMedal />
            </div>
            <div className="stat-number glow-text-strong">100%</div>
            <div className="stat-label">Commitment</div>
            <div className="stat-description">To continuous learning</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;