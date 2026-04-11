import React from 'react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

const animals = [
  { id: 1, rarity: 2, image: "/wildlife_lion.webp" },
  { id: 2, rarity: 4, image: "/wildlife_leopard.webp" },
  { id: 3, rarity: 1, image: "/wildlife_elephant.webp" },
  { id: 4, rarity: 5, image: "/wildlife_rhino.webp" },
  { id: 5, rarity: 2, image: "/wildlife_buffalo.webp" },
  { id: 6, rarity: 4, image: "/wildlife_cheetah.webp" },
  { id: 7, rarity: 1, image: "/wildlife_wildebeest.webp" },
  { id: 8, rarity: 3, image: "/wildlife_giraffe.webp" },
];

const RarityDots = ({ count }) => (
  <div className="flex gap-2">
    {[...Array(5)].map((_, i) => (
      <div 
        key={i} 
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          i < count ? "bg-gold" : "bg-gold/10"
        )}
      />
    ))}
  </div>
);

export const WildlifeTracker = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block">{t('common.fieldJournal')}</span>
            <h2 className="text-6xl md:text-7xl font-heading text-charcoal mb-0 leading-tight">{t('common.bigFiveHeader')}</h2>
          </div>
          <p className="text-charcoal/60 max-w-sm font-body text-sm leading-relaxed border-l border-gold/20 pl-8 pb-2">
            {t('common.rarityDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 border border-gold/10">
          {animals.map((animal, idx) => {
            const name = t(`wildlife.w${animal.id}.name`);
            const subtitle = t(`wildlife.w${animal.id}.subtitle`);
            const desc = t(`wildlife.w${animal.id}.desc`);
            
            return (
              <div key={idx} className="bg-ivory p-12 hover:bg-white transition-colors duration-500 group relative">
                <div className="mb-10 relative w-32 h-32 rounded-full overflow-hidden border border-gold/10 group-hover:border-gold transition-colors duration-700 mx-auto md:mx-0">
                  <img
                    src={animal.image}
                    alt={name}
                    loading="lazy"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                  />
                </div>

                <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-4 block">{subtitle}</span>
                <h3 className="text-4xl font-heading text-charcoal mb-6 tracking-tight group-hover:text-gold transition-colors duration-500">{name}</h3>
                <p className="text-charcoal/50 text-xs leading-relaxed mb-10 font-body">{desc}</p>
                
                <div className="flex items-center justify-between mt-auto pt-8 border-t border-gold/5">
                  <span className="text-[9px] font-bold text-charcoal/40 uppercase tracking-widest">{t('common.rarityScore')}</span>
                  <RarityDots count={animal.rarity} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

