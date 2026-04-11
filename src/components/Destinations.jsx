import React from 'react';
import { cn } from '../lib/utils';
import { Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const destinations = [
  { id: 1, image: "/dest_mara.webp" },
  { id: 2, image: "/dest_amboseli.webp" },
  { id: 3, image: "/dest_naivasha.webp" },
  { id: 4, image: "/dest_samburu.webp" },
  { id: 5, image: "/dest_watamu.webp" },
  { id: 6, image: "/dest_nairobi.webp" },
];

export const Destinations = () => {
  const { t } = useTranslation();

  return (
    <section id="destinations" className="py-32 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block">{t('common.explorersCompass')}</span>
            <h2 className="text-6xl md:text-7xl font-heading text-charcoal mb-0">{t('common.ourTerritories')}</h2>
          </div>
          <div className="flex items-center gap-6 text-charcoal/40 font-body text-sm mb-4">
             <Compass size={24} className="text-gold" />
             <p className="max-w-[280px]">{t('common.territoryDesc')}</p>
          </div>
        </div>

        {/* Horizontal Scroll on Mobile / Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-10 md:pb-0 scrollbar-hide snap-x select-none">
          {destinations.map((dest, idx) => {
            const name = t(`destinations.d${dest.id}.name`);
            const tag = t(`destinations.d${dest.id}.tag`);
            
            return (
              <div 
                key={idx} 
                className="relative min-w-[300px] md:min-w-0 aspect-[4/5] rounded-custom overflow-hidden group shadow-2xl snap-center"
              >
                <img
                  src={dest.image}
                  alt={name}
                  loading="lazy"
                  width={400}
                  height={500}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/80 opacity-80 group-hover:opacity-60 transition-opacity z-10" />
                
                <div className="absolute bottom-10 left-10 z-20 group-hover:-translate-y-2 transition-transform duration-500">
                   <span className="text-gold font-bold text-[10px] uppercase tracking-[0.4em] block mb-3">{tag}</span>
                   <h3 className="text-4xl text-ivory font-heading tracking-wide leading-tight">{name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

