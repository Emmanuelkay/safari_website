import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar glass ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="logo">
          <span className="logo-text">Savanna<span>&Beyond</span></span>
        </div>
        <ul className="nav-links">
          <li><a href="#destinations">Destinations</a></li>
          <li><a href="#wildlife">Wildlife</a></li>
          <li><a href="#city-tours">City Tours</a></li>
          <li><a href="#packages">Packages</a></li>
          <li><a href="#accommodation">Stays</a></li>
          <li><a href="#booking" className="btn-primary">Book Your Journey</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
