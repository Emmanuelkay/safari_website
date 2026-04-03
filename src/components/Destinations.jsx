import React from 'react';
import './Destinations.css';
import maraImg from '../assets/mara.png';
import amboseliImg from '../assets/amboseli.png';
import samburuImg from '../assets/samburu.png';

const destinations = [
  {
    id: 1,
    name: 'Maasai Mara',
    description: 'The theater of the Great Migration and home to the Big Five.',
    image: maraImg,
    tag: 'Iconic'
  },
  {
    id: 2,
    name: 'Amboseli',
    description: 'Majestic elephants framed by the snow-capped Mount Kilimanjaro.',
    image: amboseliImg,
    tag: 'Majestic'
  },
  {
    id: 3,
    name: 'Samburu',
    description: 'A rugged north with unique wildlife found nowhere else in Kenya.',
    image: samburuImg,
    tag: 'Untamed'
  }
];

const Destinations = () => {
  return (
    <section id="destinations" className="destinations section-padding">
      <div className="container">
        <h2 className="section-title reveal">Kenyan Destinations</h2>
        <p className="section-subtitle reveal">Explore the diverse landscapes and rich biodiversity of the Jewel of East Africa.</p>
        
        <div className="destinations-grid">
          {destinations.map(dest => (
            <div key={dest.id} className="destination-card reveal">
              <div className="card-image">
                <img src={dest.image} alt={dest.name} />
                <span className="card-tag">{dest.tag}</span>
              </div>
              <div className="card-content">
                <h3>{dest.name}</h3>
                <p>{dest.description}</p>
                <a href="#booking" className="card-link">Explore More &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
