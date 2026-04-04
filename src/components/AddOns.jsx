import React from 'react';
import { Camera, Plane, CreditCard, Smartphone, Utensils, Waves, Hotel, Map } from 'lucide-react';

export const AddOns = () => {
  const addons = [
    { icon: <Camera />, name: "Hot Air Balloon — Mara", desc: "Float over the savanna at dawn followed by a champagne bush breakfast.", price: "+$480pp" },
    { icon: <Plane />, name: "Scenic Helicopter Flight", desc: "Aerial views of the Great Rift Valley and flamingo lakes.", price: "+$1,250pp" },
    { icon: <Map />, name: "Maasai Village Visit", desc: "Authentic interaction, dancing, and learning about traditional ways of life.", price: "+$25pp" },
    { icon: <Camera />, name: "Private Photography Guide", desc: "Expert wildlife photographer to help you capture National Geographic-level shots.", price: "+$180pp" },
    { icon: <Utensils />, name: "Bush Dinner Under the Stars", desc: "A private dining experience on the plains illuminated by lanterns.", price: "+$85pp" },
    { icon: <Waves />, name: "Lake Naivasha Boat Ride", desc: "Sail amongst hippos and spot fish eagles diving for their catch.", price: "+$35pp" },
    { icon: <Hotel />, name: "Nairobi Airport Hotel Night", desc: "Convenient layover accommodation right next to JKIA terminal.", price: "+$95pp" },
    { icon: <Smartphone />, name: "Local SIM & Data Pack", desc: "Unlimited 4G data for the duration of your trip with local support.", price: "+$20" },
  ];

  return (
    <section className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-heading text-midnight mb-12">Enhance Your Trip</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {addons.map((addon, idx) => (
            <div key={idx} className="border border-zinc-100 p-6 rounded-lg flex flex-col gap-4 hover:border-ochre/20 transition-colors group">
              <div className="w-8 h-8 text-ochre stroke-[1.5px] group-hover:scale-110 transition-transform">
                {addon.icon}
              </div>
              <h3 className="font-bold text-[15px] text-charcoal">{addon.name}</h3>
              <p className="text-zinc-500 text-[13px] flex-grow">{addon.desc}</p>
              <div className="font-semibold text-ochre text-sm border-t border-zinc-100 pt-3">
                {addon.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
