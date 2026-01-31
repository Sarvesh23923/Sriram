import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import NetworkSim from './components/Playground/NetworkSim';
import Certifications from './components/Certifications/Certifications';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import NetworkBackground from './components/UI/NetworkBackground';
import ScrollReveal from './components/UI/ScrollReveal';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2 className="glow-text-strong">INITIALIZING NETWORK...</h2>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <NetworkBackground />
      <Header />
      <main>
        <Hero />
        
        <ScrollReveal animation="fade-up">
          <About />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-up">
          <Experience />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-up">
          <Skills />
        </ScrollReveal>

        <ScrollReveal animation="fade-up">
          <NetworkSim />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-up">
          <Projects />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-up">
          <Certifications />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-up">
          <Education />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-up">
          <Contact />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}

export default App;
