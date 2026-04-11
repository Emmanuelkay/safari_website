import React, { useEffect, useState } from 'react';
import { useTrip } from '../context/TripContext';
import { cn } from '../lib/utils';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const TripDrawer = () => {
  const { trip, selectPackage, toggleAddon } = useTrip();
  const [showDrawer, setShowDrawer] = useState(false);

  const calculateTotal = () => {
    let total = (trip.package?.price || 0) * (trip.guests || 2);
    trip.addons.forEach(a => total += a.price * (a.unit === 'pp' ? (trip.guests || 2) : 1));
    return total;
  };

  const hasItems = trip.package || trip.addons.length > 0;

  // Auto-show drawer when first item is added
  useEffect(() => {
    if (hasItems) {
      setShowDrawer(true);
    } else {
      setShowDrawer(false);
    }
  }, [hasItems]);

  return (
    <>
      {/* 
        DESKTOP PERSISTENT SIDEBAR 
        Appears from the right when items are selected.
      */}
      <div className="hidden lg:block">
        <AnimatePresence>
          {showDrawer && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[380px] bg-white z-[80] shadow-[-20px_0_50px_rgba(0,0,0,0.05)] border-l border-gold/10 flex flex-col pt-24"
            >
              <div className="p-10 flex flex-col h-full bg-ivory/20">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-heading text-3xl text-charcoal tracking-tight">My Trip</h3>
                  <button onClick={() => setShowDrawer(false)} aria-label="Close trip drawer" className="text-zinc-300 hover:text-charcoal transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto pr-4 space-y-10 custom-scrollbar">
                  {/* Package */}
                  {trip.package && (
                    <div className="animate-in fade-in slide-in-from-right-4">
                      <span className="text-[10px] font-bold uppercase text-gold tracking-[0.3em] mb-4 block">Selected Safari</span>
                      <div className="group relative">
                        <h4 className="font-heading text-xl text-charcoal mb-1">{trip.package.title}</h4>
                        <div className="flex justify-between items-center text-[12px] text-charcoal/50">
                          <span>${trip.package.price} pp</span>
                          <button onClick={() => selectPackage(null)} aria-label="Remove package" className="opacity-0 group-hover:opacity-100 text-earth transition-opacity">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Add-ons */}
                  {trip.addons.length > 0 && (
                    <div className="animate-in fade-in slide-in-from-right-8 delay-100">
                      <span className="text-[10px] font-bold uppercase text-gold tracking-[0.3em] mb-4 block">Add-Ons Selection</span>
                      <div className="space-y-6">
                        {trip.addons.map(a => (
                          <div key={a.id} className="group relative">
                            <div className="flex justify-between items-start">
                              <h5 className="text-[13px] font-medium text-charcoal pr-4">✓ {a.name}</h5>
                              <button onClick={() => toggleAddon(a)} aria-label={`Remove ${a.name}`} className="opacity-0 group-hover:opacity-100 text-earth transition-opacity flex-shrink-0">
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <span className="text-[11px] text-charcoal/40">${a.price} {a.unit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer / Summary */}
                <div className="mt-auto pt-10 border-t border-gold/10">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-[0.2em] block mb-2">Add-Ons Total</span>
                      <span className="text-4xl font-heading text-charcoal font-semibold">${calculateTotal().toLocaleString()}</span>
                    </div>
                    <span className="text-[10px] font-bold text-earth lowercase italic mb-1">For {trip.guests} guests</span>
                  </div>
                  
                  <a 
                    href="#booking"
                    className="w-full bg-gold text-charcoal py-6 rounded-custom font-bold uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 shadow-xl"
                  >
                    Continue to Booking <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 
        MOBILE STICKY BOTTOM BAR
        Appears when items are selected.
      */}
      <div className="lg:hidden">
        <AnimatePresence>
          {hasItems && (
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-charcoal text-ivory p-6 z-[100] shadow-[0_-10px_50px_rgba(0,0,0,0.3)] flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-1">
                  {trip.addons.length} Extras Selected
                </p>
                <p className="text-lg font-heading">${calculateTotal().toLocaleString()}</p>
              </div>
              <a 
                href="#booking"
                className="bg-gold text-charcoal px-6 py-3 rounded-custom font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"
              >
                Review <ArrowRight size={16} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAB TRIGGER (If sidebar or bar is closed) */}
      {!showDrawer && hasItems && (
        <button 
          onClick={() => setShowDrawer(true)}
          aria-label="Open trip summary"
          className="lg:block hidden fixed bottom-8 right-8 bg-charcoal text-ivory p-6 rounded-full shadow-2xl hover:bg-gold hover:text-charcoal transition-all z-[90] scale-100 opacity-100"
        >
          <ShoppingBag size={24} />
        </button>
      )}

    </>
  );
};
