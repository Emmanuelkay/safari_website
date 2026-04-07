import React from 'react';
import { Hero } from '../components/Hero';
import { Packages } from '../components/Packages';
import { AddOns } from '../components/AddOns';
import { Destinations } from '../components/Destinations';
import { WildlifeTracker } from '../components/WildlifeTracker';
import { BookingEngine } from '../components/BookingEngine';
import { SocialProof } from '../components/SocialProof';
import { SEO } from '../components/SEO';

import { Guides } from '../components/Guides';

export const Home = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TourOperator",
    "name": "Savanna & Beyond",
    "url": "https://savannabeyond.co.ke",
    "logo": "https://savannabeyond.co.ke/logo.png",
    "description": "Best luxury safari in Kenya, offering private Maasai Mara safaris and custom Kenya wildlife tours.",
    "telephone": "+254718592358",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Wilson Airport Plaza V",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "employee": [
      { "@type": "Person", "name": "James", "jobTitle": "Lead Safari Guide", "knowsLanguage": ["en"] },
      { "@type": "Person", "name": "Klaus", "jobTitle": "Lead Safari Guide", "knowsLanguage": ["en", "de"] },
      { "@type": "Person", "name": "Amara", "jobTitle": "Lead Safari Guide", "knowsLanguage": ["en", "fr"] },
      { "@type": "Person", "name": "Allan", "jobTitle": "Lead Safari Guide", "knowsLanguage": ["en", "es"] },
      { "@type": "Person", "name": "Wei", "jobTitle": "Lead Safari Guide", "knowsLanguage": ["en", "zh"] }
    ]
  };

  return (
    <>
      <SEO 
        title="Best Luxury Safari Kenya | Private Maasai Mara Safaris & Tours"
        description="Experience the best luxury safari in Kenya with Savanna & Beyond. Private Kenya wildlife tours, exclusive Maasai Mara safari packages from Nairobi HQ."
        url="https://savannabeyond.co.ke"
        schemaData={schemaData}
      />
      <main>
        <Hero />
        <section id="packages">
          <Packages />
        </section>
        <section id="guides">
          <Guides />
        </section>
        <section id="addons">
          <AddOns />
        </section>
        <section id="destinations">
          <Destinations />
        </section>
        <section id="wildlife">
          <WildlifeTracker />
        </section>
        <SocialProof />
        <section id="booking">
          <BookingEngine />
        </section>
      </main>
    </>
  );
};

