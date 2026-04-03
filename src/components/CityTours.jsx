import React from 'react';
import './CityTours.css';
import nairobiImg from '../assets/nairobi.png';
import mombasaImg from '../assets/mombasa.png';
import zanzibarImg from '../assets/zanzibar.png';
import kisumuImg from '../assets/kisumu.png';

const cities = [
  {
    id: 'nairobi',
    name: 'Nairobi',
    label: 'THE SAFARI CAPITAL',
    tagline: 'Where wilderness meets the boardroom',
    image: nairobiImg,
    duration: '1–2 Days',
    highlights: [
      'Nairobi National Park', 'Elephant Orphanage', 'Giraffe Centre',
      'Karen Blixen Museum', 'Maasai Market', 'Carnivore Restaurant'
    ],
    bestFor: 'Pre/post safari layovers'
  },
  {
    id: 'mombasa',
    name: 'Mombasa',
    label: 'THE SWAHILI COAST',
    tagline: 'Ancient port city, coral reefs, and ocean breezes',
    image: mombasaImg,
    duration: '2–3 Days',
    highlights: [
      'Fort Jesus (UNESCO)', 'Old Town Walking Tour', 'Haller Park',
      'Dhow Cruise', 'Swahili Street Food', 'Diani Beach Extension'
    ],
    bestFor: 'Beach extensions, cultural immersion'
  },
  {
    id: 'zanzibar',
    name: 'Zanzibar',
    label: 'SPICE ISLAND',
    tagline: 'Cobblestone alleys, clove-scented air, turquoise water',
    image: zanzibarImg,
    duration: '3–5 Days',
    highlights: [
      'Stone Town UNESCO Tour', 'Spice Farm Visit', 'Prison Island',
      'Forodhani Night Market', 'Nungwi Beach', 'Jozani Forest'
    ],
    bestFor: 'Post-safari beach retreat'
  },
  {
    id: 'kisumu',
    name: 'Kisumu',
    label: 'LAKESIDE CITY',
    tagline: 'Sunsets over Africa\'s greatest lake',
    image: kisumuImg,
    duration: '1–2 Days',
    highlights: [
      'Impala Sanctuary', 'Kit Mikayi Sacred Rock', 'Ndere Island',
      'Sunset Dhow Ride', 'Dunga Beach Lunch', 'Tea Plantation Tours'
    ],
    bestFor: 'Off-the-beaten-path, authentic culture'
  }
];

const packages = [
  {
    id: 'pkg-a',
    name: 'Nairobi Half-Day City Tour',
    duration: '4–5 hours',
    price: '$85',
    includes: ['Private vehicle', 'Expert guide', 'Entry fees', 'Bottled water'],
    stops: 'Giraffe Centre → Elephant Orphanage → Karen Blixen Museum',
    bestFor: 'Pre-safari arrivals'
  },
  {
    id: 'pkg-b',
    name: 'Mombasa Old Town & Coast Full Day',
    duration: '8–9 hours',
    price: '$140',
    includes: ['Driver-guide', 'Fort Jesus entry', 'Swahili lunch', 'Dhow cruise'],
    stops: 'Fort Jesus → Old Town → Spice Market → Dhow Sunset',
    bestFor: 'History lovers'
  },
  {
    id: 'pkg-c',
    name: 'Nairobi + Safari Combo (2 Days)',
    duration: '2 days / 1 night',
    price: '$450',
    includes: ['City hotel night', 'Full city tour', 'Park game drive', 'Transfers'],
    stops: 'Day 1 City Highlights → Day 2 Nairobi National Park',
    bestFor: 'Short-haul visitors'
  },
  {
    id: 'pkg-d',
    name: 'Zanzibar Extension (4 Days)',
    duration: '4 days',
    price: '$1,200',
    includes: ['Flights from NBO', 'Boutique hotel', 'Stone Town tour', 'Beach day'],
    stops: 'Stone Town → Spice Farm → Nungwi Beach → Snorkelling',
    bestFor: 'Post-safari wind-down'
  }
];

