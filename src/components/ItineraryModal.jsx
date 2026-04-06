import React from 'react';
import { X, MapPin, Moon, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const ItineraryModal = ({ isOpen, onClose, pkg }) => {
  if (!pkg) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-lg"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="relative w-full max-w-[720px] h-full md:h-auto md:max-h-[90vh] bg-ivory overflow-hidden flex flex-col md:rounded-lg shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-gold/10 flex justify-between items-center bg-white">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] block mb-2">Expedition Details</span>
                <h2 className="text-4xl font-heading text-charcoal">{pkg.title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-zinc-100 rounded-full transition-colors"
                aria-label="Close Modal"
              >
                <X size={24} className="text-charcoal" />
              </button>
            </div>

            {/* Scrollable Itinerary */}
            <div className="flex-grow overflow-y-auto p-8 space-y-12 pb-32">
              {pkg.itinerary?.map((day, idx) => (
                <div key={idx} className="relative pl-10 border-l border-gold/20">
                  {/* Day Marker */}
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-gold rounded-full border-4 border-ivory flex items-center justify-center" />
                  
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-ochre font-heading text-xl">Day {day.day}</span>
                    <span className="text-zinc-300">—</span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-charcoal uppercase tracking-widest bg-zinc-100 px-2 py-1 rounded">
                      <MapPin size={12} className="text-ochre" /> {day.location}
                    </span>
                  </div>

                  <div className="grid gap-8">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Morning</span>
                        <p className="text-charcoal font-body leading-relaxed">{day.morning}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Afternoon</span>
                        <p className="text-charcoal font-body leading-relaxed">{day.afternoon}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Evening</span>
                        <p className="text-charcoal font-body leading-relaxed">{day.evening}</p>
                      </div>
                    </div>

                    {/* Field Journal Note */}
                    <div className="bg-earth/5 p-6 rounded italic text-sm text-earth leading-relaxed border-l-2 border-earth/20 font-body">
                      "{day.journal}"
                    </div>

                    {/* Overnight Segment */}
                    <div className="bg-white p-6 rounded border border-gold/10 shadow-sm flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center text-gold">
                            <Moon size={20} />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Overnight</span>
                            <h4 className="font-heading text-lg text-gold">{day.overnight.name}</h4>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className="text-[10px] font-medium text-charcoal/60 block">{day.overnight.board}</span>
                          <span className="text-[10px] font-medium text-charcoal/60 block">{day.overnight.room}</span>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Fix */}
            <div className="absolute bottom-0 left-0 w-full p-8 bg-linear-to-t from-white via-white/90 to-transparent flex justify-center">
              <a 
                href="#booking" 
                onClick={onClose}
                className="w-full bg-gold text-charcoal py-5 rounded-custom font-bold uppercase tracking-[0.3em] text-[12px] shadow-2xl flex items-center justify-center gap-3 transition-transform hover:-translate-y-1"
              >
                Book This Trip <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
