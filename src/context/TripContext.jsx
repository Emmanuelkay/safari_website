import React, { createContext, useContext, useState } from 'react';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trip, setTrip] = useState({
    package: null,
    addons: [],
    dates: '',
    guests: 2,
    tier: 'Premium'
  });

  const selectPackage = (pkg) => {
    setTrip(prev => ({ ...prev, package: pkg }));
  };

  const toggleAddon = (addon) => {
    setTrip(prev => ({
      ...prev,
      addons: prev.addons.find(a => a.id === addon.id)
        ? prev.addons.filter(a => a.id !== addon.id)
        : [...prev.addons, addon]
    }));
  };

  const updateGuests = (count) => {
    setTrip(prev => ({ ...prev, guests: count }));
  };

  const updateDates = (dates) => {
    setTrip(prev => ({ ...prev, dates }));
  };

  return (
    <TripContext.Provider value={{ trip, selectPackage, toggleAddon, updateGuests, updateDates }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) throw new Error('useTrip must be used within a TripProvider');
  return context;
};
