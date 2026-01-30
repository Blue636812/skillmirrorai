import React from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export const GlassCard = ({ children, className = '', onClick, ...props }: GlassCardProps) => (
  <div 
    onClick={onClick}
    className={`glass-panel rounded-2xl p-6 shadow-lg border border-white/5 hover:border-white/20 transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const GlassButton = ({ 
  children, 
  variant = 'primary', 
  className = '',
  icon: Icon,
  disabled,
  ...props
}: GlassButtonProps) => {
  const baseStyles = "relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group";
  
  const variants = {
    primary: "bg-blue-600/20 hover:bg-blue-600/40 text-blue-100 border border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30",
    danger: "bg-red-500/10 hover:bg-red-500/30 text-red-200 border border-red-500/30"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon size={18} className="group-hover:rotate-12 transition-transform" />}
        {children}
      </span>
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      )}
    </button>
  );
};

export const GlassInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    {...props}
    className={`w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 glass-input ${props.className || ''}`}
  />
);