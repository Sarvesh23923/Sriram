import React, { useState, useEffect, useRef } from 'react';
import { 
  FaCode, FaDatabase, FaNetworkWired, FaCloud, 
  FaServer, FaShieldAlt, FaTools, FaLaptopCode,
  FaChevronRight, FaStar, FaBolt
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [animatedLevels, setAnimatedLevels] = useState({});
  const sectionRef = useRef(null);

  const skillCategories = [
    {
      id: 'programming',
      name: 'Programming',
      icon: <FaCode />,
      color: '#00ff41',
      skills: [
        { name: 'C', level: 85, description: 'Systems programming & algorithms' },
        { name: 'Java', level: 75, description: 'Object-oriented development' },
        { name: 'SQL', level: 80, description: 'Database queries & optimization' },
        { name: 'HTML5', level: 90, description: 'Semantic markup & accessibility' },
      ],
    },
    {
      id: 'networking',
      name: 'Networking',
      icon: <FaNetworkWired />,
      color: '#00d4ff',
      skills: [
        { name: 'Switching Concepts', level: 90, description: 'VLANs, STP, & Layer 2' },
        { name: 'Routing Concepts', level: 88, description: 'OSPF, BGP, & routing protocols' },
        { name: 'Network Security', level: 85, description: 'Firewalls & access control' },
        { name: 'TCP/IP', level: 92, description: 'Protocol stack & troubleshooting' },
      ],
    },
    {
      id: 'cloud',
      name: 'Cloud & Tools',
      icon: <FaCloud />,
      color: '#ff6b35',
      skills: [
        { name: 'AWS', level: 80, description: 'EC2, S3, Lambda, & VPC' },
        { name: 'Excel/VBA', level: 85, description: 'Automation & data analysis' },
        { name: 'Selenium', level: 75, description: 'Test automation frameworks' },
        { name: 'Q-SYS', level: 70, description: 'Audio/video network systems' },
      ],
    },
    {
      id: 'protocols',
      name: 'Protocols & Standards',
      icon: <FaServer />,
      color: '#a855f7',
      skills: [
        { name: 'HTML5 Fundamentals', level: 88, description: 'Web standards & semantics' },
        { name: 'O-SYS Microcontroller', level: 75, description: 'Embedded systems' },
        { name: 'Network Protocols', level: 90, description: 'HTTP, DNS, DHCP, & more' },
        { name: 'Security Standards', level: 82, description: 'ISO 27001 & compliance' },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          skillCategories.forEach((category) => {
            category.skills.forEach((skill, idx) => {
              setTimeout(() => {
                animateCounter(skill.name, skill.level);
              }, idx * 100);
            });
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounter = (skillName, targetLevel) => {
    let current = 0;
    const increment = targetLevel / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetLevel) {
        current = targetLevel;
        clearInterval(timer);
      }
      setAnimatedLevels(prev => ({ ...prev, [skillName]: Math.round(current) }));
    }, 20);
  };

  const getSkillLevel = (skillName, originalLevel) => {
    return animatedLevels[skillName] !== undefined ? animatedLevels[skillName] : 0;
  };

  const getLevelLabel = (level) => {
    if (level >= 90) return { text: 'Expert', icon: <FaStar /> };
    if (level >= 80) return { text: 'Advanced', icon: <FaBolt /> };
    if (level >= 70) return { text: 'Proficient', icon: <HiSparkles /> };
    return { text: 'Intermediate', icon: null };
  };

  const filteredCategories = activeCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeCategory);

  const particles = Array.from({ length: 20 }, (_, i) => (
    <div 
      key={i} 
      className="floating-particle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`,
      }}
    />
  ));

  return (
    <section 
      id="skills" 
      className={`section skills ${isVisible ? 'visible' : ''}`}
      ref={sectionRef}
    >
      {/* Background Effects */}
      <div className="skills-bg-effects">
        <div className="grid-overlay"></div>
        <div className="floating-particles">{particles}</div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      <div className="container">
        {/* Section Header - Centered */}
        <div className="section-header">
          <div className="header-content">
            <span className="section-badge">
              <FaCode /> What I Know
            </span>
            <h2 className="section-title glow-text">
              Technical Skills
            </h2>
            <div className="title-decoration">
              <span className="decoration-line"></span>
              <span className="decoration-icon"><HiSparkles /></span>
              <span className="decoration-line"></span>
            </div>
            <p className="section-subtitle">
              A comprehensive overview of my technical expertise and proficiencies
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="skills-filter">
          <button
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <span className="btn-bg"></span>
            <span className="btn-content">
              <FaLaptopCode /> 
              <span>All Skills</span>
              <span className="skill-count">
                {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
              </span>
            </span>
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={{ '--category-color': category.color }}
            >
              <span className="btn-bg"></span>
              <span className="btn-content">
                {category.icon}
                <span>{category.name}</span>
                <span className="skill-count">{category.skills.length}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredCategories.map((category, index) => (
            <div 
              key={category.id} 
              className="skill-category card"
              style={{ 
                '--category-color': category.color,
                '--animation-delay': `${index * 0.1}s`
              }}
            >
              <div className="card-glow"></div>
              <div className="card-border"></div>
              
              <div className="category-header">
                <div className="category-icon-wrapper">
                  <div className="category-icon">{category.icon}</div>
                  <div className="icon-ring"></div>
                  <div className="icon-particles">
                    {[...Array(6)].map((_, i) => (
                      <span key={i} className="icon-particle"></span>
                    ))}
                  </div>
                </div>
                <div className="category-info">
                  <h3 className="category-title">{category.name}</h3>
                  <span className="category-count">{category.skills.length} skills</span>
                </div>
                <div className="category-level">
                  <svg className="circular-progress" viewBox="0 0 36 36">
                    <path
                      className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle-progress"
                      strokeDasharray={`${Math.round(category.skills.reduce((a, b) => a + b.level, 0) / category.skills.length)}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="average-level">
                    {Math.round(category.skills.reduce((a, b) => a + b.level, 0) / category.skills.length)}%
                  </span>
                </div>
              </div>

              <div className="skills-list">
                {category.skills.map((skill, idx) => {
                  const levelLabel = getLevelLabel(skill.level);
                  const isHovered = hoveredSkill === `${category.id}-${idx}`;
                  
                  return (
                    <div 
                      key={idx} 
                      className={`skill-item ${isHovered ? 'hovered' : ''}`}
                      style={{ '--skill-delay': `${idx * 0.1}s` }}
                      onMouseEnter={() => setHoveredSkill(`${category.id}-${idx}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="skill-header">
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <span className={`skill-badge level-${levelLabel.text.toLowerCase()}`}>
                            {levelLabel.icon} {levelLabel.text}
                          </span>
                        </div>
                        <div className="skill-percentage">
                          <span className="percentage-value">
                            {getSkillLevel(skill.name, skill.level)}
                          </span>
                          <span className="percentage-symbol">%</span>
                        </div>
                      </div>
                      
                      <div className="skill-bar-container">
                        <div className="skill-bar">
                          <div 
                            className="skill-progress" 
                            style={{ 
                              width: isVisible ? `${skill.level}%` : '0%',
                              transitionDelay: `${idx * 0.1}s`
                            }}
                          >
                            <div className="progress-glow"></div>
                            <div className="progress-shine"></div>
                          </div>
                        </div>
                        <div className="skill-markers">
                          {[25, 50, 75, 100].map((marker) => (
                            <span 
                              key={marker} 
                              className={`marker ${skill.level >= marker ? 'filled' : ''}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="skill-tooltip">
                        <p>{skill.description}</p>
                        <div className="tooltip-arrow"></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="category-footer">
                <button className="explore-btn">
                  <span>View Projects</span>
                  <FaChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Competencies */}
        <div className="additional-skills">
          <div className="subsection-header">
            <span className="section-badge">
              <HiSparkles /> More Expertise
            </span>
            <h3 className="subsection-title glow-text">Additional Competencies</h3>
          </div>
          
          <div className="competencies-grid">
            {[
              {
                icon: <FaShieldAlt />,
                title: 'Security',
                description: 'Network security, encryption, and best practices',
                color: '#ff6b6b',
                stats: ['Firewall Config', 'Penetration Testing', 'Compliance']
              },
              {
                icon: <FaTools />,
                title: 'Automation',
                description: 'Network automation and scripting solutions',
                color: '#4ecdc4',
                stats: ['Python Scripts', 'CI/CD', 'Infrastructure as Code']
              },
              {
                icon: <FaDatabase />,
                title: 'Data Management',
                description: 'Database design and optimization',
                color: '#ffd93d',
                stats: ['SQL Optimization', 'Data Modeling', 'Backup Solutions']
              },
            ].map((comp, idx) => (
              <div 
                key={idx} 
                className="competency-card card"
                style={{ '--comp-color': comp.color, '--card-delay': `${idx * 0.15}s` }}
              >
                <div className="competency-bg"></div>
                <div className="competency-icon-wrapper">
                  <div className="competency-icon">{comp.icon}</div>
                  <div className="icon-pulse"></div>
                </div>
                <h4>{comp.title}</h4>
                <p>{comp.description}</p>
                <div className="competency-tags">
                  {comp.stats.map((stat, i) => (
                    <span key={i} className="comp-tag">{stat}</span>
                  ))}
                </div>
                <div className="hover-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="skills-summary">
          <div className="summary-item">
            <span className="summary-number">
              {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}+
            </span>
            <span className="summary-label">Technical Skills</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-number">
              {Math.round(
                skillCategories.flatMap(c => c.skills).reduce((a, b) => a + b.level, 0) / 
                skillCategories.flatMap(c => c.skills).length
              )}%
            </span>
            <span className="summary-label">Average Proficiency</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-number">4</span>
            <span className="summary-label">Core Domains</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;