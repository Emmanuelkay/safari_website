import React from 'react';
import './Accommodation.css';
import lodgeImg from '../assets/lodge.png';

const Accommodation = () => {
  return (
    <section id="accommodation" className="accommodation-section section-padding">
      <div className="container">
        <div className="accommodation-header reveal">
          <h2 className="section-title">Beyond Luxury</h2>
          <p className="section-subtitle">Our curated selection of Kenyan lodges blends sophisticated design with the raw beauty of the savanna.</p>
        </div>
        
        <div className="accommodation-content reveal">
          <div className="lodge-featured">
            <div className="lodge-image">
              <img src={lodgeImg} alt="Luxury lodge in Kenya" />
            </div>
            <div className="lodge-info glass">
              <span className="lodge-tag">Featured lodge</span>
              <h3>The Mara Horizon Suite</h3>
              <p>Perched on the Oloololo Escarpment, offering unparalleled views of the migration below. Every suite features floor-to-ceiling windows and a private infinity pool.</p>
              <ul className="lodge-features">
                <li><span>✦</span> All-inclusive Fine Dining</li>
                <li><span>✦</span> Private Guided Safaris</li>
                <li><span>✦</span> Panoramic Savanna Views</li>
              </ul>
              <a href="#booking" className="btn-primary">Reserve Your Stay</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accommodation;
