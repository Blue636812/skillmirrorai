import React, { useRef, useEffect } from 'react';

interface AIOrbProps {
  state: 'idle' | 'listening' | 'speaking' | 'thinking';
  scale?: number;
}

const AIOrb: React.FC<AIOrbProps> = ({ state, scale = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    const particles: { x: number; y: number; r: number; speed: number; offset: number }[] = [];
    const particleCount = 60;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        offset: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Dynamic colors based on state
      let baseHue = 220; // Blue
      let intensity = 1;
      let rotationSpeed = 1;
      let pulseSpeed = 1;

      if (state === 'thinking') {
        baseHue = 270; // Violet
        rotationSpeed = 2;
        intensity = 1.2;
      } else if (state === 'listening') {
        baseHue = 170; // Teal
        pulseSpeed = 2;
        intensity = 1.1;
      } else if (state === 'speaking') {
        baseHue = 200; // Cyan
        pulseSpeed = 3;
        intensity = 1.3;
      }

      // Draw Orb Core
      const radius = 60 * scale + Math.sin(time * pulseSpeed) * (5 * scale);

      // Create gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius * 2);
      gradient.addColorStop(0, `hsla(${baseHue}, 80%, 60%, ${0.1 * intensity})`);
      gradient.addColorStop(0.5, `hsla(${baseHue}, 90%, 50%, ${0.05 * intensity})`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Rings
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.2 * rotationSpeed);
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * (1 + i * 0.3), radius * (0.8 - i * 0.1), time + i, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${baseHue + i * 20}, 70%, 60%, ${0.15 * intensity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      // Draw Particles forming a sphere-like shape
      particles.forEach((p, i) => {
        // Orbit logic
        const angle = p.offset + time * p.speed * rotationSpeed;
        const dist = radius * 1.2;
        
        // 3D projection approximation
        const x = centerX + Math.cos(angle) * dist * Math.sin(time * 0.5 + i);
        const y = centerY + Math.sin(angle) * dist;
        
        // Size variation based on "Z-depth"
        const z = Math.cos(time * 0.5 + i); 
        const s = p.r * scale * (z + 2) / 2;
        const alpha = (z + 1.5) / 3 * intensity;

        ctx.beginPath();
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${baseHue}, 90%, 70%, ${alpha})`;
        ctx.fill();
        
        // Connect close particles
        particles.forEach((p2, j) => {
           if (i === j) return;
           const dx = x - (centerX + Math.cos(p2.offset + time * p2.speed * rotationSpeed) * dist * Math.sin(time * 0.5 + j));
           const dy = y - (centerY + Math.sin(p2.offset + time * p2.speed * rotationSpeed) * dist);
           const d = Math.sqrt(dx*dx + dy*dy);
           
           if (d < 40 * scale) {
             ctx.beginPath();
             ctx.moveTo(x, y);
             ctx.lineTo(centerX + Math.cos(p2.offset + time * p2.speed * rotationSpeed) * dist * Math.sin(time * 0.5 + j), centerY + Math.sin(p2.offset + time * p2.speed * rotationSpeed) * dist);
             ctx.strokeStyle = `hsla(${baseHue}, 80%, 80%, ${0.1 * (1 - d/40)})`;
             ctx.lineWidth = 0.5;
             ctx.stroke();
           }
        });
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [state, scale]);

  return (
    <canvas 
      ref={canvasRef} 
      width={300 * scale} 
      height={300 * scale} 
      className="pointer-events-none"
    />
  );
};

export default AIOrb;