import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo white">
              <span className="logo-text">Savanna<span>&Beyond</span></span>
            </div>
            <p>Crafting extraordinary journeys into the heart of Kenya's untamed wilderness. Committed to conservation and luxury.</p>
          </div>
          
          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><a href="#destinations">Our Destinations</a></li>
              <li><a href="#wildlife">The Big Five</a></li>
              <li><a href="#accommodation">Luxury Stays</a></li>
              <li><a href="#booking">Book Your Safari</a></li>
            </ul>
          </div>
          
          <div className="footer-newsletter">
            <h4>The Safari Journal</h4>
            <p>Subscribe to receive stories from the savanna and exclusive offers.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your Email Address" />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 Savanna & Beyond Expeditions. All Rights Reserved.</p>
          <div className="footer-social">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
