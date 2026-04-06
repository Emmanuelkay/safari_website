import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Phone } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Safaris', href: '#packages' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Wildlife', href: '#wildlife' },
    { name: 'Add-Ons', href: '#addons' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-700 px-10 py-6 flex justify-between items-center",
      isScrolled ? "bg-white/90 backdrop-blur-md border-b border-gold/10 py-4 shadow-sm" : "bg-transparent"
    )}>
      {/* Logo */}
      <a href="/" className={cn(
        "text-3xl font-heading tracking-tighter transition-colors",
        isScrolled ? "text-charcoal" : "text-ivory"
      )}>
        Savanna<span className="text-gold">&Beyond</span>
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-10 items-center">
        {navLinks.map(link => (
          <a 
            key={link.name}
            href={link.href}
            className={cn(
              "text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-gold",
              isScrolled ? "text-charcoal/60" : "text-ivory/80"
            )}
          >
            {link.name}
          </a>
        ))}
        
        <a 
          href="#booking" 
          className={cn(
            "px-6 py-3 rounded-custom text-[10px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95",
            isScrolled 
              ? "bg-gold text-charcoal hover:bg-charcoal hover:text-ivory" 
              : "bg-ivory/10 text-ivory border border-ivory/20 hover:bg-gold hover:text-charcoal hover:border-gold"
          )}
        >
          Book Now
        </a>
      </div>

      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={cn(
          "md:hidden p-2 transition-colors",
          isScrolled ? "text-charcoal" : "text-ivory"
        )}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-charcoal z-[-1] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {navLinks.map(link => (
          <a 
            key={link.name}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-heading text-ivory hover:text-gold transition-colors"
          >
            {link.name}
          </a>
        ))}
        <a 
          href="#booking"
          onClick={() => setIsMenuOpen(false)}
          className="mt-4 bg-gold text-charcoal px-10 py-5 rounded-custom font-bold uppercase tracking-widest text-xs"
        >
          Secure Booking
        </a>
      </div>
    </nav>
  );
};

