import React from 'react';

const tiers = [
  {
    tier: "Tier 1 — Comfort",
    desc: "Mid-range tented camps and lodges. Single or double occupancy en-suite facilities, full board dining, and an evening campfire under the stars. Featured in weekend packages and combo tours.",
    rate: "From $150 pp/night"
  },
  {
    tier: "Tier 2 — Premium",
    desc: "Boutique safari lodges with elevated architectural design. Private viewing decks, gourmet meals, and optional guided bush walks. Featured in 5 and 7-day extended packages.",
    rate: "From $280 pp/night"
  },
  {
    tier: "Tier 3 — Bespoke",
    desc: "Private villa buyouts, mobile explorer camps, and exclusive fly-in remote lodges. Fully tailored experiences strictly off the beaten path.",
    rate: "Pricing on Request"
  }
];

export const Stays = () => {
  return (
    <section className="py-24 bg-[#151515] text-ivory overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-16">
          <span className="text-sand font-heading text-lg font-semibold tracking-[2px] uppercase opacity-90 mb-3 block">Bespoke Refined</span>
          <h2 className="text-5xl md:text-6xl font-heading text-white mb-4">Exceptional Stays</h2>
          <p className="text-zinc-400 max-w-xl">We match each package to accommodation that fits the environment — not an arbitrary star category.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((item, idx) => (
            <div key={idx} className="border border-white/10 p-10 rounded-custom hover:bg-white/5 transition-all group">
              <span className="text-ochre font-heading text-xl font-semibold tracking-widest uppercase mb-6 block">{item.tier}</span>
              <p className="text-zinc-400 text-sm leading-relaxed mb-10 h-24">{item.desc}</p>
              <div className="pt-8 border-t border-white/10 text-sand font-bold text-lg tracking-wide">
                {item.rate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
