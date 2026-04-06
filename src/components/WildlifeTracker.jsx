import React from 'react';
import { cn } from '../lib/utils';

const animals = [
  { name: "Lion", rarity: 2, subtitle: "The King of the Mara", desc: "Pride-based predators, best seen in the early morning or at dusk in the Maasai Mara.", image: "/wildlife_lion.png" },
  { name: "Leopard", rarity: 4, subtitle: "The Silent Stalker", desc: "Elusive and solitary, usually spotted resting on acacia branches or in high grass.", image: "/wildlife_leopard.png" },
  { name: "African Elephant", rarity: 1, subtitle: "The Gentle Giant", desc: "Massive herds roam Amboseli with Kilimanjaro providing a cinematic backdrop.", image: "/wildlife_elephant.png" },
  { name: "Black Rhinoceros", rarity: 5, subtitle: "The Ancient Guardian", desc: "Extremely rare and endangered, best spotted in dedicated conservancies like Ol Pejeta.", image: "/wildlife_rhino.png" },
  { name: "Cape Buffalo", rarity: 2, subtitle: "The Unpredictable One", desc: "One of the most dangerous of the Big Five, usually found in large, protective herds.", image: "/wildlife_buffalo.png" },
  { name: "Cheetah", rarity: 4, subtitle: "The Sprint of the Plains", desc: "The world's fastest land animal, built for speed and spotted hunting in the high heat of the day.", image: "/wildlife_cheetah.png" },
  { name: "Wildebeest", rarity: 1, subtitle: "The Great Migration", desc: "Millions of these 'gnus' cross the Mara River annually in the world's greatest wildlife spectacle.", image: "/wildlife_wildebeest.png" },
  { name: "Reticulated Giraffe", rarity: 3, subtitle: "Samburu's Skyline", desc: "Distinctive geometric patterns distinguish this northern species from its southern cousins.", image: "/wildlife_giraffe.png" },
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
  return (
    <section className="py-32 bg-ivory overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block">Field Journal</span>
            <h2 className="text-6xl md:text-7xl font-heading text-charcoal mb-0 leading-tight">The Big Five <br/> & Beyond</h2>
          </div>
          <p className="text-charcoal/60 max-w-sm font-body text-sm leading-relaxed border-l border-gold/20 pl-8 pb-2">
            Track your sightings with our rarity indexing, curated by our lead guides in Nairobi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 border border-gold/10">
          {animals.map((animal, idx) => (
            <div key={idx} className="bg-ivory p-12 hover:bg-white transition-colors duration-500 group relative">
              <div className="mb-10 relative w-32 h-32 rounded-full overflow-hidden border border-gold/10 group-hover:border-gold transition-colors duration-700 mx-auto md:mx-0">
                <img 
                  src={animal.image} 
                  alt={animal.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
              </div>

              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-4 block">{animal.subtitle}</span>
              <h3 className="text-4xl font-heading text-charcoal mb-6 tracking-tight group-hover:text-gold transition-colors duration-500">{animal.name}</h3>
              <p className="text-charcoal/50 text-xs leading-relaxed mb-10 font-body">{animal.desc}</p>
              
              <div className="flex items-center justify-between mt-auto pt-8 border-t border-gold/5">
                <span className="text-[9px] font-bold text-charcoal/40 uppercase tracking-widest">Rarity Score</span>
                <RarityDots count={animal.rarity} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

