import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[150] bg-charcoal/95 backdrop-blur-md border-t border-gold/10 px-6 py-5 animate-in slide-in-from-bottom-4 duration-500"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-ivory/70 text-sm font-body leading-relaxed flex-1">
          We use local storage to remember your language preference. No tracking cookies are used.
          See our <a href="/privacy" className="text-gold hover:underline">Privacy Policy</a> for details.
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={accept}
            className="bg-gold text-charcoal px-6 py-2.5 rounded-custom text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-ivory transition-colors"
          >
            Got it
          </button>
          <button
            onClick={accept}
            aria-label="Close cookie notice"
            className="text-ivory/40 hover:text-ivory transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
