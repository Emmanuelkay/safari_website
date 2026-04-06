import React from 'react';
import { Mail, Phone, MapPin, Camera, Globe, Share2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-charcoal text-ivory py-32 px-10 border-t border-gold/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Brand & Mission */}
          <div className="lg:col-span-5">
            <h2 className="text-6xl font-heading mb-10 leading-tight">Savanna <br /> & Beyond</h2>
            <p className="max-w-sm text-ivory/50 font-body text-sm leading-relaxed mb-12">
              Nairobi-based, KWS-certified expedition company offering fully private Kenya safaris. Dedicated to conservation, local empowerment, and the quiet luxury of the wild.
            </p>
            <div className="flex gap-6">
              <div className="border border-ivory/10 px-4 py-2 rounded flex flex-col gap-1">
                <span className="text-[8px] font-bold text-gold uppercase tracking-widest">KWS License</span>
                <span className="text-[10px] font-bold text-ivory/40 uppercase">CERT-2026-942</span>
              </div>
              <div className="border border-ivory/10 px-4 py-2 rounded flex flex-col gap-1">
                <span className="text-[8px] font-bold text-gold uppercase tracking-widest">KATO Member</span>
                <span className="text-[10px] font-bold text-ivory/40 uppercase">REG-SNB-041</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-gold font-bold uppercase text-[11px] tracking-[0.3em] mb-10">Expeditions</h4>
            <ul className="space-y-6 text-[13px] text-ivory/60 font-body">
              <li><a href="#packages" className="hover:text-gold transition-colors">All Packages</a></li>
              <li><a href="#destinations" className="hover:text-gold transition-colors">Our Destinations</a></li>
              <li><a href="#wildlife" className="hover:text-gold transition-colors">Wildlife Guide</a></li>
              <li><a href="#booking" className="hover:text-gold transition-colors">Private Hire</a></li>
            </ul>
          </div>

          {/* HQ & Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-gold font-bold uppercase text-[11px] tracking-[0.3em] mb-10">Nairobi HQ</h4>
            <div className="space-y-8 text-[13px] text-ivory/60 font-body">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-gold flex-shrink-0" />
                <p>Wilson Airport Plaza V, Tower B<br />Langata Road, Nairobi, Kenya</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={18} className="text-gold" />
                <p>+254 718 592 358</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={18} className="text-gold" />
                <p>expeditions@savannabeyond.co.ke</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="lg:col-span-2">
            <h4 className="text-gold font-bold uppercase text-[11px] tracking-[0.3em] mb-10">Journal</h4>
            <div className="flex gap-6 text-ivory/40">
              <a href="#" className="hover:text-gold transition-colors"><Camera size={20} /></a>
              <a href="#" className="hover:text-gold transition-colors"><Globe size={20} /></a>
              <a href="#" className="hover:text-gold transition-colors"><Share2 size={20} /></a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-32 pt-12 border-t border-ivory/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-ivory/20">
          <p>© 2026 Savanna & Beyond. No middlemen. Just the plains.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-ivory transition-colors">Terms of Expedition</a>
            <a href="#" className="hover:text-ivory transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ivory transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

