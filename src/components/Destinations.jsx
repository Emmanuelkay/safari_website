import React from 'react';
import { cn } from '../lib/utils';
import { Compass } from 'lucide-react';

const destinations = [
  { name: "Maasai Mara", tag: "The Big Five", image: "/dest_mara.png" },
  { name: "Amboseli", tag: "The Giants", image: "/dest_amboseli.png" },
  { name: "Lake Naivasha", tag: "The Rift Valley", image: "/dest_naivasha.png" },
  { name: "Samburu", tag: "The North", image: "/dest_samburu.png" },
  { name: "Watamu Coast", tag: "The Blue", image: "/dest_watamu.png" },
  { name: "Nairobi", tag: "The Capital", image: "/dest_nairobi.png" },
];

export const Destinations = () => {
  return (
    <section id="destinations" className="py-32 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block">Explorer's Compass</span>
            <h2 className="text-6xl md:text-7xl font-heading text-charcoal mb-0">Our Territories</h2>
          </div>
          <div className="flex items-center gap-6 text-charcoal/40 font-body text-sm mb-4">
             <Compass size={24} className="text-gold" />
             <p className="max-w-[280px]">We focus strictly on the most biodiverse regions of Kenya to guarantee the quality of your game drives.</p>
          </div>
        </div>

        {/* Horizontal Scroll on Mobile / Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-10 md:pb-0 scrollbar-hide snap-x select-none">
          {destinations.map((dest, idx) => (
            <div 
              key={idx} 
              className="relative min-w-[300px] md:min-w-0 aspect-[4/5] rounded-custom overflow-hidden group shadow-2xl snap-center"
            >
              <img 
                src={dest.image} 
                alt={dest.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/80 opacity-80 group-hover:opacity-60 transition-opacity z-10" />
              
              <div className="absolute bottom-10 left-10 z-20 group-hover:-translate-y-2 transition-transform duration-500">
                 <span className="text-gold font-bold text-[10px] uppercase tracking-[0.4em] block mb-3">{dest.tag}</span>
                 <h3 className="text-4xl text-ivory font-heading tracking-wide leading-tight">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

