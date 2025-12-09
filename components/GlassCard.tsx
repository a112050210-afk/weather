import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

// Implements the "Glassmorphism" effect specified in the PDF
// bg-white/10 (semi-transparent), backdrop-blur-md (blur behind), border-white/20 (crisp edge)
export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl ${className}`}>
      {children}
    </div>
  );
};
