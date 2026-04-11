import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { ShieldCheck, Star, MapPin, MessageSquare, Users, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Hero = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trustItems = [
    { label: t('hero.trust1'), icon: <ShieldCheck size={14} /> },
    { label: t('hero.trust2'), icon: <Star size={14} /> },
    { label: t('hero.trust3'), icon: <MapPin size={14} /> },
    { label: t('hero.trust4'), icon: <MessageSquare size={14} /> },
    { label: t('hero.trust5'), icon: <Users size={14} /> },
  ];

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-300 ease-out"
        style={{ 
          backgroundImage: 'url("/hero_bg.webp")',
          transform: `translateY(${scrollY * 0.4}px) scale(1.1)`,
        }}
      />
      
      {/* Premium Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/80 via-charcoal/20 to-charcoal/90 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 container-custom text-center pt-20">
        <span className="text-gold font-body text-[11px] md:text-[13px] font-bold uppercase tracking-[0.4em] mb-8 block animate-in fade-in slide-in-from-bottom-4 duration-1500 text-center">
          {t('hero.subtitle')}
        </span>
        
        <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-heading text-ivory mb-10 leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1500 delay-300">
          {t('hero.title1')} <br />
          <span className="italic font-light opacity-90">{t('hero.title2')}</span>
        </h1>
        
        <p className="text-ivory/80 text-lg md:text-2xl font-body max-w-3xl mx-auto mb-16 leading-relaxed tracking-wide font-light animate-in fade-in slide-in-from-bottom-8 duration-1500 delay-500">
           {t('hero.desc')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1500 delay-700">
          <a href="/#booking" className="group w-full sm:w-auto bg-gold text-charcoal px-14 py-6 rounded-custom font-bold uppercase tracking-[0.3em] text-[12px] transition-all hover:bg-ivory hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-3">
            {t('hero.planTrips')} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href="https://wa.me/254718592358" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-ivory/30 bg-white/15 backdrop-blur-md text-ivory px-14 py-6 rounded-custom font-bold uppercase tracking-[0.3em] text-[12px] transition-all hover:bg-ivory/20 hover:border-ivory flex items-center justify-center gap-3"
          >
            {t('hero.whatsapp')}
          </a>
        </div>
      </div>

      {/* Animated Trust Bar */}
      <div className="absolute bottom-0 left-0 w-full z-30 border-t border-ivory/10 bg-charcoal/40 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-1000">
        <div className="max-w-[1440px] mx-auto px-10 py-6 overflow-hidden">
          <div className="flex justify-between items-center whitespace-nowrap animate-marquee md:animate-none">
            {trustItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-[10px] md:text-[11px] text-ivory/60 uppercase tracking-[0.2em] font-bold mx-6 md:mx-0">
                <span className="text-gold">{item.icon}</span>
                <span>{item.label}</span>
                {idx < trustItems.length - 1 && <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-gold/30 ml-10 lg:ml-16" />}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
