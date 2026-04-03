import React from 'react';
import './Wildlife.css';
import lionImg from '../assets/lion.png';
import leopardImg from '../assets/leopard.png';
import elephantImg from '../assets/amboseli.png'; // Reusing the Amboseli image for elephants

const wildlife = [
  {
    id: 1,
    name: 'The King of the Mara',
    species: 'African Lion',
    image: lionImg,
    description: 'Experience the roar that defines the African wilderness. The Maasai Mara hosts one of the highest concentrations of lions in the world.'
  },
  {
    id: 2,
    name: 'The Elusive Tracker',
    species: 'African Leopard',
    image: leopardImg,
    description: 'Masters of stealth and survival, the leopard is the crown jewel of Samburu’s rugged landscapes.'
  },
  {
    id: 3,
    name: 'The Gentle Giants',
    species: 'African Elephant',
    image: elephantImg,
    description: 'From the red elephants of Tsavo to the mountain-backed herds of Amboseli, Kenya’s elephants are a sight to behold.'
  }
];

const Wildlife = () => {
  return (
    <section id="wildlife" className="wildlife-section section-padding">
      <div className="container">
        <div className="wildlife-header reveal">
          <h2 className="section-title">The Wildlife of Kenya</h2>
          <p className="section-subtitle">Beyond the Big Five, a tapestry of life awaits. witnessing the Great Migration is a life-changing experience.</p>
        </div>
        
        <div className="wildlife-row">
          {wildlife.map((item, index) => (
            <div key={item.id} className={`wildlife-item reveal ${index % 2 !== 0 ? 'reverse' : ''}`}>
              <div className="wildlife-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="wildlife-text">
                <span className="species">{item.species}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="wildlife-stats">
                  <div className="stat">
                    <span className="stat-label">Rarity</span>
                    <span className="stat-value">★★★★★</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Best Seen</span>
                    <span className="stat-value">Jul - Oct</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wildlife;
