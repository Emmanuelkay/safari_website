import React from 'react';
import { cn } from '../lib/utils';

export const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal text-center">
      {/* Cinematic Background Image */}
      <img 
        src="/hero_bg.png" 
        alt="Maasai Mara Golden Hour"
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom"
      />
      
      {/* Sophisticated Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-transparent to-black/80 z-10" />

      {/* Hero Content - Center Aligned */}
      <div className="relative z-20 container-custom max-w-5xl px-6 pt-20">
        <span className="text-gold font-body text-[12px] md:text-[14px] font-bold uppercase tracking-[0.5em] mb-8 block animate-in fade-in slide-in-from-bottom-4 duration-1000">
          The Pinnacle of African Exploration
        </span>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading text-white mb-10 leading-[0.85] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Unforgettable <br />
          <span className="italic font-light">Kenya</span>
        </h1>
        
        <p className="text-ivory/90 text-lg md:text-xl font-body max-w-2xl mx-auto mb-14 leading-relaxed tracking-wider font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          Expert-guided expeditions into the heart of the great migration. <br className="hidden md:block" />
          Discover the soul of the savanna through a lens of pure luxury.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600">
          <a href="#contact" className="w-full sm:w-auto bg-gold text-charcoal px-12 py-5 rounded-custom font-bold uppercase tracking-[0.25em] text-[11px] transition-all shadow-2xl hover:bg-white hover:-translate-y-1">
            Plan My Trip
          </a>
          
          <a href="#packages" className="w-full sm:w-auto border border-white/30 hover:border-white text-white px-12 py-5 rounded-custom font-bold uppercase tracking-[0.25em] text-[11px] transition-all backdrop-blur-sm hover:bg-white/10">
            See Our Packages
          </a>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/40 backdrop-blur-md hidden md:block z-20 animate-in fade-in duration-1000 delay-700">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex justify-between items-center text-[10px] text-ivory/70 uppercase tracking-widest font-bold">
          <span>KWS Certified</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <span>5.0 ★ Google</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <span>4 Destinations</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <span>24hr WhatsApp</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <span>100% Private Groups</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 30s ease-in-out infinite alternate;
        }
      `}} />
    </section>
  );
};
