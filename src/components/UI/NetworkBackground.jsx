import React, { useEffect, useRef } from 'react';
import './NetworkBackground.css';

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;
    let scrollY = window.scrollY;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
      }

      update() {
        // Movement based on time
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Parallax effect based on scroll
        // We add a slight offset based on scroll position to simulate depth
        const parallaxY = (scrollY * 0.2) % height;
        
        // Draw
        ctx.beginPath();
        ctx.arc(this.x, (this.y - parallaxY + height) % height, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff41';
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = Math.min(window.innerWidth * 0.05, 100); // Responsive count
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        const p1 = particles[i];
        const parallaxY = (scrollY * 0.2) % height;
        const p1y = (p1.y - parallaxY + height) % height;

        for (let j = i; j < particles.length; j++) {
          const p2 = particles[j];
          const p2y = (p2.y - parallaxY + height) % height;
          
          const dx = p1.x - p2.x;
          const dy = p1y - p2y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 65, ${1 - distance / 150})`;
            ctx.moveTo(p1.x, p1y);
            ctx.lineTo(p2.x, p2y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    handleResize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-background" />;
};

export default NetworkBackground;
