import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Wildlife from './components/Wildlife';
import CityTours from './components/CityTours';
import Accommodation from './components/Accommodation';
import Packages from './components/Packages';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function App() {
  const [preSelectedPackage, setPreSelectedPackage] = React.useState('');

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
          reveals[i].classList.add('active');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Destinations />
        <Wildlife />
        <CityTours />
        <Accommodation />
        <Packages setPreSelectedPackage={setPreSelectedPackage} />
        <BookingForm preSelectedPackage={preSelectedPackage} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
