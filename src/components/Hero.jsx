import React from 'react';
import './Hero.css';
import heroImg from '../assets/hero-kenya.png';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <img src={heroImg} alt="Maasai Mara Sunset" className="hero-bg" />
      <div className="container hero-content">
        <h1 className="reveal">Unforgettable Kenya</h1>
        <p className="reveal">Experience the wild heart of Africa. From the golden plains of the Maasai Mara to the majestic peaks of Kilimanjaro.</p>
        <div className="hero-btns reveal">
          <a href="#destinations" className="btn-primary">Explore Destinations</a>
          <a href="#booking" className="btn-outline">Inquire Now</a>
        </div>
      </div>
      <div className="hero-search-bar reveal">
        <div className="search-field">
          <label>Where to?</label>
          <input type="text" placeholder="e.g. Maasai Mara, Diani" />
        </div>
        <div className="search-field">
          <label>When?</label>
          <select>
            <option>Anytime</option>
            <option>Next 3 Months</option>
            <option>High Season (Jul-Oct)</option>
          </select>
        </div>
        <div className="search-field">
          <label>Travelers</label>
          <select>
            <option>2 Adults</option>
            <option>Family (2+2)</option>
            <option>Solo Traveler</option>
          </select>
        </div>
        <button className="btn-primary search-btn" onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}>
          Search Tours
        </button>
      </div>
      <div className="scroll-indicator">
        <span>Scroll to Explore</span>
        <div className="dot"></div>
      </div>
    </section>
  );
};

export default Hero;
