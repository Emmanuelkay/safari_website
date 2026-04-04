import React, { useState } from 'react';
import { Check, ChevronRight, Clock, MapPin, Users } from 'lucide-react';
import { cn } from '../lib/utils';

const packagesData = [
  {
    id: 1,
    title: "Nairobi in a Morning",
    category: "city 3-days solo",
    image: "/pkg_nairobi_morning.png",
    duration: "4–5 Hours",
    tags: ["City Tour", "Nairobi"],
    desc: "The perfect introduction to Kenya's capital — elephants, giraffes, and colonial history before lunch.",
    includes: [
      "Private vehicle & KWS certified guide",
      "Giraffe Centre & Elephant Orphanage entry",
      "Karen Blixen Museum visit",
      "Hotel pickup within Nairobi"
    ],
    price: 95,
    solo: 45,
    group: "75pp for 4+",
    itinerary: [
      { time: "08:00", event: "Elephant Orphanage", detail: "Watch the nursery feeding and mud bath. Learn about the rehabilitation of orphaned calves." },
      { time: "11:00", event: "Giraffe Centre", detail: "Hand-feed the endangered Rothschild's giraffes from a raised platform." },
      { time: "13:00", event: "Return", detail: "Transfer back to your hotel or airport in time for afternoon departures." }
    ]
  },
  {
    id: 2,
    title: "Nairobi: City, Park & Culture",
    category: "city animal solo",
    image: "/pkg_nairobi_city_wild.png",
    duration: "8–9 Hours",
    tags: ["City Tour", "Wildlife", "Nairobi"],
    desc: "A game drive inside Africa's only urban national park, followed by Nairobi's most beloved wildlife sanctuaries.",
    includes: [
      "Private 4x4 with pop-up roof",
      "Nairobi National Park morning game drive",
      "Giraffe Centre + Elephant Orphanage",
      "Lunch at a top local restaurant"
    ],
    price: 185,
    solo: 65,
    note: "Park fees ($43) added at booking",
    itinerary: [
      { time: "06:30", event: "NNP Game Drive", detail: "Early morning drive to spot lions, rhinos, and buffaloes with the city skyline behind them." },
      { time: "12:30", event: "Carnivore Lunch", detail: "Enjoy a traditional Kenyan feast at one of Nairobi's most legendary eateries." }
    ]
  },
  {
    id: 3,
    title: "The Swahili Coast Experience",
    category: "city coast solo",
    image: "/dest_watamu.png",
    duration: "Full Day",
    tags: ["City Tour", "Coast", "Culture"],
    desc: "Fort Jesus, spice markets, a Swahili lunch, and a sunset dhow ride on the Indian Ocean — all in one day.",
    includes: [
      "Fort Jesus entry (UNESCO World Heritage Site)",
      "Old Town guided walking tour",
      "Traditional Swahili lunch included",
      "Sunset dhow cruise on the ocean"
    ],
    price: 160,
    solo: 55,
    itinerary: [
      { time: "09:00", event: "Fort Jesus", detail: "Explore the 16th-century Portuguese fortification and its rich maritime history." },
      { time: "17:00", event: "Dhow Cruise", detail: "Unwind on a traditional wooden boat as the sun sets over the Mombasa skyline." }
    ]
  },
  {
    id: 4,
    title: "Maasai Mara Weekend",
    category: "safari 3-days solo",
    image: "/dest_mara.png",
    duration: "3 Days · 2 Nights",
    tags: ["Safari", "Big Five", "Mara"],
    desc: "The classic Kenya safari — golden plains, the Big Five, and a tented camp under a sky full of stars.",
    includes: [
      "2 nights full board tented camp",
      "3 game drives in private 4x4",
      "All Mara park fees included",
      "Return road transfer from Nairobi"
    ],
    price: 650,
    solo: 180,
    group: "550pp for 4–6",
    itinerary: [
      { time: "Day 1", event: "Arrival & Dusk Drive", detail: "Scenic drive through the Rift Valley, check-in at camp, and first encounter with the Mara wildlife." },
      { time: "Day 2", event: "Full Day Mara", detail: "Sunrise to sunset game drives. Picnic lunch in the park near the Mara River." }
    ]
  },
  {
    id: 5,
    title: "Elephants & Kilimanjaro",
    category: "safari 3-days solo",
    image: "/dest_amboseli.png",
    duration: "3 Days · 2 Nights",
    tags: ["Safari", "Elephants", "Amboseli"],
    desc: "Watch elephant herds move across the plains with Africa's highest peak rising behind them at golden hour.",
    includes: [
      "2 nights full board eco lodge",
      "3 game drives + professional guide",
      "Amboseli park fees included",
      "Return transfer from Nairobi"
    ],
    price: 720,
    solo: 200,
    itinerary: [
      { time: "Day 1", event: "The Road to Kili", detail: "Travel south to Amboseli. Afternoon game drive targeting the famous 'Big Tuskers.'" },
      { time: "Day 2", event: "Giants of Amboseli", detail: "Full day exploration including a visit to Observation Hill for panoramic views." }
    ]
  },
  {
    id: 6,
    title: "Mara & Naivasha Explorer",
    category: "safari 5-days combo solo",
    image: "/dest_naivasha.png",
    popular: true,
    duration: "5 Days · 4 Nights",
    tags: ["Safari", "Lakes", "Mara"],
    desc: "Two of Kenya's most spectacular ecosystems — hippos and flamingos at the lake, then lions on the open savanna.",
    includes: [
      "4 nights accommodation (lodge + tented camp)",
      "Boat ride on Lake Naivasha included",
      "Hell's Gate cycling & guided walk",
      "All park & conservancy fees"
    ],
    price: 1150,
    solo: 280,
    group: "980pp for 4+",
    itinerary: [
      { time: "Day 1", event: "Lake Naivasha", detail: "Boat ride and visit to Crescent Island. Stay at a lakeside lodge." },
      { time: "Day 2", event: "Hell's Gate", detail: "Cycle through the gorge and hike the obsidian caves." },
      { time: "Days 3-4", event: "Maasai Mara", detail: "Deep safari immersion in the world's premier wildlife destination." }
    ]
  },
  {
    id: 7,
    title: "City & Wild: The Short Escape",
    category: "city safari combo solo",
    image: "/dest_nairobi.png",
    duration: "2 Days · 1 Night",
    tags: ["City + Safari", "Best Value"],
    desc: "For travelers with just 48 hours — Nairobi's best sights on day one, a game drive in the park on day two.",
    includes: [
      "1 night 3-star Nairobi city hotel",
      "Full Nairobi city tour (day 1)",
      "Nairobi National Park game drive (day 2)",
      "Airport drop-off after game drive"
    ],
    price: 450,
    solo: 130,
    itinerary: [
      { time: "Day 1", event: "Capital Highlights", detail: "Giraffe Centre, Elephant Orphanage, and a cultural dinner experience." },
      { time: "Day 2", event: "Nairobi National Park", detail: "Early morning game drive before final city transfers." }
    ]
  },
  {
    id: 8,
    title: "The Complete Kenya Journey",
    category: "safari 7-days city coast combo",
    image: "/wildlife_elephant.png",
    duration: "7 Days · 6 Nights",
    tags: ["Safari", "City", "Coast"],
    desc: "Nairobi, the Mara, Amboseli, and the Swahili coast — one seamless journey through the full soul of Kenya.",
    includes: [
      "6 nights accommodation (city, safari, coast)",
      "Amboseli + Mara game drives included",
      "Nairobi city tour & Mombasa coast tour",
      "All transfers, park fees & guide fees"
    ],
    price: 2200,
    solo: 450,
    itinerary: [
      { time: "Days 1-2", event: "Nairobi & Amboseli", detail: "City tour followed by heavy wildlife sightings in Amboseli." },
      { time: "Days 3-5", event: "Maasai Mara", detail: "Three days exploring the most biodiverse plains on earth." },
      { time: "Days 6-7", event: "Mombasa", detail: "Fly to the coast for Swahili culture and Indian Ocean relaxation." }
    ]
  }
];

