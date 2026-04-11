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
  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "TourOperator",
      "name": "Savanna & Beyond",
      "url": "https://savannabeyond.co.ke",
      "logo": "https://savannabeyond.co.ke/logo.webp",
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
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Safari Packages",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "TouristTrip",
            "name": "Nairobi Morning Safari",
            "description": "Half-day guided safari experience departing from Nairobi",
            "touristType": "Adventure",
            "offers": { "@type": "Offer", "price": "95", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "TouristTrip",
            "name": "Nairobi City & Wild",
            "description": "City exploration combined with wildlife safari experience",
            "touristType": "Adventure",
            "offers": { "@type": "Offer", "price": "185", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "TouristTrip",
            "name": "Swahili Coast Escape",
            "description": "Cultural coastal experience with beach and heritage",
            "touristType": "Cultural",
            "offers": { "@type": "Offer", "price": "160", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "TouristTrip",
            "name": "Mara Weekend Safari",
            "description": "3-day Maasai Mara wildlife safari with full board accommodation",
            "touristType": "Adventure",
            "offers": { "@type": "Offer", "price": "650", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "TouristTrip",
            "name": "Amboseli Giants Safari",
            "description": "3-day Amboseli National Park safari with views of Mount Kilimanjaro",
            "touristType": "Adventure",
            "offers": { "@type": "Offer", "price": "720", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
          }
        },
        {
          "@type": "ListItem",
          "position": 6,
          "item": {
            "@type": "TouristTrip",
            "name": "Mara & Naivasha Combo",
            "description": "5-day safari combining Maasai Mara and Lake Naivasha",
            "touristType": "Adventure",
            "offers": { "@type": "Offer", "price": "1150", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
          }
        },
        {
          "@type": "ListItem",
          "position": 7,
          "item": {
            "@type": "TouristTrip",
            "name": "Nairobi Short Escape",
            "description": "City and safari combo for short-stay visitors",
            "touristType": "Adventure",
            "offers": { "@type": "Offer", "price": "450", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
          }
        },
        {
          "@type": "ListItem",
          "position": 8,
          "item": {
            "@type": "TouristTrip",
            "name": "The Complete Kenya Journey",
            "description": "7-day flagship expedition across Kenya's finest safari destinations and coast",
            "touristType": "Adventure",
            "offers": { "@type": "Offer", "price": "2200", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
          }
        }
      ]
    }
  ];

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

