/**
 * =============================================================
 *  SAVANNA & BEYOND — CENTRAL PRICING & PACKAGE CONFIGURATION
 * =============================================================
 *
 *  Edit prices, packages, and add-ons here.
 *  Changes will automatically reflect across the entire site:
 *    - Package cards (Packages.jsx)
 *    - Add-on cards (AddOns.jsx)
 *    - Booking engine totals
 *    - Itinerary modals
 *    - Schema.org structured data
 *
 *  IMPORTANT: After changing prices, also update the schema
 *  data in src/pages/Home.jsx to keep SEO in sync.
 * =============================================================
 */

// ─── SAFARI PACKAGES ──────────────────────────────────────────
export const packagesData = [
  {
    id: 1,
    category: "city day-trips solo",
    image: "/pkg_nairobi_morning.webp",
    price: 95,
    solo: 45,
    group: "$75pp for 4+",
    stay: { tier: "COMFORT", nights: 0, board: "N/A" },
    itinerary: [
      {
        day: 1,
        location: "Nairobi National Park",
        morning: "Early pickup from your hotel at 5:45 AM. Enter Nairobi National Park at dawn for the best wildlife sightings — lions, giraffes, zebras, and buffalo against the Nairobi skyline.",
        afternoon: "Exit the park by midday. Drop-off at your hotel or the city centre by 12:30 PM.",
        evening: "Free evening. Optional add-on: Carnivore Restaurant dinner.",
        journal: "The only national park in the world with a city skyline backdrop. Morning light here is unmatched.",
        overnight: { name: "N/A — Day Trip", board: "Not included", room: "" }
      }
    ]
  },
  {
    id: 2,
    category: "city animal safari solo with-stays wildlife",
    image: "/pkg_nairobi_city_wild.webp",
    price: 185,
    solo: 65,
    stay: { tier: "PREMIUM", nights: 1, board: "Full Board", room: "Forest-view room" },
    itinerary: [
      {
        day: 1,
        location: "Nairobi",
        morning: "Visit the David Sheldrick Elephant Orphanage at 11 AM. Watch baby elephants being fed and learn about conservation efforts.",
        afternoon: "Giraffe Centre in Karen — hand-feed endangered Rothschild giraffes from the raised platform. Then explore Karen Blixen Museum.",
        evening: "Check in to your forest-view room. Welcome dinner at the lodge restaurant.",
        journal: "Seeing orphaned elephants play in the mud is something that stays with you forever.",
        overnight: { name: "Emara Ole Sereni", board: "Full Board", room: "Forest-view Room" }
      },
      {
        day: 2,
        location: "Nairobi National Park",
        morning: "Dawn game drive in Nairobi National Park. Track lions, leopards, and the endangered black rhino.",
        afternoon: "Bush breakfast inside the park. Return to hotel by noon. Airport transfer included.",
        evening: "Departure or extend your stay.",
        journal: "Four of the Big Five within city limits. Where else in the world can you say that?",
        overnight: { name: "End of Tour", board: "", room: "" }
      }
    ]
  },
  {
    id: 3,
    category: "city coast solo with-stays culture",
    image: "/dest_watamu.webp",
    price: 160,
    solo: 55,
    stay: { tier: "PREMIUM", nights: 1, board: "Half Board", room: "Ocean-facing room" },
    itinerary: [
      {
        day: 1,
        location: "Mombasa Old Town",
        morning: "Guided walking tour of Mombasa Old Town. Visit Fort Jesus (UNESCO World Heritage Site) and the ancient Swahili architecture.",
        afternoon: "Explore the spice markets and taste traditional Swahili street food. Visit local artisan workshops.",
        evening: "Sunset dhow cruise along the Mombasa waterfront. Traditional Swahili dinner on the coast.",
        journal: "The scent of cardamom and cloves in the narrow alleyways — this is the real East Africa.",
        overnight: { name: "Mombasa Serena Beach", board: "Half Board", room: "Ocean Front Room" }
      }
    ]
  },
  {
    id: 4,
    category: "safari 3-days solo with-stays mara",
    image: "/dest_mara.webp",
    price: 650,
    solo: 180,
    group: "$550pp for 4–6",
    stay: { tier: "COMFORT", nights: 2, board: "Full Board" },
    itinerary: [
      {
        day: 1,
        location: "Nairobi → Maasai Mara",
        morning: "Depart Nairobi at 7 AM. Scenic drive through the Great Rift Valley with a stop at the viewpoint.",
        afternoon: "Arrive at camp by 1 PM. Lunch, settle in, then head out for your first afternoon game drive across the Mara plains.",
        evening: "Sundowner drinks on the savanna. Return to camp for dinner under the stars.",
        journal: "The moment the Mara opens up before you — endless golden grassland — you understand why people come back.",
        overnight: { name: "Mara Ngenche Safari Camp", board: "Full Board", room: "Double Tent" }
      },
      {
        day: 2,
        location: "Maasai Mara Reserve",
        morning: "Full-day game drive. Track the Big Five — lion, leopard, elephant, buffalo, rhino. Visit hippo pools and the Mara River.",
        afternoon: "Picnic lunch in the bush. Continue exploring different sectors of the reserve. Optional Maasai village visit.",
        evening: "Return to camp for dinner. Night sounds of the African bush.",
        journal: "Today we tracked a leopard for an hour before she revealed her two cubs hidden in a fig tree. Magic.",
        overnight: { name: "Mara Ngenche Safari Camp", board: "Full Board", room: "Double Tent" }
      },
      {
        day: 3,
        location: "Maasai Mara → Nairobi",
        morning: "Early morning game drive at dawn — the best time for predator sightings. Breakfast back at camp.",
        afternoon: "Check out and drive back to Nairobi. Arrive by 5 PM. Airport drop-off included.",
        evening: "Departure or overnight in Nairobi.",
        journal: "Three days is enough to fall in love with the Mara. But never enough to say goodbye.",
        overnight: { name: "End of Tour", board: "", room: "" }
      }
    ]
  },
  {
    id: 5,
    category: "safari 3-days solo with-stays amboseli",
    image: "/dest_amboseli.webp",
    price: 720,
    solo: 200,
    stay: { tier: "COMFORT", nights: 2, board: "Full Board" },
    itinerary: [
      {
        day: 1,
        location: "Nairobi → Amboseli",
        morning: "Depart Nairobi at 7 AM. Drive south towards Amboseli with views of Mount Kilimanjaro emerging.",
        afternoon: "Arrive at Tortilis Camp. Lunch with Kilimanjaro views. Afternoon game drive — large elephant herds, wildebeest, zebra.",
        evening: "Sundowners facing Africa's highest peak. Dinner at the lodge.",
        journal: "Amboseli's elephants are the most photographed in Africa. You'll see why the moment a matriarch crosses your path.",
        overnight: { name: "Tortilis Camp Amboseli", board: "Full Board", room: "Luxury Tent" }
      },
      {
        day: 2,
        location: "Amboseli National Park",
        morning: "Dawn drive to Observation Hill for panoramic views. Track elephant families, lion prides, and cheetah.",
        afternoon: "Visit a Maasai community. Learn about their coexistence with wildlife. Bush lunch included.",
        evening: "Golden hour photography session with Kilimanjaro as backdrop.",
        journal: "An elephant herd of 40 crossed right in front of us. The babies stayed close to their mothers. Pure wilderness.",
        overnight: { name: "Tortilis Camp Amboseli", board: "Full Board", room: "Luxury Tent" }
      },
      {
        day: 3,
        location: "Amboseli → Nairobi",
        morning: "Final dawn game drive. Last chance for Kilimanjaro sunrise shots. Breakfast at camp.",
        afternoon: "Drive back to Nairobi. Arrive by 4 PM with airport transfer.",
        evening: "Departure or extend your Kenya adventure.",
        journal: "Kilimanjaro at sunrise, painted pink and gold. Some mornings change you.",
        overnight: { name: "End of Tour", board: "", room: "" }
      }
    ]
  },
  {
    id: 6,
    category: "safari 5-days combo solo with-stays",
    image: "/dest_naivasha.webp",
    price: 1150,
    solo: 280,
    group: "$980pp for 4+",
    stay: { tier: "PREMIUM", nights: 4, board: "Full Board" },
    itinerary: [
      {
        day: 1,
        location: "Nairobi → Lake Naivasha",
        morning: "Depart Nairobi. Drive along the escarpment with Rift Valley views.",
        afternoon: "Arrive Sawela Lodge. Boat ride on Lake Naivasha — hippos, fish eagles, and papyrus islands.",
        evening: "Lakeside dinner. Night sounds of hippos grazing on the lawn.",
        journal: "Hippos surfacing 10 metres from your boat. The guide says it's normal. Your heartbeat says otherwise.",
        overnight: { name: "Sawela Lodge", board: "Full Board", room: "Lakeside Cottage" }
      },
      {
        day: 2,
        location: "Hell's Gate & Crescent Island",
        morning: "Cycling safari through Hell's Gate National Park — towering cliffs, hot springs, and gorges. Walk among zebra and giraffe.",
        afternoon: "Walking safari on Crescent Island — get within arm's reach of giraffes, waterbuck, and wildebeest. No predators, no vehicles.",
        evening: "Free evening at the lodge. Optional spa.",
        journal: "Hell's Gate inspired The Lion King. Standing in Fischer's Tower gorge, you see why.",
        overnight: { name: "Sawela Lodge", board: "Full Board", room: "Lakeside Cottage" }
      },
      {
        day: 3,
        location: "Lake Naivasha → Maasai Mara",
        morning: "Drive to the Maasai Mara. Landscapes shift from lake to savanna.",
        afternoon: "Arrive at Sentinel Mara Camp. Lunch, then afternoon game drive. Lions, elephants, buffalo.",
        evening: "Bush dinner under acacia trees.",
        journal: "The transition from Naivasha's green to the Mara's gold is like changing continents in a few hours.",
        overnight: { name: "Sentinel Mara Camp", board: "Full Board", room: "Safari Tent" }
      },
      {
        day: 4,
        location: "Maasai Mara Reserve",
        morning: "Full-day game drive. Big Five tracking. Mara River crossing point (seasonal). Hippo pools.",
        afternoon: "Picnic lunch in the bush. Visit different sectors of the reserve.",
        evening: "Sundowner cocktails on the plains. Night drive (optional).",
        journal: "A cheetah hunting at full speed. 0 to 70 mph in three seconds. No documentary prepares you for seeing it live.",
        overnight: { name: "Sentinel Mara Camp", board: "Full Board", room: "Safari Tent" }
      },
      {
        day: 5,
        location: "Maasai Mara → Nairobi",
        morning: "Dawn game drive for final sightings. Breakfast at camp.",
        afternoon: "Drive back to Nairobi. Arrive by 5 PM. Airport transfer included.",
        evening: "Departure.",
        journal: "Five days across two ecosystems. Lake to savanna. Hippos to lions. Kenya compressed into one perfect trip.",
        overnight: { name: "End of Tour", board: "", room: "" }
      }
    ]
  },
  {
    id: 7,
    category: "city safari combo solo with-stays",
    image: "/dest_nairobi.webp",
    price: 450,
    solo: 130,
    stay: { tier: "COMFORT", nights: 1, board: "B&B" },
    itinerary: [
      {
        day: 1,
        location: "Nairobi City Tour",
        morning: "Hotel pickup. Visit the National Museum of Kenya — human evolution exhibits and tribal art.",
        afternoon: "David Sheldrick Elephant Orphanage, Giraffe Centre, and the Kazuri Beads factory in Karen.",
        evening: "Check in to Trademark Hotel. Evening free — explore Nairobi's food scene.",
        journal: "Nairobi surprises everyone. It's green, creative, and full of stories you won't find in guidebooks.",
        overnight: { name: "Trademark Hotel", board: "B&B", room: "City View Room" }
      },
      {
        day: 2,
        location: "Nairobi National Park",
        morning: "Dawn game drive in Nairobi National Park. Lions, rhinos, giraffes — all with the city skyline behind them.",
        afternoon: "Bush brunch inside the park. Transfer to airport by 2 PM.",
        evening: "Departure.",
        journal: "Breakfast with zebras, lunch with a view of skyscrapers. Only in Nairobi.",
        overnight: { name: "End of Tour", board: "", room: "" }
      }
    ]
  },
  {
    id: 8,
    category: "safari 7-days city coast combo with-stays",
    image: "/wildlife_elephant.webp",
    flagship: true,
    price: 2200,
    solo: 450,
    stay: { tier: "PREMIUM", nights: 6, board: "Mix (B&B/FB)" },
    itinerary: [
      {
        day: 1,
        location: "Nairobi",
        morning: "Airport pickup and transfer to Ole Sereni Hotel overlooking Nairobi National Park.",
        afternoon: "David Sheldrick Elephant Orphanage and Giraffe Centre. Welcome briefing with your expedition leader.",
        evening: "Welcome dinner at the hotel's rooftop restaurant. Trip overview and itinerary confirmation.",
        journal: "The journey of a lifetime starts here. Seven days, three ecosystems, one unforgettable Kenya.",
        overnight: { name: "Ole Sereni Hotel", board: "B&B", room: "Park View Suite" }
      },
      {
        day: 2,
        location: "Nairobi → Maasai Mara",
        morning: "Domestic flight from Wilson Airport to the Mara. 45-minute flight over the Rift Valley.",
        afternoon: "Arrive at Olonana Camp on the Mara River. Lunch, then first game drive. Big Five tracking begins.",
        evening: "Sundowners on the river bank. Hippos in the water below. Dinner at camp.",
        journal: "Flying over the Rift Valley, the landscape unfolds like a living map. Then the Mara appears — endless, golden, alive.",
        overnight: { name: "Sanctuary Olonana", board: "Full Board", room: "River Suite" }
      },
      {
        day: 3,
        location: "Maasai Mara Reserve",
        morning: "Dawn game drive. Track lion prides, leopards in sausage trees, and elephant herds crossing the plains.",
        afternoon: "Full-day exploration. Mara River — crocodiles and hippo pods. Picnic lunch in the bush.",
        evening: "Optional night drive with spotlights. Dinner under the stars.",
        journal: "A leopard draped over a branch, tail swaying lazily. She watched us watching her. Neither of us blinked.",
        overnight: { name: "Sanctuary Olonana", board: "Full Board", room: "River Suite" }
      },
      {
        day: 4,
        location: "Maasai Mara",
        morning: "Hot air balloon safari at dawn (included). Float over the Mara at sunrise watching herds from above.",
        afternoon: "Champagne bush breakfast after landing. Afternoon Maasai village visit — cultural exchange and traditional dance.",
        evening: "Final Mara sunset drive. Farewell dinner at camp.",
        journal: "From a balloon at 500 feet, a herd of wildebeest looks like a river of its own. The silence up there is sacred.",
        overnight: { name: "Sanctuary Olonana", board: "Full Board", room: "River Suite" }
      },
      {
        day: 5,
        location: "Maasai Mara → Amboseli",
        morning: "Flight from Mara to Amboseli. Arrive mid-morning with Kilimanjaro dominating the horizon.",
        afternoon: "Afternoon game drive. Amboseli's famous elephant super-herds, flamingos on the dry lake bed.",
        evening: "Dinner with Mount Kilimanjaro lit by the setting sun.",
        journal: "After the Mara's grasslands, Amboseli's volcanic dust and Kilimanjaro's ice cap feel like another planet entirely.",
        overnight: { name: "Tortilis Camp", board: "Full Board", room: "Luxury Tent" }
      },
      {
        day: 6,
        location: "Amboseli → Diani Coast",
        morning: "Dawn drive in Amboseli. Final Kilimanjaro sunrise. Breakfast at camp.",
        afternoon: "Flight to the Kenyan coast. Arrive Diani Beach. Transfer to oceanfront resort.",
        evening: "Feet in the Indian Ocean sand. Swahili seafood dinner by candlelight.",
        journal: "From savanna dust to ocean breeze in a single morning. Kenya doesn't do things by halves.",
        overnight: { name: "Medina Palms", board: "Half Board", room: "Ocean Suite" }
      },
      {
        day: 7,
        location: "Diani Coast",
        morning: "Free morning — beach, snorkeling in the marine reserve, or spa. Dhow sailing available.",
        afternoon: "Farewell lunch at the resort. Transfer to Mombasa airport for departure.",
        evening: "Departure or extend your coast stay.",
        journal: "Seven days. City, savanna, mountain, ocean. You came as a visitor. You leave as someone who understands Kenya.",
        overnight: { name: "End of Tour", board: "", room: "" }
      }
    ]
  },
];

