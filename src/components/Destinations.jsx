import React from 'react';

const destinations = [
  { name: "Maasai Mara", tag: "The Big Five", popular: true, image: "/dest_mara.png" },
  { name: "Amboseli", tag: "The Giants", popular: false, image: "/dest_amboseli.png" },
  { name: "Lake Naivasha", tag: "The Rift Valley", popular: false, image: "/dest_naivasha.png" },
  { name: "Samburu", tag: "The North", popular: false, image: "/dest_samburu.png" },
  { name: "Watamu Coast", tag: "The Blue", popular: false, image: "/dest_watamu.png" },
  { name: "Nairobi", tag: "The Capital", popular: false, image: "/dest_nairobi.png" },
];

export const Destinations = () => {
  return (
    <section className="py-24 bg-[#f9f8f5]">
      <div className="max-w-7xl mx-auto px-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-gold font-body text-[12px] font-bold tracking-[0.4em] uppercase mb-4 block">Explorer's Compass</span>
            <h2 className="text-6xl md:text-7xl font-heading text-charcoal">Kenyan Highlights</h2>
          </div>
          <p className="text-zinc-500 max-w-sm mb-2 text-sm leading-relaxed">We focus strictly on the most biodiverse regions of Kenya to guarantee the quality of your game drives.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, idx) => (
            <div 
              key={idx} 
              className="relative aspect-[3/4] rounded-custom overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={dest.image} 
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/90 opacity-80 group-hover:opacity-70 transition-opacity z-10" />
              
              {dest.popular && (
                <span className="absolute top-6 right-6 bg-gold text-charcoal px-3 py-1.5 text-[10px] font-bold rounded-[4px] tracking-widest uppercase z-20 shadow-lg">Most Popular</span>
              )}

              <div className="absolute bottom-8 left-8 z-20 group-hover:-translate-y-2 transition-transform duration-500">
                 <span className="text-gold font-bold text-[10px] uppercase tracking-[0.3em] block mb-3">{dest.tag}</span>
                 <h3 className="text-4xl text-white font-heading tracking-wide">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
