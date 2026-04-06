import React from 'react';
import { Hero } from '../components/Hero';
import { Packages } from '../components/Packages';
import { AddOns } from '../components/AddOns';
import { Destinations } from '../components/Destinations';
import { WildlifeTracker } from '../components/WildlifeTracker';
import { BookingEngine } from '../components/BookingEngine';
import { SocialProof } from '../components/SocialProof';

export const Home = () => {
  return (
    <>
      <Hero />
      <div id="packages">
        <Packages />
      </div>
      <div id="addons">
        <AddOns />
      </div>
      <div id="destinations">
        <Destinations />
      </div>
      <div id="wildlife">
        <WildlifeTracker />
      </div>
      <SocialProof />
      <div id="booking">
        <BookingEngine />
      </div>
    </>
  );
};

