import React from 'react';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-6">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Compass className="w-12 h-12 text-gold" />
        </div>
        <h1 className="text-7xl font-heading text-charcoal mb-4">404</h1>
        <h2 className="text-2xl font-heading text-charcoal mb-4">Trail Not Found</h2>
        <p className="text-zinc-500 mb-10 font-body leading-relaxed">
          This path doesn't lead anywhere in the savanna. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-3 bg-gold text-charcoal px-8 py-4 rounded-custom font-bold uppercase tracking-[0.2em] text-xs hover:-translate-y-0.5 transition-transform shadow-lg"
          >
            <ArrowLeft size={16} />
            Back to Home
          </a>
          <a
            href="https://wa.me/254718592358"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-charcoal text-charcoal px-8 py-4 rounded-custom font-bold uppercase tracking-[0.2em] text-xs hover:bg-charcoal hover:text-ivory transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};
