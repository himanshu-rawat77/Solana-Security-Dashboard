import { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      
      // Randomly choose particle type
      const particleType = Math.random() > 0.7 ? 'data' : 'glow';
      
      if (particleType === 'data') {
        // Data-like particles (0s and 1s, or hex)
        particle.textContent = Math.random() > 0.5 ? 
          (Math.random() > 0.5 ? '0' : '1') : 
          Math.floor(Math.random() * 16).toString(16);
        particle.className = 'absolute pointer-events-none font-mono text-xs';
        particle.style.color = Math.random() > 0.7 ? 
          'rgba(153, 69, 255, 0.3)' : // Purple
          (Math.random() > 0.5 ? 
            'rgba(0, 255, 255, 0.3)' : // Cyan
            'rgba(66, 255, 0, 0.2)'); // Green
      } else {
        // Glowing dot particles
        particle.className = 'absolute rounded-full pointer-events-none';
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = Math.random() > 0.7 ? 
          'rgba(153, 69, 255, 0.4)' : // Purple
          (Math.random() > 0.5 ? 
            'rgba(0, 255, 255, 0.4)' : // Cyan
            'rgba(66, 255, 0, 0.3)'); // Green
      }
      
      // Common styles
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      particle.style.animation = `flow ${Math.random() * 15 + 10}s linear forwards`;
      
      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 25000);
    };

    // Create initial batch of particles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createParticle(), i * 100);
    }

    const interval = setInterval(() => {
      createParticle();
    }, 300);

    return () => {
      clearInterval(interval);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
};