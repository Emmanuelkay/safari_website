import React, { useState } from 'react';
import './Packages.css';
import nairobiImg from '../assets/nairobi_tour.png';
import maasaiImg from '../assets/maasai_mara.png';
import amboseliImg from '../assets/amboseli.png';
import naivashaImg from '../assets/naivasha.png';

const Packages = ({ setPreSelectedPackage }) => {
  const [pricingMode, setPricingMode] = useState('pp'); // 'pp' or 'total'
  const [expandedId, setExpandedId] = useState(null);

  const cityPackages = [
    {
      id: 'c1',
      name: 'Nairobi Essential Half Day',
      image: nairobiImg,
      duration: '4–5 hours (morning departure 8am)',
      price: 95,
      solo: 45,
      group4: 75,
      inclusions: [
        'Private 4x4 with pop-up roof',
        'Professional KWS certified guide',
        'Giraffe Centre entry & feeding',
        'Elephant Orphanage & Karen Blixen'
      ],
      notIncluded: ['Lunch', 'Tips', 'Personal items'],
      bestFor: 'Arriving travelers with 1 free day',
      bookBy: '48 hours in advance',
      itinerary: '8:00 AM: Hotel pickup. 9:00 AM: Giraffe Centre. 11:00 AM: David Sheldrick Elephant Orphanage. 1:00 PM: Karen Blixen Museum. 2:00 PM: Drop-off.'
    },
    {
      id: 'c2',
      name: 'Nairobi Full Day Explorer',
      image: nairobiImg,
      duration: '8–9 hours (7:30am departure)',
      price: 185,
      solo: 65,
      group4: 155,
      inclusions: [
        'Private 4x4 full day',
        'Nairobi National Park game drive',
        'Giraffe Centre & Elephant Orphanage',
        'Lunch at a top local restaurant'
      ],
      notIncluded: ['NNP entry fees ($43)', 'Extra drinks', 'Tips'],
      bestFor: 'First-time visitors wanting the full picture',
      itinerary: '7:30 AM: Pickup. 8:00 AM: NNP Game Drive. 11:00 AM: Elephant Orphanage. 12:30 PM: Giraffe Centre. 1:30 PM: Lunch (Carnivore/Habesha). 3:00 PM: Railway Museum. 4:30 PM: Drop-off.'
    },
    {
      id: 'c3',
      name: 'Mombasa Old Town & Coast',
      image: 'https://images.unsplash.com/photo-1615887023516-724f2b0ce8c1?auto=format&fit=crop&q=80&w=800',
      duration: 'Full day (8 hours)',
      price: 160,
      solo: 55,
      group4: 130,
      inclusions: [
        'Private AC vehicle + driver',
        'Fort Jesus entry (UNESCO)',
        'Traditional Swahili lunch',
        'Sunset dhow cruise (1.5 hrs)'
      ],
      notIncluded: ['Dhow drinks', 'Audio guide', 'Shopping'],
      bestFor: 'Beach resort guests wanting cultural immersion',
      bookBy: '48 hours in advance',
      itinerary: '9:00 AM: Hotel pickup. 10:00 AM: Fort Jesus & Old Town walk. 1:00 PM: Swahili Lunch. 2:30 PM: Haller Park. 5:00 PM: Sunset Dhow Cruise. 7:00 PM: Drop-off.'
    }
  ];

  const safariPackages = [
    {
      id: 's1',
      name: 'Maasai Mara Weekend Escape',
      image: maasaiImg,
      duration: '3 days / 2 nights',
      price: 650,
      solo: 180,
      group4: 550,
      badge: 'Best Entry-Level Safari',
      inclusions: [
        'Return road transfer NBO ↔ Mara',
        '2 nights full board (FB)',
        '3 game drives in private 4x4',
        'KWS certified guide & Park fees'
      ],
      notIncluded: ['Alcoholic drinks', 'Balloon safari', 'Tips'],
      bestFor: 'First safari, weekend warriors',
      itinerary: [
        'Day 1: Nairobi pickup 7am → road transfer to Mara → afternoon game drive → sundowner & bush dinner.',
        'Day 2: Full day in the Mara (dawn drive, brunch, afternoon drive). Optional: Maasai village visit.',
        'Day 3: Dawn game drive → breakfast → depart Mara → arrive Nairobi ~4pm.'
      ]
    },
    {
      id: 's2',
      name: 'Amboseli & Kilimanjaro Views',
      image: amboseliImg,
      duration: '3 days / 2 nights',
      price: 720,
      solo: 200,
      group4: 600,
      inclusions: [
        'Return private transfer',
        '2 nights full board eco-lodge',
        '3 game drives + guide',
        'Park fees & Observation Hill walk'
      ],
      notIncluded: ['Cultural visit ($25)', 'Drinks', 'Tips'],
      bestFor: 'Photographers & elephant lovers',
      itinerary: [
        'Day 1: Nairobi 7am → Amboseli → afternoon drive (elephants vs Kili backdrop) → sundowner.',
        'Day 2: Dawn drive (best Kili views) → full day game viewing (flamingos, Big Five) → campfire stories.',
        'Day 3: Final morning drive → depart 10am → Nairobi by 2pm.'
      ]
    },
    {
      id: 's3',
      name: 'Mara + Naivasha Combo',
      image: naivashaImg,
      duration: '5 days / 4 nights',
      price: 1150,
      solo: 280,
      group4: 980,
      badge: 'Most Popular',
      inclusions: [
        'All transfers (private 4x4)',
        '4 nights mixed lodge/camp',
        'Naivasha boat ride & Hell\'s gate cycling',
        '3 Mara game drives & all fees'
      ],
      notIncluded: ['Balloon safari', 'Nairobi hotel', 'Tips'],
      bestFor: 'Couples and variety seekers',
      itinerary: [
        'Day 1: Nairobi → Lake Naivasha (boat ride, cycling) → lakeside lodge.',
        'Day 2: Crescent Island walk → depart → Maasai Mara afternoon drive.',
        'Day 3: Full day Mara (Big Five tracking, river viewpoint).',
        'Day 4: Dawn drive → depart Mara → arrive Nairobi evening.',
        'Day 5: Optional Nairobi city tour add-on.'
      ]
    },
    {
      id: 's4',
      name: 'The Full Kenya (7 Days)',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
      duration: '7 days / 6 nights',
      price: 2200,
      solo: 450,
      group4: 1900,
      inclusions: [
        'All ground transfers',
        '6 nights mixed accommodation',
        'City, Amboseli, Mara & Mombasa tours',
        'All park fees & expert guides'
      ],
      notIncluded: ['Intl flights', 'Mombasa-NBO flight', 'Drinks & tips'],
      bestFor: 'First-time visitors wanting the complete journey',
      itinerary: [
        'Day 1: Arrival → City Tour → Nairobi overnight.',
        'Day 2-3: Amboseli wildlife & views.',
        'Day 4-5: Maasai Mara Big Five tracking.',
        'Day 6: Drive/fly to Mombasa → Old Town tour.',
        'Day 7: Beach afternoon → airport drop-off.'
      ]
    }
  ];

  const addons = [
    { name: 'Hot Air Balloon Safari', price: '+$480pp' },
    { name: 'Scenic Helicopter Flight', price: '+$320pp' },
    { name: 'Maasai Village Visit', price: '+$25pp' },
    { name: 'Private Photography Guide', price: '+$180pp' },
    { name: 'Bush Dinner Under Stars', price: '+$85pp' },
    { name: 'Lake Naivasha Boat Ride', price: '+$35pp' },
    { name: 'Nairobi Airport Hotel', price: '+$95pp' },
    { name: 'Domestic Flight Upgrade', price: '+$380pp' },
    { name: 'Zanzibar Extension (4d)', price: '+$1,200pp' },
    { name: 'Concierge Planning Call', price: 'FREE' }
  ];

  const handleBook = (pkgId) => {
    setPreSelectedPackage(pkgId);
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderCard = (pkg) => {
    const displayPrice = pricingMode === 'pp' ? pkg.price : pkg.price * 2;
    
    return (
      <div key={pkg.id} className={`package-card reveal ${pkg.badge ? 'has-badge' : ''}`}>
        <div className="card-image-wrap">
          {pkg.badge && <span className="package-badge">{pkg.badge}</span>}
          <img src={pkg.image} alt={pkg.name} className="package-img" />
        </div>
        <div className="card-body">
          <div className="card-top">
            <span className="pkg-duration-tag">{pkg.duration}</span>
            <h3>{pkg.name}</h3>
            <div className="price-display">
              <span className="price-main">${displayPrice.toLocaleString()}</span>
              <span className="price-label">
                {pricingMode === 'pp' ? 'per person' : 'total for 2'}
              </span>
            </div>
            <p className="occupancy-note">Based on 2 travelers, double occupancy</p>
          </div>

          <div className="card-features">
          <ul className="checkmark-list">
            {pkg.inclusions.slice(0, 4).map((inc, i) => (
              <li key={i}>✓ {inc}</li>
            ))}
          </ul>
        </div>

        <div className="card-footer">
          <div className="supplement-info">
            <span>Solo Traveler: +${pkg.solo}</span>
            <span>Group (4+): ${pkg.group4}pp</span>
          </div>
          
          <button className="btn-expand" onClick={() => toggleExpand(pkg.id)}>
            {expandedId === pkg.id ? 'Hide Details' : 'View Full Details'}
          </button>
          
          <div className={`itinerary-collapse ${expandedId === pkg.id ? 'expanded' : ''}`}>
            <div className="itinerary-inner">
              <h4>Full Itinerary</h4>
              {Array.isArray(pkg.itinerary) ? (
                <ul>{pkg.itinerary.map((line, i) => <li key={i}>{line}</li>)}</ul>
              ) : (
                <p>{pkg.itinerary}</p>
              )}
              <div className="not-included">
                <strong>Not Included:</strong> {pkg.notIncluded.join(', ')}
              </div>
            </div>
          </div>

          <p className="urgency-line">⚡ Limited availability — only 3 vehicles/departure</p>
          
          <button className="btn-primary full-width" onClick={() => handleBook(pkg.id)}>
            Book This Package
          </button>
        </div>
      </div>
      </div>
    );
  };

  return (
    <section id="packages" className="packages-section section-padding">
      <div className="container">
        <div className="packages-header reveal">
          <h2 className="section-title">Experiences & Pricing</h2>
          <p className="section-subtitle">Expert curation at a fair price. Transparent, all-inclusive, and designed for unforgettable memories.</p>
          
          <div className="pricing-toggle">
            <button 
              className={pricingMode === 'pp' ? 'active' : ''} 
              onClick={() => setPricingMode('pp')}
            >
              Per Person
            </button>
            <button 
              className={pricingMode === 'total' ? 'active' : ''} 
              onClick={() => setPricingMode('total')}
            >
              Total for 2
            </button>
          </div>
        </div>

        <div className="package-group">
          <h3 className="group-title reveal">City Tour Packages</h3>
          <div className="package-cards">
            {cityPackages.map(renderCard)}
          </div>
        </div>

        <div className="package-group">
          <h3 className="group-title reveal">Safari Packages</h3>
          <div className="package-cards safari">
            {safariPackages.map(renderCard)}
          </div>
        </div>

        <div className="addons-section reveal">
          <h3 className="group-title">Combo Add-ons & Upsells</h3>
          <div className="addons-grid">
            {addons.map((addon, i) => (
              <div key={i} className="addon-item">
                <div className="addon-plus">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
                </div>
                <div className="addon-info">
                  <span className="addon-name">{addon.name}</span>
                  <span className="addon-price">{addon.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="payment-note reveal">
          <p><strong>Payment Terms:</strong> 30% deposit to confirm your booking. Balance due 30 days before travel. We accept credit/debit cards, M-Pesa, and direct bank transfers.</p>
        </div>
      </div>
    </section>
  );
};

export default Packages;
