import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

export const PersistentBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-10 right-10 z-[1000] flex items-center gap-4 group">
      {/* Tooltip */}
      <div 
        className={cn(
          "bg-white text-charcoal px-4 py-2 rounded-custom shadow-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 transform origin-right whitespace-nowrap",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        )}
      >
        Chat with our Nairobi team
      </div>

      {/* Floating Button */}
      <a 
        href="https://wa.me/254718592358?text=Hi%20Savanna%20%26%20Beyond,%20I'd%20like%20to%20inquire%20about%20a%20safari."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-16 h-16 bg-gold text-charcoal rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(197,160,89,0.4)] hover:bg-white hover:scale-110 transition-all duration-500 group-hover:rotate-12"
      >
        <MessageSquare size={28} className="animate-pulse" />
      </a>
    </div>
  );
};