const experiences = [
  { icon: '🏛', title: 'Cultural & Heritage Tours', desc: 'Guided walks through history and traditions.' },
  { icon: '🍽', title: 'Culinary & Food Tours', desc: 'Street food safaris and cooking classes.' },
  { icon: '🛍', title: 'Market & Craft Tours', desc: 'Maasai Market and artisan workshop visits.' },
  { icon: '🚢', title: 'Dhow & Coastal Cruises', desc: 'Sunset sails on traditional wooden boats.' },
  { icon: '📸', title: 'Photography City Walks', desc: 'Golden-hour shoots with a pro guide.' },
  { icon: '🐘', title: 'Urban Wildlife Encounters', desc: 'Giraffes, elephants, and park drives.' },
  { icon: '🎭', title: 'Maasai Cultural Evening', desc: 'Traditional dance and village dinner.' },
  { icon: '✈', title: 'Airport Transfer & City Stay', desc: 'Seamless connections and curated stays.' }
];

const CityTours = () => {
  return (
    <div id="city-tours" className="city-tours">
      {/* SECTION 1: HERO */}
      <section className="city-hero reveal">
        <div className="city-hero-overlay"></div>
        <div className="container">
          <div className="city-hero-content">
            <span className="accent-line"></span>
            <h2>Beyond the Plains</h2>
            <p>Kenya's cities pulse with culture, history, and flavour. Let us show you the side of Africa that most travelers never see.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: DESTINATIONS GRID */}
      <section className="city-destinations section-padding">
        <div className="container">
          <div className="city-grid">
            {cities.map(city => (
              <div key={city.id} className="city-card reveal">
                <div className="city-card-image">
                  <img src={city.image} alt={city.name} />
                  <span className="duration-badge">{city.duration}</span>
                </div>
                <div className="city-card-content">
                  <span className="city-label">{city.label}</span>
                  <h3>{city.name}</h3>
                  <p className="tagline">{city.tagline}</p>
                  <ul className="city-highlights">
                    {city.highlights.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                  <div className="city-best"><span>Best for:</span> {city.bestFor}</div>
                  <a href="#booking" className="city-explore">Explore City Tour →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PACKAGES */}
      <section className="city-packages section-padding">
        <div className="container">
          <h2 className="section-title reveal">City Tour Packages</h2>
          <div className="package-grid">
            {packages.map(pkg => (
              <div key={pkg.id} className="package-card reveal">
                <div className="pkg-header">
                  <span className="pkg-duration">{pkg.duration}</span>
                  <h3>{pkg.name}</h3>
                </div>
                <div className="pkg-price">
                  <span className="from">from</span> {pkg.price} <span className="pp">pp</span>
                </div>
                <ul className="pkg-includes">
                  {pkg.includes.map((inc, i) => <li key={i}>✓ {inc}</li>)}
                </ul>
                <div className="pkg-stops">
                  <strong>Stops:</strong> {pkg.stops}
                </div>
                <div className="pkg-btns">
                  <a href="#booking" className="btn-primary">Book This Tour</a>
                  <a href="#booking" className="btn-text">Customise →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: COMBO BANNER */}
      <section className="combo-banner reveal">
        <div className="container">
          <div className="combo-content">
            <h2>The Complete Kenya Experience</h2>
            <p>Begin with the rhythm of Nairobi, venture into the wilderness of the Mara, and end with the warm tides of the Indian Ocean. One journey. Three worlds.</p>
            
            <div className="combo-visual">
              <div className="combo-step">
                <span className="icon">🏙</span>
                <span>Nairobi</span>
              </div>
              <div className="combo-arrow">→</div>
              <div className="combo-step">
                <span className="icon">🐾</span>
                <span>Safari</span>
              </div>
              <div className="combo-arrow">→</div>
              <div className="combo-step">
                <span className="icon">🌊</span>
                <span>Coast</span>
              </div>
            </div>
            
            <a href="#booking" className="btn-primary gold">Build My Kenya Journey</a>
          </div>
        </div>
      </section>

      {/* SECTION 5: EXPERIENCES GRID */}
      <section className="city-experiences section-padding">
        <div className="container">
          <div className="exp-grid">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-item reveal">
                <span className="exp-icon">{exp.icon}</span>
                <div className="exp-text">
                  <h4>{exp.title}</h4>
                  <p>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CityTours;
