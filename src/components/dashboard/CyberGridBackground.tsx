import * as React from 'react';

export const CyberGridBackground = () => {
  const [gridSize, setGridSize] = React.useState({ width: 0, height: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateGridSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setGridSize({ width, height });
      }
    };

    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    
    return () => {
      window.removeEventListener('resize', updateGridSize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-cyber-grid bg-grid animate-grid-scroll opacity-20"></div>
      <div className="absolute inset-0 bg-glitch-overlay mix-blend-overlay opacity-5"></div>
      
      {/* Matrix-style vertical text effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: Math.ceil(gridSize.width / 20) }).map((_, i) => (
          <div 
            key={i} 
            className="absolute top-0 text-hacker-green/10 text-xs font-mono whitespace-pre animate-matrix-flow"
            style={{
              left: `${i * 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 15}s`
            }}
          >
            {Array.from({ length: 100 }).map((_, j) => (
              String.fromCharCode(33 + Math.floor(Math.random() * 94))
            )).join('\n')}
          </div>
        ))}
      </div>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-hacker-purple/5 blur-3xl"></div>
      <div className="absolute top-3/4 -right-20 w-60 h-60 rounded-full bg-hacker-cyan/5 blur-3xl"></div>
    </div>
  );
};