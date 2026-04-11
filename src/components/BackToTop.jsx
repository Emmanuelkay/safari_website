import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-[90] bg-charcoal/80 backdrop-blur-sm text-ivory p-3 rounded-full shadow-lg hover:bg-gold hover:text-charcoal transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
    >
      <ChevronUp size={20} />
    </button>
  );
};
