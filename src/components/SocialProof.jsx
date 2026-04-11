import React from 'react';
import { useTranslation } from 'react-i18next';

const reviews = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

export const SocialProof = () => {
  const { t } = useTranslation();
  // Duplicate for seamless loop
  const allReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-ivory overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading text-charcoal">{t('common.travelerStories')}</h2>
      </div>

      <div className="flex gap-8 animate-scroll hover:pause-animation">
        {allReviews.map((review, idx) => {
          const quote = t(`testimonials.t${review.id}.quote`);
          const author = t(`testimonials.t${review.id}.author`);
          const location = t(`testimonials.t${review.id}.location`);
          const trip = t(`testimonials.t${review.id}.trip`);
          
          return (
            <div 
              key={idx} 
              className="flex-shrink-0 w-[350px] md:w-[450px] bg-white p-10 rounded-custom border border-zinc-100 border-l-4 border-l-gold group hover:shadow-lg transition-all"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 bg-ochre rounded-full" />
                ))}
              </div>
              <p className="text-lg italic text-charcoal leading-relaxed mb-8 opacity-90">
                "{quote}"
              </p>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                {author} · {location}
                <span className="block mt-1 font-medium text-zinc-300 normal-case tracking-normal">{trip}</span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
