import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setFormStatus('');
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'sriramkarthicksrinivasan@gmail.com',
      link: 'mailto:sriramkarthicksrinivasan@gmail.com',
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+91 95663 72158',
      link: 'tel:+919566372158',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Tamil Nadu, India',
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sriramkarthick-srinivasan-0b09b8212/',
    },
    // {
    //   icon: <FaGithub />,
    //   name: 'GitHub',
    //   url: 'https://github.com',
    // },
  ];

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title glow-text">Get In Touch</h2>
        <p className="section-description">
          Have a project in mind or want to discuss networking solutions? Feel free to reach out!
        </p>

        <div className="contact-content">
          <div className="contact-info-section">
            <div className="contact-intro card">
              <h3 className="glow-text">Let's Connect</h3>
              <p>
                I'm always open to discussing new projects, creative ideas, or opportunities
                to be part of your vision. Whether you need networking expertise, cloud
                solutions, or technical consultation, I'm here to help.
              </p>
            </div>

            <div className="contact-info-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-card card">
                  <div className="contact-info-icon">{info.icon}</div>
                  <div className="contact-info-content">
                    <h4>{info.title}</h4>
                    {info.link ? (
                      <a href={info.link}>{info.value}</a>
                    ) : (
                      <p>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links-section">
              <h4>Follow Me</h4>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-btn"
                    aria-label={social.name}
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <form className="contact-form card" onSubmit={handleSubmit}>
              <h3 className="glow-text">Send a Message</h3>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>

              {formStatus === 'success' && (
                <div className="form-success">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