const filterOptions = [
  { label: 'All Packages', value: 'all' },
  { label: 'City Tours', value: 'city' },
  { label: '3 Days', value: '3-days' },
  { label: '5 Days', value: '5-days' },
  { label: '7 Days', value: '7-days' },
  { label: 'Safari Only', value: 'safari' },
  { label: 'Safari + City', value: 'combo' },
  { label: 'Solo Friendly', value: 'solo' }
];

const PackageCard = ({ pkg }) => {
  const [showItinerary, setShowItinerary] = useState(false);
  const isSignature = pkg.price >= 1150;

  return (
    <div className={cn(
      "border rounded-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl",
      isSignature 
        ? "bg-charcoal border-gold/40 hover:border-gold" 
        : "bg-white border-zinc-200 hover:border-gold/30"
    )}>
      <div className="h-64 relative overflow-hidden bg-black">
        <img 
          src={pkg.image} 
          alt={pkg.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60 opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <span className="absolute top-5 left-5 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 text-[10px] font-bold rounded-[4px] tracking-widest uppercase z-20">
          {pkg.duration}
        </span>
        {isSignature ? (
          <span className="absolute top-5 right-5 bg-charcoal text-gold border border-gold/30 px-3 py-1.5 text-[10px] font-bold rounded-[4px] tracking-widest uppercase z-20 shadow-lg">
            Signature
          </span>
        ) : pkg.popular ? (
          <span className="absolute top-5 right-5 bg-gold text-charcoal px-3 py-1.5 text-[10px] font-bold rounded-[4px] tracking-widest uppercase z-20 shadow-lg">
            Most Popular
          </span>
        ) : null}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <span className={cn("text-[12px] font-bold uppercase tracking-widest mb-3 block", isSignature ? "text-gold" : "text-zinc-400")}>
          {pkg.tags.join(' · ')}
        </span>
        <h3 className={cn("font-heading text-3xl font-semibold mb-3 transition-colors", isSignature ? "text-ivory group-hover:text-gold" : "text-charcoal group-hover:text-midnight")}>
          {pkg.title}
        </h3>
        <p className={cn("text-sm leading-relaxed mb-6", isSignature ? "text-zinc-400" : "text-zinc-600")}>
          {pkg.desc}
        </p>

        <ul className={cn("space-y-3 mb-8 flex-grow border-t pt-6", isSignature ? "border-white/10" : "border-zinc-100")}>
          {pkg.includes.map((item, idx) => (
            <li key={idx} className={cn("flex gap-3 text-sm leading-tight", isSignature ? "text-ivory/80" : "text-zinc-700")}>
              <Check className="w-4 h-4 text-ochre flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>

        <div className={cn("border-t pt-6 mb-6", isSignature ? "border-white/10" : "border-zinc-100")}>
          <span className={cn("text-[11px] font-bold uppercase tracking-widest block mb-0.5", isSignature ? "text-zinc-500" : "text-zinc-400")}>From</span>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-4xl font-semibold text-ochre">${pkg.price}</span>
            <span className={cn("text-sm", isSignature ? "text-zinc-500" : "text-zinc-400")}>per person</span>
          </div>
          <div className={cn("text-[11px] mt-2 font-medium", isSignature ? "text-zinc-400" : "text-zinc-300")}>
             Solo supplement: +${pkg.solo} {pkg.group && `| Group Rate: ${pkg.group}`}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setShowItinerary(!showItinerary)}
            className={cn("w-full py-3 px-4 border rounded-[4px] text-sm font-semibold transition-all", isSignature ? "border-white/20 text-ivory hover:border-gold hover:text-gold" : "border-zinc-200 text-charcoal hover:border-ochre hover:text-ochre")}
          >
            {showItinerary ? 'Hide Itinerary' : 'View Itinerary'}
          </button>
          <a
            href="#contact"
            className={cn("w-full py-3 px-4 text-center rounded-[4px] text-sm font-semibold transition-all", isSignature ? "bg-gold text-charcoal hover:bg-white" : "bg-midnight text-ivory hover:bg-ochre")}
          >
            Book Trip
          </a>
        </div>

        {/* Itinerary Accordion */}
        <div className={cn(
          "transition-all duration-500 overflow-hidden",
          showItinerary ? "max-h-[800px] mt-6 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className={cn("rounded-[4px] p-6 border", isSignature ? "bg-white/5 border-white/10" : "bg-zinc-50 border-zinc-100")}>
            {pkg.itinerary.map((day, idx) => (
              <div key={idx} className={cn("mb-6 last:mb-0 pl-4 border-l-2", isSignature ? "border-gold/30" : "border-ochre/30")}>
                <h4 className="text-[11px] font-bold text-ochre uppercase tracking-widest mb-1.5">{day.time} — {day.event}</h4>
                <p className={cn("text-[13px] leading-relaxed", isSignature ? "text-zinc-300" : "text-zinc-600")}>{day.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Packages = () => {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? packagesData 
    : packagesData.filter(pkg => pkg.category.includes(filter));

  return (
    <section id="packages" className="py-24 bg-[#fdfcfa]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-ochre font-heading text-lg font-semibold tracking-[2px] uppercase opacity-90 mb-3 block">
            Curated Expeditions
          </span>
          <h2 className="text-5xl md:text-6xl font-heading text-midnight mb-4">Find Your Safari</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            All prices are per person, based on 2 travelers sharing. Solo travelers welcome — supplement shown.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border",
                filter === opt.value 
                  ? "bg-midnight text-ivory border-midnight" 
                  : "bg-transparent text-zinc-500 border-zinc-200 hover:border-midnight hover:text-midnight"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 min-h-[400px]">
          {filteredData.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Call Strip */}
        <div className="bg-ochre p-10 sm:p-14 text-center rounded-[4px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
          <div className="relative z-10">
            <p className="font-heading text-2xl sm:text-3xl text-white mb-8">
              Every package includes a free 30-minute planning call with our Nairobi team before you book.
            </p>
            <a href="#contact" className="btn-outline-ivory border-white text-white hover:bg-white hover:text-ochre">
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
