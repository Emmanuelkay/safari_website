import React, { useState } from 'react';
import { Check, ChevronRight, Clock, MapPin, Users, Moon, Star, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { ItineraryModal } from './ItineraryModal';
import { useTrip } from '../context/TripContext';
import { useTranslation } from 'react-i18next';
import { filterOptions } from '../data/packages';
import { usePackages } from '../hooks/usePackages';

const PackageCard = ({ pkg, onOpenItinerary }) => {
  const { t } = useTranslation();
  const { trip, selectPackage } = useTrip();
  const isFlagship = pkg.flagship;
  const isSelected = trip.package?.id === pkg.id;

  // Dynamically get translated strings
  const title = t(`packages.p${pkg.id}.title`);
  const desc = t(`packages.p${pkg.id}.desc`);
  const duration = t(`packages.p${pkg.id}.duration`);
  const inclusions = t(`packages.p${pkg.id}.inclusions`, { returnObjects: true });
  const stayName = t(`packages.p${pkg.id}.stay.name`);

  return (
    <div className={cn(
      "border rounded-lg overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(139,105,20,0.15)]",
      isFlagship 
        ? "bg-charcoal border-gold/40 ring-1 ring-gold/20" 
        : "bg-white border-zinc-200 hover:border-gold/30"
    )}>
      {/* Top Media */}
      <div className="h-64 relative overflow-hidden bg-black">
        <img
          src={pkg.image}
          alt={title}
          loading="lazy"
          width={400}
          height={256}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60 opacity-60" />
        
        <span className="absolute top-5 left-5 bg-charcoal/80 backdrop-blur-md text-ivory px-3 py-1.5 text-[10px] font-bold rounded-[4px] tracking-widest uppercase z-20">
          {duration}
        </span>
        
        {isFlagship && (
          <span className="absolute top-5 right-5 bg-gold text-charcoal px-3 py-1.5 text-[10px] font-bold rounded-[4px] tracking-widest uppercase z-20 shadow-lg">
            {t('common.flagshipExperience')}
          </span>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        {/* Editorial TOP */}
        <h3 className={cn("font-heading text-3xl font-semibold mb-3 leading-tight mt-4", isFlagship ? "text-ivory" : "text-charcoal")}>
          {title}
        </h3>
        <p className={cn("text-xs leading-relaxed mb-8 opacity-80", isFlagship ? "text-ivory/70" : "text-charcoal/70")}>
          {desc}
        </p>

        {/* MIDDLE - Inclusions */}
        <ul className="space-y-4 mb-8">
          {Array.isArray(inclusions) && inclusions.map((item, idx) => (
            <li key={idx} className={cn("flex gap-3 text-[13px] items-start", isFlagship ? "text-ivory/80" : "text-charcoal/80")}>
              <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>

        {/* YOUR STAY BAND */}
        <div className={cn(
          "mt-auto mb-8 p-6 rounded-custom border border-dashed",
          isFlagship ? "bg-white/5 border-gold/30" : "bg-ivory border-gold/20"
        )}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className={cn("text-[9px] font-bold uppercase tracking-widest block mb-1.5 opacity-60", isFlagship ? "text-ivory" : "text-charcoal")}>{t('common.accommodation')}</span>
              <h4 className={cn("font-heading text-lg text-gold")}>{stayName}</h4>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="bg-gold text-charcoal px-2 py-0.5 text-[8px] font-bold rounded-[2px]">{pkg.stay.tier}</span>
              {pkg.stay.nights > 0 && (
                <span className={cn("text-[9px] font-bold flex items-center gap-1", isFlagship ? "text-ivory" : "text-charcoal")}>
                  <Moon size={10} className="text-gold" /> {pkg.stay.nights} {t('common.nights')}
                </span>
              )}
            </div>
          </div>
          
          <div className={cn("text-[11px] font-medium opacity-70 flex justify-between", isFlagship ? "text-ivory" : "text-charcoal")}>
            <span>{pkg.stay.board}</span>
            <span>{pkg.stay.room || pkg.stay.journey}</span>
          </div>
        </div>

        {/* BOTTOM Pricing */}
        <div className={cn("border-t pt-8 grid grid-cols-2 gap-6", isFlagship ? "border-ivory/10" : "border-zinc-100")}>
          <div>
             <span className={cn("text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-50", isFlagship ? "text-ivory" : "text-charcoal")}>{t('common.from')}</span>
             <div className="flex items-baseline gap-1">
                <span className="font-heading text-3xl font-semibold text-gold">${pkg.price}</span>
                <span className={cn("text-[10px] opacity-60", isFlagship ? "text-ivory" : "text-charcoal")}>{t('common.pp')}</span>
             </div>
          </div>
          <div className="text-right">
             <span className={cn("text-[9px] font-bold block mb-1 opacity-50 uppercase tracking-widest", isFlagship ? "text-ivory" : "text-charcoal")}>Supplements</span>
             <div className={cn("text-[11px] font-medium", isFlagship ? "text-ivory/70" : "text-charcoal/70")}>
                +{pkg.solo} {t('common.solo')} / {pkg.group || `-- ${t('common.group')}`}
             </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-4 mt-8">
           <button 
             onClick={() => onOpenItinerary(pkg)}
             className={cn(
               "py-4 text-[11px] font-bold uppercase tracking-widest transition-all border rounded-[4px]",
               isFlagship ? "border-ivory/20 text-ivory hover:border-gold hover:text-gold" : "border-zinc-200 text-charcoal hover:border-gold hover:text-gold"
             )}
           >
             {t('common.viewItinerary')}
           </button>
           <a 
             href="#booking" 
             onClick={() => selectPackage(pkg)}
             className={cn(
              "py-4 text-center text-[11px] font-bold uppercase tracking-widest transition-all rounded-[4px] bg-gold text-charcoal hover:bg-ivory flex items-center justify-center gap-2",
              isSelected && "ring-2 ring-gold ring-offset-2"
            )}>
             {isSelected ? t('common.selected') : t('common.bookNow')} <ArrowRight size={14} />
           </a>
        </div>
      </div>
    </div>
  );
};

export const Packages = () => {
  const { t } = useTranslation();
  const { packages: packagesData } = usePackages();
  const [filter, setFilter] = useState('all');
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openItinerary = (pkg) => {
    // Merge structural data from config with translated text
    const translatedItinerary = t(`packages.p${pkg.id}.itinerary`, { returnObjects: true });
    const baseItinerary = pkg.itinerary || [];

    const mergedItinerary = baseItinerary.map((day, i) => ({
      ...day,
      morning: translatedItinerary?.[i]?.morning || day.morning,
      afternoon: translatedItinerary?.[i]?.afternoon || day.afternoon,
      evening: translatedItinerary?.[i]?.evening || day.evening,
      journal: translatedItinerary?.[i]?.journal || day.journal,
    }));

    setSelectedPkg({
      ...pkg,
      title: t(`packages.p${pkg.id}.title`),
      itinerary: mergedItinerary,
    });
    setIsModalOpen(true);
  };

  const filteredData = filter === 'all' 
    ? packagesData 
    : packagesData.filter(pkg => pkg.category.includes(filter));

  return (
    <section id="packages" className="py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="text-center mb-20">
          <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block animate-in fade-in">
            {t('common.fieldRecords')}
          </span>
          <h2 className="text-6xl md:text-7xl font-heading text-charcoal mb-8">{t('common.findYourSafari')}</h2>
          <div className="h-px w-20 bg-gold/30 mx-auto mb-8" />
          <p className="text-charcoal/60 max-w-xl mx-auto font-body text-sm leading-relaxed">
            {t('common.pricingNote')}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={cn(
                "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border",
                filter === opt.value 
                  ? "bg-charcoal text-ivory border-charcoal shadow-xl" 
                  : "bg-transparent text-charcoal/50 border-zinc-200 hover:border-gold hover:text-gold"
              )}
            >
              {t(opt.label)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[600px]">
          {filteredData.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onOpenItinerary={openItinerary} />
          ))}
        </div>
      </div>

      <ItineraryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pkg={selectedPkg} 
      />
    </section>
  );
};


