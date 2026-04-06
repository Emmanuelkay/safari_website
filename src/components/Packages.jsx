import React, { useState } from 'react';
import { Check, ChevronRight, Clock, MapPin, Users, Moon, Star, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { ItineraryModal } from './ItineraryModal';
import { useTrip } from '../context/TripContext';

const packagesData = [
  {
    id: 1,
    title: "Nairobi in a Morning",
    category: "city day-trips solo",
    image: "/pkg_nairobi_morning.png",
    duration: "4–5 Hours",
    tags: ["City Tour", "Nairobi"],
    desc: "The perfect introduction to Kenya's capital — elephants, giraffes, and colonial history before lunch.",
    inclusions: [
      "Private vehicle & KWS certified guide",
      "Giraffe Centre & Elephant Orphanage entry",
      "Karen Blixen Museum visit",
      "Hotel pickup within Nairobi"
    ],
    stay: {
      name: "No overnight (half-day)",
      tier: "COMFORT",
      nights: 0,
      board: "N/A",
      upgrade: "Need a Nairobi night? Add Airport Hotel +$95pp"
    },
    itinerary: [
      {
        day: 1,
        location: "Nairobi",
        morning: "Private pickup from your hotel or JKIA airport. Transfer to the David Sheldrick Elephant Orphanage.",
        afternoon: "Feeding session with the orphaned calves. Visit the Giraffe Centre to hand-feed Rothschild's giraffes.",
        evening: "Guided tour of the Karen Blixen Museum. Drop-off at your hotel or airport.",
        overnight: { name: "N/A (Day Trip)", board: "Lunch Included", room: "N/A" },
        journal: "Nairobi's wildlife sanctuaries offer a rare, intimate look at conservation efforts before the vastness of the plains."
      }
    ],
    price: 95,
    solo: 45,
    group: "$75pp for 4+"
  },
  {
    id: 2,
    title: "Nairobi: City, Park & Culture",
    category: "city animal safari solo with-stays wildlife",
    image: "/pkg_nairobi_city_wild.png",
    duration: "8–9 Hours",
    tags: ["City Tour", "Wildlife", "Nairobi"],
    desc: "A game drive inside Africa's only urban national park, followed by Nairobi's beloved wildlife sanctuaries.",
    inclusions: [
      "Private 4x4 with pop-up roof",
      "Nairobi National Park morning game drive",
      "Giraffe Centre + Elephant Orphanage",
      "Lunch at top local restaurant"
    ],
    stay: {
      name: "The Emakoko (NNP boundary)",
      tier: "PREMIUM",
      nights: 1,
      board: "Full Board",
      room: "Forest-view room"
    },
    itinerary: [
      {
        day: 1,
        location: "Nairobi National Park & Sanctuaries",
        morning: "Dawn game drive in NNP. Spot rhinos and lions against the city skyline.",
        afternoon: "Lunch at the lodge followed by giraffe and elephant sanctuary visits.",
        evening: "Sundowners on the deck of The Emakoko, listening to the park's nocturnal awakening.",
        overnight: { name: "The Emakoko", board: "Full Board", room: "Forest-view room" },
        journal: "The Emakoko sits on the edge of the world's only urban park, a bridge between the bustle of the capital and the wild."
      }
    ],
    price: 185,
    solo: 65
  },
  {
    id: 3,
    title: "The Swahili Coast Experience",
    category: "city coast solo with-stays culture",
    image: "/dest_watamu.png",
    duration: "Full Day",
    tags: ["City Tour", "Coast", "Culture"],
    desc: "Fort Jesus, spice markets, Swahili lunch, and a sunset dhow ride on the Indian Ocean.",
    inclusions: [
      "Fort Jesus entry (UNESCO)",
      "Old Town guided walk",
      "Traditional Swahili lunch",
      "Sunset dhow cruise"
    ],
    stay: {
      name: "Mombasa Serena Beach Resort",
      tier: "PREMIUM",
      nights: 1,
      board: "Half Board",
      room: "Ocean-facing room"
    },
    itinerary: [
      {
        day: 1,
        location: "Mombasa Old Town",
        morning: "Historical tour of Fort Jesus and the narrow winding alleys of the Swahili Old Town.",
        afternoon: "Authentic Swahili lunch at a traditional courtyard restaurant. Spice market exploration.",
        evening: "Traditional dhow cruise on the Tudor Creek with live Swahili music and sunset views.",
        overnight: { name: "Mombasa Serena", board: "Half Board", room: "Ocean-facing room" },
        journal: "Mombasa's coast is a tapestry of Portuguese history, Arab spice markets, and the rhythmic lap of the Indian Ocean."
      }
    ],
    price: 160,
    solo: 55
  },
  {
    id: 4,
    title: "Maasai Mara Weekend",
    category: "safari 3-days solo with-stays mara",
    image: "/dest_mara.png",
    duration: "3 Days · 2 Nights",
    tags: ["Safari", "Big Five", "Mara"],
    desc: "The classic Kenya safari — golden plains, the Big Five, and a tented camp under a sky full of stars.",
    inclusions: [
      "2 nights full board tented camp",
      "3 game drives private 4x4",
      "All Mara park fees",
      "Return road transfer from Nairobi"
    ],
    stay: {
      name: "Mara Intrepids Tented Camp",
      tier: "COMFORT",
      nights: 2,
      board: "Full Board",
      room: "Tented en-suite suite",
      upgrade: "Angama Mara available — Bespoke, on request"
    },
    itinerary: [
      {
        day: 1,
        location: "Nairobi to Maasai Mara",
        morning: "Scenic drive through the Great Rift Valley, arriving at the camp for a late lunch.",
        afternoon: "First game drive in the Mara, tracking the Big Five as the sun begins to dip.",
        evening: "Fireside stories and a curated dinner under the vast African sky.",
        overnight: { name: "Mara Intrepids", board: "Full Board", room: "Luxury Tented Suite" },
        journal: "The Talek River winds through our camp, bringing the sounds of the Mara directly to your canvas walls."
      },
      {
        day: 2,
        location: "Maasai Mara Plains",
        morning: "Sunrise game drive with a bush breakfast near the Mara River.",
        afternoon: "Deep immersion in the savanna, monitoring the great migration movements.",
        evening: "Riverside sundowners and a traditional Maasai-guided sundown walk.",
        overnight: { name: "Mara Intrepids", board: "Full Board", room: "Luxury Tented Suite" },
        journal: "Day two brings us closer to the predator-prey dance that defines this ancient ecosystem."
      }
    ],
    price: 650,
    solo: 180,
    group: "$550pp for 4–6"
  },
  {
    id: 5,
    title: "Elephants & Kilimanjaro",
    category: "safari 3-days solo with-stays amboseli",
    image: "/dest_amboseli.png",
    duration: "3 Days · 2 Nights",
    tags: ["Safari", "Elephants", "Amboseli"],
    desc: "Watch elephant herds move across the plains with Africa's highest peak rising behind them at dawn.",
    inclusions: [
      "2 nights full board eco lodge",
      "3 game drives + professional guide",
      "Amboseli park fees",
      "Return transfer from Nairobi"
    ],
    stay: {
      name: "Ol Tukai Lodge",
      tier: "COMFORT",
      nights: 2,
      board: "Full Board",
      room: "Kilimanjaro-view room",
      upgrade: "Upgrade to Tortilis Camp (PREMIUM) +$200pp"
    },
    itinerary: [
      {
        day: 1,
        location: "Nairobi to Amboseli",
        morning: "Travel south toward the Tanzanian border, arriving for lunch in the shadows of Kilimanjaro.",
        afternoon: "Game drive focused on the famous 'Big Tuskers' of Amboseli.",
        evening: "Stargazing and cultural talk from our lead guides on the lodge terrace.",
        overnight: { name: "Ol Tukai Lodge", board: "Full Board", room: "Kili-view Room" },
        journal: "Nowhere else on earth do elephants seem so majestic as they do beneath the white peak of Kilimanjaro."
      }
    ],
    price: 720,
    solo: 200
  },
  {
    id: 6,
    title: "Mara & Naivasha Explorer",
    category: "safari 5-days combo solo with-stays",
    image: "/dest_naivasha.png",
    duration: "5 Days · 4 Nights",
    tags: ["Safari", "Lakes", "Mara"],
    desc: "Two of Kenya's most spectacular ecosystems — hippos at the lake, then lions on the savanna.",
    inclusions: [
      "4 nights (lodge + tented camp)",
      "Boat ride Lake Naivasha",
      "Hell's Gate cycling & walk",
      "All park & conservancy fees"
    ],
    stay: {
      name: "Sawela Lodge & Sentinel Mara",
      tier: "PREMIUM",
      nights: 4,
      board: "Full Board",
      journey: "Sawela (Night 1-2) → Sentinel (Night 3-4)"
    },
    itinerary: [
      {
        day: 1,
        location: "Lake Naivasha",
        morning: "Arrival and boat safari to Crescent Island, walking amongst giraffes and zebras.",
        afternoon: "Cycling tour through Hell's Gate National Park's obsidian gorges.",
        evening: "Lakeside dining and hippo monitoring from the lodge jetty.",
        overnight: { name: "Sawela Lodge", board: "Full Board", room: "Superior Lake-view" },
        journal: "The Rift Valley air is crisp here, and the silence is only broken by the snort of a hippo."
      }
    ],
    price: 1150,
    solo: 280,
    group: "$980pp for 4+"
  },
  {
    id: 7,
    title: "City & Wild: The Short Escape",
    category: "city safari combo solo with-stays",
    image: "/dest_nairobi.png",
    duration: "2 Days · 1 Night",
    tags: ["City + Safari", "Best Value"],
    desc: "For travelers with just 48 hours — Nairobi's best sights on day one, game drive on day two.",
    inclusions: [
      "1 night 3-star Nairobi hotel",
      "Full Nairobi city tour (day 1)",
      "NNP game drive (day 2)",
      "Airport drop-off"
    ],
    stay: {
      name: "Trademark Hotel Nairobi",
      tier: "COMFORT",
      nights: 1,
      board: "B&B",
      room: "City-view room"
    },
    itinerary: [
      {
        day: 1,
        location: "Nairobi Highlights",
        morning: "Giraffe Centre and Elephant Orphanage visits.",
        afternoon: "Bomas of Kenya cultural experience and local craft market.",
        evening: "Dinner at a top Nairobi eatery (e.g. Carnivore or Talisman).",
        overnight: { name: "Trademark Hotel", board: "B&B", room: "Superior Room" },
        journal: "Nairobi is a city with a wild heart, where the roar of a lion is never far from the hum of commerce."
      }
    ],
    price: 450,
    solo: 130
  },
  {
    id: 8,
    title: "The Complete Kenya Journey",
    category: "safari 7-days city coast combo with-stays",
    image: "/wildlife_elephant.png",
    flagship: true,
    duration: "7 Days · 6 Nights",
    tags: ["Safari", "City", "Coast"],
    desc: "Nairobi, the Mara, Amboseli, and the Swahili coast — one seamless journey through the soul of Kenya.",
    inclusions: [
      "6 nights (city + safari + coast)",
      "Amboseli + Mara game drives",
      "Nairobi & Mombasa tours",
      "All transfers, fees & guides"
    ],
    stay: {
      name: "Ole Sereni / Olonana / Medina",
      tier: "PREMIUM",
      nights: 6,
      board: "Mix (B&B/FB)",
      journey: "Nairobi → Mara → Watamu"
    },
    itinerary: [
      {
        day: 1,
        location: "Nairobi & Amboseli",
        morning: "Nairobi National Park dawn drive, then flight to Amboseli.",
        afternoon: "Afternoon game drive under the gaze of Kilimanjaro.",
        evening: "Traditional lodge dinner and guide's field brief.",
        overnight: { name: "Ole Sereni", board: "B&B", room: "NNP-view Room" },
        journal: "The first day sets the pace — from the city's edge to the giants of the south."
      }
    ],
    price: 2200,
    solo: 450
  }
];

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'City Tours', value: 'city' },
  { label: '3 Days', value: '3-days' },
  { label: '5 Days', value: '5-days' },
  { label: '7 Days', value: '7-days' },
  { label: 'Safari Only', value: 'safari' },
  { label: 'Safari + City', value: 'combo' },
  { label: 'Solo Friendly', value: 'solo' },
  { label: 'With Stays', value: 'with-stays' },
  { label: 'Day Trips', value: 'day-trips' }
];

