import React, { useState, useEffect, useRef } from 'react';
import AIOrb from '../components/AIOrb';
import { GlassCard, GlassInput, GlassButton } from '../components/GlassUI';
import { ArrowRight, Fingerprint, Lock, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orbState, setOrbState] = useState<'idle' | 'listening' | 'thinking'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = clientX / innerWidth;
      const y = clientY / innerHeight;
      
      containerRef.current.style.setProperty('--mouse-x', x.toString());
      containerRef.current.style.setProperty('--mouse-y', y.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setOrbState('thinking');

    // Simulate Auth Delay
    setTimeout(() => {
      onLogin({
        id: '1',
        name: 'Alex Sterling',
        email: email || 'alex@skillmirror.ai',
      });
    }, 2000);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setOrbState('thinking');
    
    // Faster entry for guest
    setTimeout(() => {
        onLogin({
            id: 'guest',
            name: 'Guest Explorer',
            email: 'guest@skillmirror.ai',
            avatar: undefined
        });
    }, 1000);
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background"
      style={{
        '--mouse-x': '0.5',
        '--mouse-y': '0.5',
      } as React.CSSProperties}
    >
      {/* Cursor Tracking Spotlight Effect */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `
            radial-gradient(
              1000px circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), 
              hsla(calc(var(--mouse-x) * 60 + 200), 80%, 60%, 0.15),
              transparent 40%
            )
          `
        }}
      />

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
         
         {/* Additional Depth Elements - Moving slightly opposite to mouse for parallax */}
         <div 
            className="absolute top-[20%] right-[20%] w-64 h-64 bg-violet-500/5 rounded-full blur-[80px]"
            style={{ transform: 'translate(calc(var(--mouse-x) * -20px), calc(var(--mouse-y) * -20px))', transition: 'transform 0.2s ease-out' }}
         ></div>
         <div 
            className="absolute bottom-[20%] left-[20%] w-64 h-64 bg-teal-500/5 rounded-full blur-[80px]"
            style={{ transform: 'translate(calc(var(--mouse-x) * 20px), calc(var(--mouse-y) * 20px))', transition: 'transform 0.2s ease-out' }}
         ></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 flex flex-col items-center perspective-1000">
        
        {/* 3D Orb Centerpiece */}
        <div className="mb-8 relative w-48 h-48 flex items-center justify-center transition-transform duration-700 hover:scale-105">
          <AIOrb state={orbState} scale={1.5} />
          {/* Floor Reflection Simulation */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-4 bg-blue-500/20 blur-xl rounded-[100%]"></div>
        </div>

        <GlassCard 
            className="w-full backdrop-blur-2xl bg-slate-900/60 border-slate-700/50 shadow-2xl animate-float" 
            style={{ 
                animationDuration: '8s',
                transform: 'rotateX(calc((var(--mouse-y) - 0.5) * -2deg)) rotateY(calc((var(--mouse-x) - 0.5) * 2deg))',
                transition: 'transform 0.1s ease-out'
            }}
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-2">
              SkillMirror AI
            </h1>
            <p className="text-gray-400 text-sm">Reflect. Improve. Master Your Skills.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <GlassInput 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if(e.target.value.length > 0) setOrbState('listening');
                    else setOrbState('idle');
                }}
                onBlur={() => setOrbState('idle')}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <GlassInput 
                type="password" 
                placeholder="Password" 
                required
                disabled={isLoading}
                onFocus={() => setOrbState('listening')}
                onBlur={() => setOrbState('idle')}
              />
            </div>

            <GlassButton 
                type="submit"
                variant="primary" 
                className="w-full justify-center mt-6 h-12"
                icon={isLoading ? Lock : ArrowRight}
                disabled={isLoading}
            >
              {isLoading ? 'Verifying Securely...' : 'Initialize Session'}
            </GlassButton>
          </form>

          <div className="mt-8 mb-4 relative">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
             </div>
             <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0f1524] px-4 text-gray-500 tracking-widest">Access Options</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <GlassButton 
                type="button" 
                variant="secondary" 
                className="justify-center text-sm h-10" 
                icon={Fingerprint}
                disabled={isLoading}
             >
                 Google
             </GlassButton>
             <GlassButton 
                type="button" 
                variant="secondary" 
                onClick={handleGuestLogin}
                className="justify-center text-sm h-10" 
                icon={UserIcon}
                disabled={isLoading}
             >
                 Guest Mode
             </GlassButton>
          </div>
          
          <div className="mt-8 text-center opacity-60 hover:opacity-100 transition-opacity">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">
               End-to-End Encrypted &bull; v3.0.0
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;