import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryLinks = [
    { name: 'Destinations', href: '#' },
    { name: 'Packages', href: '#packages' },
    { name: 'About', href: '#' },
  ];

  const secondaryLinks = [
    { name: 'Wildlife', href: '#' },
    { name: 'City Tours', href: '#' },
    { name: 'Stays', href: '#' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6",
        isScrolled ? "bg-charcoal/95 backdrop-blur-md shadow-2xl py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
        <a href="#" className="font-heading text-4xl font-bold text-ivory hover:text-white transition-colors tracking-tight">
          Savanna<span className="text-gold">&Beyond</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {primaryLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-ivory/80 hover:text-gold transition-all"
            >
              {link.name}
            </a>
          ))}
          
          {/* More Dropdown */}
          <div className="relative group">
            <button 
              className="flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] font-semibold text-ivory/80 hover:text-gold transition-all cursor-pointer"
              onMouseEnter={() => setIsMoreOpen(true)}
              onClick={() => setIsMoreOpen(!isMoreOpen)}
            >
              More <ChevronDown size={14} className={cn("transition-transform", isMoreOpen && "rotate-180")} />
            </button>
            
            <div 
              className={cn(
                "absolute top-full left-0 mt-4 w-48 bg-charcoal border border-white/10 rounded-custom shadow-2xl py-4 transition-all duration-300 transform origin-top-left",
                isMoreOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              )}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              {secondaryLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="block px-6 py-2.5 text-[11px] uppercase tracking-[0.1em] text-ivory/60 hover:text-gold hover:bg-white/5 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-8">
          <a href="#contact" className="bg-gold text-charcoal px-8 py-3 rounded-custom text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white transition-all shadow-lg">
            Plan My Trip
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-ivory" onClick={() => setIsMenuOpen(!isMoreOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};
