import React from 'react';
import { Camera, Globe, Share2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-charcoal text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="flex flex-col gap-6">
            <a href="#" className="font-heading text-3xl font-bold text-ivory">
              Savanna<span className="text-ochre">&Beyond</span>
            </a>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[250px]">
              Crafting honest, expert-guided journeys into the heart of Kenya. No middlemen. Just the plains.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-ochre transition-all"><Camera size={18} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-ochre transition-all"><Globe size={18} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-ochre transition-all"><Share2 size={18} /></a>
            </div>
          </div>

          <div>
             <h4 className="font-heading text-xl text-sand uppercase tracking-widest mb-6 font-semibold">Explore</h4>
             <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-ochre">Destinations</a></li>
                <li><a href="#" className="hover:text-ochre">Wildlife Spotlight</a></li>
                <li><a href="#" className="hover:text-ochre">Safari Packages</a></li>
                <li><a href="#" className="hover:text-ochre">City Tours</a></li>
                <li><a href="#" className="hover:text-ochre">Luxury Stays</a></li>
             </ul>
          </div>

          <div>
             <h4 className="font-heading text-xl text-sand uppercase tracking-widest mb-6 font-semibold">Plan</h4>
             <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-ochre">How It Works</a></li>
                <li><a href="#" className="hover:text-ochre">Trip Add-Ons</a></li>
                <li><a href="#" className="hover:text-ochre">Group Bookings</a></li>
                <li><a href="#" className="hover:text-ochre">Custom Itineraries</a></li>
                <li><a href="#" className="hover:text-ochre">FAQs</a></li>
             </ul>
          </div>

          <div>
             <h4 className="font-heading text-xl text-sand uppercase tracking-widest mb-6 font-semibold">Company</h4>
             <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-ochre">About Us</a></li>
                <li><a href="#" className="hover:text-ochre">Conservation Impact</a></li>
                <li><a href="#" className="hover:text-ochre">Our Guides</a></li>
                <li><a href="#" className="hover:text-ochre">Travel Blog</a></li>
                <li><a href="#" className="hover:text-ochre">Contact Us</a></li>
             </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] uppercase tracking-widest text-zinc-500 font-bold">
           <span>&copy; 2026 Savanna & Beyond Expeditions Ltd. Nairobi, Kenya. Licensed by KATO.</span>
           <div className="flex gap-8">
              <a href="#" className="hover:text-ivory">Privacy Policy</a>
              <a href="#" className="hover:text-ivory">Booking Terms</a>
           </div>
        </div>
      </div>
    </footer>
  );
};
