import React from 'react';

const reviews = [
  {
    quote: "We had done plenty of international trips before but always booked ourselves. We were nervous to use an agency. Within 10 minutes of our WhatsApp call with the team we knew we were in safe hands. The Mara blew every expectation.",
    author: "James & Rachel T.",
    location: "UK",
    trip: "Maasai Mara Weekend Escape"
  },
  {
    quote: "The guide, Peter, knew every animal individually. He found us a leopard in the Samburu that three other vehicles had missed. That moment alone was worth the entire trip.",
    author: "Sofia M.",
    location: "Germany",
    trip: "Full Kenya Journey"
  },
  {
    quote: "I came alone and was genuinely worried about the solo supplement on other sites. Savanna and Beyond were transparent from the first message. No hidden costs. No pressure. Just an incredible 5 days.",
    author: "Daniel O.",
    location: "USA",
    trip: "Mara & Naivasha Explorer"
  },
  {
    quote: "The Mombasa day tour was the best decision we made. Fort Jesus, the dhow at sunset, the biryani lunch — our guide Ibrahim made the whole city feel like a story he was telling just for us.",
    author: "Priya K.",
    location: "India",
    trip: "Mombasa Old Town & Coast"
  },
  {
    quote: "We were a group of four and got the group rate which made it genuinely affordable. The tented camp was simple but everything you need. We saw lions on the first afternoon.",
    author: "Anika & Group",
    location: "Netherlands",
    trip: "Maasai Mara Weekend"
  }
];

export const SocialProof = () => {
  // Duplicate for seamless loop
  const allReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-ivory overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading text-midnight">Traveler Stories</h2>
      </div>

      <div className="flex gap-8 animate-scroll hover:pause-animation">
        {allReviews.map((review, idx) => (
          <div 
            key={idx} 
            className="flex-shrink-0 w-[350px] md:w-[450px] bg-white p-10 rounded-custom border border-zinc-100 border-l-4 border-l-ochre group hover:shadow-lg transition-all"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 bg-ochre rounded-full" />
              ))}
            </div>
            <p className="text-lg italic text-charcoal leading-relaxed mb-8 opacity-90">
              "{review.quote}"
            </p>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              {review.author} · {review.location}
              <span className="block mt-1 font-medium text-zinc-300 normal-case tracking-normal">{review.trip}</span>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-382px * ${reviews.length})); } /* width + gap */
        }
        @media (min-width: 768px) {
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-482px * ${reviews.length})); }
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};
