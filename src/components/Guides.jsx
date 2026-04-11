import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

const GuideCard = ({ id, guide, onOpenBio }) => {
  const { t } = useTranslation();
  
  // Elegant placeholders based on guide gender/style
  const placeholderImages = {
    james: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    klaus: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    amara: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    allan: "/guides/allan.webp",
    wei: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    nikolai: "/guides/nikolai.webp"
  };

  const flagEmojis = {
    English: "🇬🇧",
    German: "🇩🇪",
    French: "🇫🇷",
    Spanish: "🇪🇸",
    Mandarin: "🇨🇳",
    Russian: "🇷🇺"
  };

  return (
    <div 
      onClick={() => onOpenBio(id, guide)}
      className="flex-shrink-0 w-[280px] group cursor-pointer transition-all duration-500 hover:-translate-y-2"
    >
      <div className="relative mb-6">
        {/* Decorative Ring */}
        <div className="absolute -inset-2 border border-gold/20 rounded-full scale-90 group-hover:scale-100 transition-transform duration-700" />
        
        <div className="relative w-48 h-48 mx-auto overflow-hidden rounded-full border-2 border-gold/30">
          <img 
            src={placeholderImages[id] || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=400"} 
            alt={guide.name}
            loading="lazy"
            width={192}
            height={192}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
          />
        </div>
        
        {/* Language Badge */}
        <div className="absolute bottom-2 right-1/4 bg-charcoal/90 backdrop-blur-sm border border-gold/30 px-3 py-1 rounded-full flex items-center gap-2 shadow-xl">
          <span className="text-xs">{flagEmojis[guide.lang] || "🌍"}</span>
          <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{guide.lang}</span>
        </div>
      </div>

      <div className="text-center space-y-3">
        <h3 className="text-2xl font-heading text-ivory">{guide.name}</h3>
        <p className="text-sm font-body text-ivory/60 italic px-4 line-clamp-2">
          "{guide.quote}"
        </p>
        <div className="pt-2">
          <span className="text-[9px] font-bold text-gold/80 border border-gold/20 px-2 py-1 uppercase tracking-[0.2em]">
            {t('guides.privateTag')}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Guides = () => {
  const { t } = useTranslation();
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    if (!selectedGuide) return;
    const handleKey = (e) => { if (e.key === 'Escape') setSelectedGuide(null); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [selectedGuide]);

  const guideIds = ['james', 'klaus', 'amara', 'allan', 'wei', 'nikolai'];
  const guides = guideIds.map(id => ({
    id,
    ...t(`guides.team.${id}`, { returnObjects: true })
  }));

  return (
    <section id="guides" className="py-32 bg-[#1a1c18] relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-emerald-900/10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="w-[60px] h-px bg-gold mx-auto mb-10 opacity-50" />
          <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block">
            {t('guides.tag')}
          </span>
          <h2 className="text-5xl md:text-6xl font-heading text-ivory mb-8">
            {t('guides.title')}
          </h2>
          <p className="text-ivory/60 font-body text-lg leading-relaxed">
            {t('guides.desc')}
          </p>
        </div>

        {/* Guides Row - Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto pb-12 gap-8 md:gap-12 no-scrollbar scroll-smooth snap-x">
          {guides.map((guide) => (
            <GuideCard 
              key={guide.id} 
              id={guide.id}
              guide={guide} 
              onOpenBio={(id, data) => setSelectedGuide({ id, ...data })}
            />
          ))}
        </div>

        {/* Trust Footer */}
        <div className="mt-20 pt-10 border-t border-ivory/10 text-center">
          <p className="text-gold/60 font-body text-[11px] uppercase tracking-[0.3em] font-bold">
            {t('guides.trustLine')}
          </p>
        </div>
      </div>

      {/* Bio Modal */}
      {selectedGuide && (
        <div role="dialog" aria-modal="true" aria-label={`${selectedGuide.name} profile`} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-charcoal/95 backdrop-blur-md">
          <div className="bg-[#1a1c18] border border-gold/20 max-w-2xl w-full relative p-10 md:p-16 animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedGuide(null)}
              aria-label="Close guide profile"
              className="absolute top-6 right-6 text-gold/40 hover:text-gold transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
              <div className="w-40 h-40 rounded-full border-2 border-gold/30 overflow-hidden flex-shrink-0">
                 <img 
                   src={
                     {
                       james: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
                       klaus: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
                       amara: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
                       allan: "/guides/allan.webp",
                       wei: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
                       nikolai: "/guides/nikolai.webp"
                     }[selectedGuide.id]
                   } 
                   alt={selectedGuide.name}
                   loading="lazy"
                   className="w-full h-full object-cover"
                 />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-heading text-ivory mb-2">{selectedGuide.name}</h3>
                  <div className="flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-widest">
                    <span>{selectedGuide.lang}</span>
                    <span className="w-1 h-1 bg-gold/40 rounded-full" />
                    <span>{t('guides.experience')}</span>
                  </div>
                </div>

                <p className="text-2xl font-heading text-gold italic leading-relaxed">
                  "{selectedGuide.quote}"
                </p>

                <p className="text-ivory/60 font-body text-lg leading-relaxed">
                  {selectedGuide.bio}
                </p>

                <div className="pt-6">
                  <button 
                    onClick={() => {
                      setSelectedGuide(null);
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-gold text-charcoal px-10 py-4 font-bold text-[11px] uppercase tracking-widest hover:bg-ivory transition-colors duration-300"
                  >
                    {t('guides.requestGuide', { name: selectedGuide.name })}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
