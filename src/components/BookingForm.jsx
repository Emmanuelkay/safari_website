import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ preSelectedPackage }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(preSelectedPackage || 'migration');

  // Update selection if prop changes
  React.useEffect(() => {
    if (preSelectedPackage) {
      setSelectedExperience(preSelectedPackage);
    }
  }, [preSelectedPackage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="booking" className="booking-section section-padding">
      <div className="container">
        <div className="booking-card reveal">
          <div className="booking-info">
            <h2>Reserve Your Kenyan Odyssey</h2>
            <p>Our travel specialists will craft a bespoke itinerary tailored to your desires. Let the journey begin.</p>
            <div className="contact-details">
              <div className="detail-item">
                <span className="icon">✉</span>
                <span>expeditions@savannabeyond.co.ke</span>
              </div>
              <div className="detail-item">
                <span className="icon">☏</span>
                <span>+254 700 000 000</span>
              </div>
            </div>
          </div>
          
          <div className="booking-form-wrapper">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" required placeholder="john@example.com" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="guests">Number of Guests</label>
                    <input type="number" id="guests" min="1" max="10" placeholder="2" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="season">Preferred Experience</label>
                    <select 
                      id="season" 
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                    >
                      <option value="migration">The Great Migration (Jul-Oct)</option>
                      <option value="calving">Calving Season (Jan-Feb)</option>
                      <option value="green">The Green Season (Nov-Dec)</option>
                      <option value="c1">Nairobi Essential Half Day</option>
                      <option value="c2">Nairobi Full Day Explorer</option>
                      <option value="c3">Mombasa Old Town & Coast</option>
                      <option value="s1">Maasai Mara Weekend Escape</option>
                      <option value="s2">Amboseli & Kilimanjaro Views</option>
                      <option value="s3">Mara + Naivasha Combo</option>
                      <option value="s4">The Full Kenya (7 Days)</option>
                      <option value="zanzibar">Zanzibar Extension Only</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Trip Type</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input type="radio" name="tripType" value="safari" /> Safari Only
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="tripType" value="city" /> City Tour Only
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="tripType" value="combo" defaultChecked /> Safari + City Combo
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Vision</label>
                  <textarea id="message" rows="4" placeholder="Tell us about your dream safari..."></textarea>
                </div>
                <button type="submit" className="btn-primary">Request Itinerary</button>
              </form>
            ) : (
              <div className="form-success">
                <h3>Asante Sana!</h3>
                <p>We've received your inquiry. One of our lead guides will contact you within 24 hours to begin crafting your journey.</p>
                <div className="success-icon">✓</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
