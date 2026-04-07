import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Phone } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.safaris'), href: '/#packages' },
    { name: t('nav.destinations'), href: '/#destinations' },
    { name: t('nav.wildlife'), href: '/#wildlife' },
    { name: t('nav.addons'), href: '/#addons' },
    { name: t('nav.about'), href: '/about' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
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
      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link, i) => (
          <a 
            key={i}
            href={link.href}
            className={cn(
              "text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-gold",
              isScrolled ? "text-charcoal/60" : "text-ivory/80"
            )}
          >
            {link.name}
          </a>
        ))}

        <div className="relative group mx-2">
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-gold">
            <span className="text-sm">{languages.find(l => l.code === i18n.language)?.flag || '🇬🇧'}</span>
            <span>{languages.find(l => l.code === i18n.language)?.code || 'en'}</span>
          </button>
          
          <div className="absolute top-full right-0 mt-2 w-40 bg-charcoal/95 backdrop-blur-md border border-gold/20 rounded-custom opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden shadow-2xl">
            {languages.map((lng) => (
              <button
                key={lng.code}
                onClick={() => i18n.changeLanguage(lng.code)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors hover:bg-gold/10",
                  i18n.language === lng.code ? "text-gold bg-gold/5" : "text-ivory/80"
                )}
              >
                <span className="text-lg">{lng.flag}</span>
                <span>{lng.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <a 
          href="/#booking" 
          className={cn(
            "px-6 py-3 rounded-custom text-[10px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95",
            isScrolled 
              ? "bg-gold text-charcoal hover:bg-charcoal hover:text-ivory" 
              : "bg-ivory/10 text-ivory border border-ivory/20 hover:bg-gold hover:text-charcoal hover:border-gold"
          )}
        >
          {t('nav.bookNow')}
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
        "fixed inset-0 bg-charcoal z-[-1] flex flex-col items-center justify-center gap-6 transition-all duration-500 md:hidden",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {navLinks.map((link, i) => (
          <a 
            key={i}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-heading text-ivory hover:text-gold transition-colors"
          >
            {link.name}
          </a>
        ))}

        <div className="flex flex-col gap-4 mt-6 items-center w-full max-w-[200px]">
          {languages.map((lng) => (
            <button
              key={lng.code}
              onClick={() => {
                i18n.changeLanguage(lng.code);
                setIsMenuOpen(false);
              }}
              className={cn(
                "flex items-center justify-center gap-4 w-full py-2 px-4 rounded-custom transition-all",
                i18n.language === lng.code ? "bg-gold/20 text-gold" : "text-ivory/50 hover:bg-white/5 hover:text-ivory"
              )}
            >
              <span className="text-2xl">{lng.flag}</span>
              <span className="text-sm font-bold uppercase tracking-widest">{lng.name}</span>
            </button>
          ))}
        </div>

        <a 
          href="/#booking"
          onClick={() => setIsMenuOpen(false)}
          className="mt-6 bg-gold text-charcoal px-10 py-5 rounded-custom font-bold uppercase tracking-widest text-xs"
        >
          {t('nav.secureBooking')}
        </a>
      </div>
    </nav>
  );
};

