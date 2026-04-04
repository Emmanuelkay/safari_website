import React from 'react';

const animals = [
  { name: "Lion", rarity: 2, eyebrow: "The King of the Mara", desc: "Pride-based predators, best seen in the early morning or at dusk in the Maasai Mara.", image: "/wildlife_lion.png" },
  { name: "Leopard", rarity: 4, eyebrow: "The Silent Stalker", desc: "Elusive and solitary, usually spotted resting on acacia branches or in high grass.", image: "/wildlife_leopard.png" },
  { name: "African Elephant", rarity: 1, eyebrow: "The Gentle Giant", desc: "Massive herds roam Amboseli with Kilimanjaro providing a cinematic backdrop.", image: "/wildlife_elephant.png" },
  { name: "Black Rhinoceros", rarity: 5, eyebrow: "The Ancient Guardian", desc: "Extremely rare and endangered, best spotted in dedicated conservancies like Ol Pejeta.", image: "/wildlife_rhino.png" },
  { name: "Cape Buffalo", rarity: 2, eyebrow: "The Unpredictable One", desc: "One of the most dangerous of the Big Five, usually found in large, protective herds.", image: "/wildlife_buffalo.png" },
  { name: "Cheetah", rarity: 4, eyebrow: "The Sprint of the Plains", desc: "The world's fastest land animal, built for speed and spotted hunting in the high heat of the day.", image: "/wildlife_cheetah.png" },
  { name: "Wildebeest", rarity: 1, eyebrow: "The Great Migration", desc: "Millions of these 'gnus' cross the Mara River annually in the world's greatest wildlife spectacle.", image: "/wildlife_wildebeest.png" },
  { name: "Reticulated Giraffe", rarity: 3, eyebrow: "Samburu's Skyline", desc: "Distinctive geometric patterns distinguish this northern species from its southern cousins.", image: "/wildlife_giraffe.png" },
];

export const WildlifeTracker = () => {
  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-10">
        <div className="text-center mb-20">
          <span className="text-gold font-body text-[12px] font-bold tracking-[0.4em] uppercase mb-4 block">Species Spotlight</span>
          <h2 className="text-6xl md:text-7xl font-heading text-charcoal mb-6">The Big Five & Beyond</h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm leading-relaxed">Track your sightings with our rarity indexing, curated by our lead guides in Nairobi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {animals.map((animal, idx) => (
            <div key={idx} className="bg-white p-10 rounded-custom border border-zinc-100/50 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
              <div className="mb-8 relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold/20 group-hover:border-gold transition-colors">
                <img 
                  src={animal.image} 
                  alt={animal.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
              </div>

              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-3 block">{animal.eyebrow}</span>
              <h3 className="text-3xl font-heading text-charcoal mb-4 tracking-tight group-hover:text-gold transition-colors">{animal.name}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">{animal.desc}</p>
              
              <div className="flex items-center gap-5 mt-auto pt-6 border-t border-zinc-50">
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Rarity</span>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full ${i < animal.rarity ? 'bg-gold' : 'bg-zinc-100'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
