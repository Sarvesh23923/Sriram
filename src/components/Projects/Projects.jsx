import React, { useState, useEffect, useRef } from 'react';
import { 
  FaGithub, FaExternalLinkAlt, FaCode, FaInfoCircle, 
  FaCheckCircle, FaServer, FaCloud, FaShieldAlt, FaDatabase,
  FaNetworkWired, FaMicrochip, FaRocket, FaStar, FaAward,
  FaLightbulb, FaChartLine, FaCog, FaTerminal, FaSearch,
  FaFilter, FaTimes, FaArrowRight, FaEye, FaTrophy,
  FaHeartbeat, FaGraduationCap, FaCalculator
} from 'react-icons/fa';
import { HiSparkles, HiChip } from 'react-icons/hi';
import { BiCodeAlt } from 'react-icons/bi';
import { MdSensors, MdQuiz } from 'react-icons/md';
import { GiLaserWarning } from 'react-icons/gi';
import Modal from '../UI/Modal';
import './Projects.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'Infrared Tester using LED Indication',
      shortTitle: 'IR Tester',
      description: 'Hardware project that tests the presence of infrared rays within a certain distance using LED indicators.',
      fullDescription: 'A hardware-based infrared testing device designed to detect and indicate the presence of infrared rays within a specified range. The system uses LED indicators to provide visual feedback about IR detection, making it useful for testing remote controls, IR sensors, and other infrared-emitting devices.',
      technologies: ['Electronics', 'IR Sensors', 'LED', 'Circuit Design', 'Hardware'],
      category: 'Hardware',
      featured: true,
      icon: <GiLaserWarning />,
      color: '#ff6b6b',
      features: [
        'Real-time IR detection',
        'LED visual indication',
        'Adjustable detection range',
        'Compact circuit design',
        'Low power consumption'
      ],
      metrics: {
        range: '10m',
        response: '<50ms',
        accuracy: '95%'
      },
      outcome: 'Successfully built a functional IR testing device capable of detecting infrared signals with high accuracy.',
      githubUrl: '#',
      demoUrl: '#',
      status: 'completed',
      year: '2023'
    },
    {
      id: 2,
      title: 'Interest Calculator for Bank Deposits',
      shortTitle: 'Bank Interest Calc',
      description: 'Java-based application that calculates interest amount based on the type of bank account.',
      fullDescription: 'A comprehensive Java application designed for banking purposes that calculates interest amounts based on various account types including Savings, Fixed Deposits, and Recurring Deposits. The calculator supports different interest rates and compounding periods for accurate financial calculations.',
      technologies: ['Java', 'JavaFX', 'Financial Algorithms', 'OOP'],
      category: 'Finance',
      featured: true,
      icon: <FaCalculator />,
      color: '#4ecdc4',
      features: [
        'Multiple account type support',
        'Compound interest calculations',
        'Simple interest calculations',
        'Customizable interest rates',
        'Detailed calculation breakdown'
      ],
      metrics: {
        accuracy: '100%',
        accounts: '5 types',
        speed: '< 1ms'
      },
      outcome: 'Developed a reliable interest calculation tool that handles various banking scenarios with 100% accuracy.',
      githubUrl: '#',
      demoUrl: '#',
      status: 'completed',
      year: '2023'
    },
    {
      id: 3,
      title: 'Multiple Choice Test Platform',
      shortTitle: 'MCQ Platform',
      description: 'Java Swing application that evaluates multiple choice questions and provides the count of correct answers.',
      fullDescription: 'An interactive test platform built using Java Swing that presents multiple choice questions to users and automatically evaluates their responses. The system tracks correct answers, provides instant feedback, and displays the final score upon completion.',
      technologies: ['Java', 'Java Swing', 'GUI Design', 'Event Handling'],
      category: 'Education',
      featured: true,
      icon: <MdQuiz />,
      color: '#a855f7',
      features: [
        'Interactive quiz interface',
        'Automatic answer evaluation',
        'Score tracking and display',
        'Question navigation',
        'Results summary'
      ],
      metrics: {
        questions: 'Unlimited',
        feedback: 'Instant',
        UI: 'Interactive'
      },
      outcome: 'Created an efficient testing platform that streamlines the process of conducting and evaluating MCQ-based assessments.',
      githubUrl: '#',
      demoUrl: '#',
      status: 'completed',
      year: '2023'
    },
    {
      id: 4,
      title: 'IoT Based Patient Monitoring System',
      shortTitle: 'Patient Monitor',
      description: 'Arduino & NodeMCU based system to monitor patient temperature and pulse via smartphone application.',
      fullDescription: 'A comprehensive IoT healthcare solution that utilizes Arduino Uno and NodeMCU to continuously monitor patient vital signs including body temperature and pulse rate. The collected data is transmitted wirelessly and can be viewed in real-time through a dedicated smartphone application, enabling remote patient monitoring.',
      technologies: ['Arduino Uno', 'NodeMCU', 'IoT', 'C++', 'Sensors', 'Mobile App'],
      category: 'IoT',
      featured: true,
      icon: <FaHeartbeat />,
      color: '#00d4ff',
      features: [
        'Real-time temperature monitoring',
        'Pulse rate measurement',
        'Wireless data transmission',
        'Smartphone app integration',
        'Alert notifications',
        'Data logging'
      ],
      metrics: {
        latency: '<100ms',
        accuracy: '97%',
        range: '50m WiFi'
      },
      outcome: 'Successfully developed an IoT-based monitoring system enabling healthcare providers to remotely track patient vitals in real-time.',
      githubUrl: '#',
      demoUrl: '#',
      status: 'completed',
      year: '2024'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: <FaCode />, count: projects.length },
    { id: 'Hardware', name: 'Hardware', icon: <FaMicrochip />, count: projects.filter(p => p.category === 'Hardware').length },
    { id: 'Finance', name: 'Finance', icon: <FaChartLine />, count: projects.filter(p => p.category === 'Finance').length },
    { id: 'Education', name: 'Education', icon: <FaGraduationCap />, count: projects.filter(p => p.category === 'Education').length },
    { id: 'IoT', name: 'IoT', icon: <HiChip />, count: projects.filter(p => p.category === 'IoT').length },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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

    return () => observer.disconnect();
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: '#4ade80',
      'in-progress': '#ffd93d',
      planned: '#00d4ff'
    };
    return colors[status] || '#4ade80';
  };

  // Background particles
  const bgParticles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${5 + Math.random() * 5}s`
  }));

  return (
    <section 
      id="projects" 
      className={`section projects ${isVisible ? 'visible' : ''}`}
      ref={sectionRef}
    >
      {/* Background Effects */}
      <div className="projects-bg-effects">
        <div className="grid-pattern"></div>
        <div className="floating-shapes">
          {bgParticles.map(p => (
            <div 
              key={p.id} 
              className="shape-particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                animationDuration: p.duration
              }}
            />
          ))}
        </div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="header-content">
            <span className="section-badge">
              <FaRocket /> My Work
            </span>
            <h2 className="section-title glow-text">
              Featured Projects
            </h2>
            <div className="title-decoration">
              <span className="decoration-line"></span>
              <span className="decoration-icon"><HiSparkles /></span>
              <span className="decoration-line"></span>
            </div>
            <p className="section-subtitle">
              A collection of projects showcasing my expertise in hardware development, 
              software engineering, and IoT solutions
            </p>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="projects-controls">
          {/* Search Bar */}
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="search-clear"
                onClick={() => setSearchTerm('')}
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="filter-icon">{cat.icon}</span>
                <span className="filter-name">{cat.name}</span>
                <span className="filter-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card ${project.featured ? 'featured' : ''}`}
              style={{ 
                '--card-color': project.color,
                '--animation-delay': `${index * 0.1}s`
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => openModal(project)}
            >
              <div className="card-glow"></div>
              
              {/* Status Badge */}
              <div 
                className="project-status"
                style={{ '--status-color': getStatusColor(project.status) }}
              >
                <span className="status-dot"></span>
                <span className="status-text">{project.status}</span>
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="featured-badge">
                  <FaStar /> Featured
                </div>
              )}

              {/* Project Header */}
              <div className="project-header">
                <div className="project-icon" style={{ color: project.color }}>
                  {project.icon}
                </div>
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span className="project-year">{project.year}</span>
                </div>
              </div>

              {/* Project Content */}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              {/* Key Metrics */}
              {project.metrics && (
                <div className="project-metrics">
                  {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="metric-item">
                      <span className="metric-value">{value}</span>
                      <span className="metric-label">{key}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              <div className="project-tech">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Card Footer */}
              <div className="project-footer">
                <button className="view-btn">
                  <FaEye /> View Details
                </button>
                <div className="project-links">
                  <a 
                    href={project.githubUrl} 
                    className="link-icon"
                    onClick={(e) => e.stopPropagation()}
                    title="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a 
                    href={project.demoUrl} 
                    className="link-icon"
                    onClick={(e) => e.stopPropagation()}
                    title="Demo"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="no-results">
            <FaSearch className="no-results-icon" />
            <h3>No projects found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setActiveCategory('all');
                setSearchTerm('');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Statistics Section */}
        <div className="projects-stats">
          <div className="stat-card">
            <FaCode className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">{projects.length}</span>
              <span className="stat-label">Projects</span>
            </div>
          </div>
          <div className="stat-card">
            <FaTrophy className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">{projects.filter(p => p.featured).length}</span>
              <span className="stat-label">Featured</span>
            </div>
          </div>
          <div className="stat-card">
            <FaCog className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">12+</span>
              <span className="stat-label">Technologies</span>
            </div>
          </div>
          <div className="stat-card">
            <FaChartLine className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">100%</span>
              <span className="stat-label">Completion</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="projects-cta">
          <HiSparkles className="cta-icon" />
          <h3>Want to see more?</h3>
          <p>Check out my GitHub profile for all projects and contributions</p>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
          >
            <FaGithub /> Visit My GitHub
          </a>
        </div> */}
      </div>

      {/* Project Modal */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={closeModal} 
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="project-details">
            {/* Modal Header */}
            <div className="modal-header-badges">
              <span className="badge category" style={{ background: selectedProject.color }}>
                {selectedProject.category}
              </span>
              {selectedProject.featured && (
                <span className="badge featured">
                  <FaStar /> Featured
                </span>
              )}
              <span className="badge status">
                {selectedProject.status}
              </span>
            </div>
            
            {/* Overview */}
            <div className="detail-section">
              <h4><FaInfoCircle /> Overview</h4>
              <p>{selectedProject.fullDescription}</p>
            </div>

            {/* Features */}
            <div className="detail-section">
              <h4><FaCheckCircle /> Key Features</h4>
              <ul className="feature-list">
                {selectedProject.features.map((feature, idx) => (
                  <li key={idx}>
                    <FaCheckCircle className="check-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics */}
            {selectedProject.metrics && (
              <div className="detail-section">
                <h4><FaChartLine /> Performance Metrics</h4>
                <div className="metrics-grid">
                  {Object.entries(selectedProject.metrics).map(([key, value]) => (
                    <div key={key} className="metric-box">
                      <span className="metric-num">{value}</span>
                      <span className="metric-key">{key}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="detail-section">
              <h4><FaCode /> Technologies</h4>
              <div className="tech-list">
                {selectedProject.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Outcome */}
            <div className="detail-section">
              <h4><FaLightbulb /> Project Outcome</h4>
              <div className="outcome-box">
                {selectedProject.outcome}
              </div>
            </div>

            {/* Actions */}
            {/* <div className="modal-actions">
              <a href={selectedProject.githubUrl} className="btn btn-primary">
                <FaGithub /> View Code
              </a>
              <a href={selectedProject.demoUrl} className="btn btn-secondary">
                <FaExternalLinkAlt /> Live Demo
              </a>
            </div> */}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Projects;