const PackageCard = ({ pkg, onOpenItinerary }) => {
  const { trip, selectPackage } = useTrip();
  const isFlagship = pkg.flagship;
  const isSelected = trip.package?.id === pkg.id;

  return (
    <div className={cn(
      "border rounded-lg overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(139,105,20,0.15)]",
      isFlagship 
        ? "bg-charcoal border-gold/40 ring-1 ring-gold/20" 
        : "bg-white border-zinc-200 hover:border-gold/30"
    )}>
      {/* Top Media */}
      <div className="h-64 relative overflow-hidden bg-black">
        <img 
          src={pkg.image} 
          alt={pkg.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60 opacity-60" />
        
        <span className="absolute top-5 left-5 bg-charcoal/80 backdrop-blur-md text-ivory px-3 py-1.5 text-[10px] font-bold rounded-[4px] tracking-widest uppercase z-20">
          {pkg.duration}
        </span>
        
        {isFlagship && (
          <span className="absolute top-5 right-5 bg-gold text-charcoal px-3 py-1.5 text-[10px] font-bold rounded-[4px] tracking-widest uppercase z-20 shadow-lg">
            Flagship Experience
          </span>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        {/* Editorial TOP */}
        <span className={cn("text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block", isFlagship ? "text-gold" : "text-ochre")}>
          {pkg.tags.join(' · ')}
        </span>
        <h3 className={cn("font-heading text-3xl font-semibold mb-3 leading-tight", isFlagship ? "text-ivory" : "text-charcoal")}>
          {pkg.title}
        </h3>
        <p className={cn("text-xs leading-relaxed mb-8 opacity-80", isFlagship ? "text-ivory/70" : "text-charcoal/70")}>
          {pkg.desc}
        </p>

        {/* MIDDLE - Inclusions */}
        <ul className="space-y-4 mb-8">
          {pkg.inclusions.map((item, idx) => (
            <li key={idx} className={cn("flex gap-3 text-[13px] items-start", isFlagship ? "text-ivory/80" : "text-charcoal/80")}>
              <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>

        {/* YOUR STAY BAND */}
        <div className={cn(
          "mt-auto mb-8 p-6 rounded-custom border border-dashed",
          isFlagship ? "bg-white/5 border-gold/30" : "bg-ivory border-gold/20"
        )}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className={cn("text-[9px] font-bold uppercase tracking-widest block mb-1.5 opacity-60", isFlagship ? "text-ivory" : "text-charcoal")}>Accommodation</span>
              <h4 className={cn("font-heading text-lg text-gold")}>{pkg.stay.name}</h4>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="bg-gold text-charcoal px-2 py-0.5 text-[8px] font-bold rounded-[2px]">{pkg.stay.tier}</span>
              {pkg.stay.nights > 0 && (
                <span className={cn("text-[9px] font-bold flex items-center gap-1", isFlagship ? "text-ivory" : "text-charcoal")}>
                  <Moon size={10} className="text-gold" /> {pkg.stay.nights} Nights
                </span>
              )}
            </div>
          </div>
          
          <div className={cn("text-[11px] font-medium opacity-70 flex justify-between", isFlagship ? "text-ivory" : "text-charcoal")}>
            <span>{pkg.stay.board}</span>
            <span>{pkg.stay.room || pkg.stay.journey}</span>
          </div>
          
          {pkg.stay.upgrade && (
            <div className="mt-4 pt-4 border-t border-gold/10 text-[10px] italic text-gold animate-pulse">
              "{pkg.stay.upgrade}"
            </div>
          )}
        </div>

        {/* BOTTOM Pricing */}
        <div className={cn("border-t pt-8 grid grid-cols-2 gap-6", isFlagship ? "border-ivory/10" : "border-zinc-100")}>
          <div>
             <span className={cn("text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-50", isFlagship ? "text-ivory" : "text-charcoal")}>From</span>
             <div className="flex items-baseline gap-1">
               <span className="font-heading text-3xl font-semibold text-gold">${pkg.price}</span>
               <span className={cn("text-[10px] opacity-60", isFlagship ? "text-ivory" : "text-charcoal")}>/pp</span>
             </div>
          </div>
          <div className="text-right">
             <span className={cn("text-[9px] font-bold block mb-1 opacity-50 uppercase tracking-widest", isFlagship ? "text-ivory" : "text-charcoal")}>Supplements</span>
             <div className={cn("text-[11px] font-medium", isFlagship ? "text-ivory/70" : "text-charcoal/70")}>
                +{pkg.solo} Solo / {pkg.group || '-- Group'}
             </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-4 mt-8">
           <button 
             onClick={() => onOpenItinerary(pkg)}
             className={cn(
               "py-4 text-[11px] font-bold uppercase tracking-widest transition-all border rounded-[4px]",
               isFlagship ? "border-ivory/20 text-ivory hover:border-gold hover:text-gold" : "border-zinc-200 text-charcoal hover:border-gold hover:text-gold"
             )}
           >
             View Itinerary
           </button>
           <a 
             href="#booking" 
             onClick={() => selectPackage(pkg)}
             className={cn(
              "py-4 text-center text-[11px] font-bold uppercase tracking-widest transition-all rounded-[4px] bg-gold text-charcoal hover:bg-ivory flex items-center justify-center gap-2",
              isSelected && "ring-2 ring-gold ring-offset-2"
            )}>
             {isSelected ? 'Selected' : 'Book Now'} <ArrowRight size={14} />
           </a>
        </div>
      </div>
    </div>
  );
};

export const Packages = () => {
  const [filter, setFilter] = useState('all');
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openItinerary = (pkg) => {
    setSelectedPkg(pkg);
    setIsModalOpen(true);
  };

  const filteredData = filter === 'all' 
    ? packagesData 
    : packagesData.filter(pkg => pkg.category.includes(filter));

  return (
    <section id="packages" className="py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="text-center mb-20">
          <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block animate-in fade-in">
            Field Records
          </span>
          <h2 className="text-6xl md:text-7xl font-heading text-charcoal mb-8">Find Your Safari</h2>
          <div className="h-px w-20 bg-gold/30 mx-auto mb-8" />
          <p className="text-charcoal/60 max-w-xl mx-auto font-body text-sm leading-relaxed">
            All prices are per person, based on 2 travelers sharing private vehicle. <br />
            No middlemen. Just the plains.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={cn(
                "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border",
                filter === opt.value 
                  ? "bg-charcoal text-ivory border-charcoal shadow-xl" 
                  : "bg-transparent text-charcoal/50 border-zinc-200 hover:border-gold hover:text-gold"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[600px]">
          {filteredData.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onOpenItinerary={openItinerary} />
          ))}
        </div>
      </div>

      <ItineraryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pkg={selectedPkg} 
      />
    </section>
  );
};