// ─── FILTER OPTIONS ───────────────────────────────────────────
export const filterOptions = [
  { label: 'common.all', value: 'all' },
  { label: 'packages.filters.city', value: 'city' },
  { label: 'packages.filters.days3', value: '3-days' },
  { label: 'packages.filters.days5', value: '5-days' },
  { label: 'packages.filters.days7', value: '7-days' },
  { label: 'packages.filters.safari', value: 'safari' },
  { label: 'packages.filters.combo', value: 'combo' },
  { label: 'packages.filters.solo', value: 'solo' },
  { label: 'packages.filters.withStays', value: 'with-stays' },
  { label: 'packages.filters.dayTrips', value: 'day-trips' },
];

// ─── SIGNATURE ADD-ONS ───────────────────────────────────────
// Premium experiences that enhance the safari
export const signatureAddons = [
  { id: 'balloon', image: "/pkg_mara_weekend.webp", price: 480, unit: "pp" },
  { id: 'heli',    image: "/dest_naivasha.webp",    price: 1250, unit: "pp" },
  { id: 'photo',   image: "/wildlife_leopard.webp",  price: 180, unit: "pp" },
  { id: 'dinner',  image: "/dest_mara.webp",         price: 85,  unit: "pp" },
];

// ─── PRACTICAL ADD-ONS ───────────────────────────────────────
// Convenience extras (icons are assigned in the component)
export const practicalAddons = [
  { id: 'village', price: 25, unit: "pp" },
  { id: 'boat',    price: 35, unit: "pp" },
  { id: 'hotel',   price: 95, unit: "pp" },
  { id: 'sim',     price: 20, unit: "pack" },
];
