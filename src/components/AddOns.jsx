import React from 'react';
import { Waves, Smartphone, Shield, Moon, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTrip } from '../context/TripContext';
import { useTranslation } from 'react-i18next';
import { useAddons } from '../hooks/usePackages';

const practicalIcons = {
  village: <Shield size={20} />,
  boat: <Waves size={20} />,
  hotel: <Moon size={20} />,
  sim: <Smartphone size={20} />,
};

const SignatureCard = ({ addon, isSelected, onToggle }) => {
  const { t } = useTranslation();
  const name = t(`addons.signature.${addon.id}.name`);
  const desc = t(`addons.signature.${addon.id}.desc`);

  return (
    <div className="flex flex-col h-full bg-white rounded-custom overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 group border border-zinc-100">
      {/* Top Media Area */}
      <div className="relative h-[280px] overflow-hidden bg-charcoal">
        <img 
          src={addon.image} 
          alt={name}
          loading="lazy"
          width={400}
          height={280}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        <span className="absolute top-6 left-6 bg-gold text-charcoal px-3 py-1 text-[9px] font-bold tracking-[0.2em] rounded-[2px] uppercase">
          {t('addons.labels.signature')}
        </span>
      </div>

      {/* Content Area */}
      <div className="p-10 flex flex-col flex-grow bg-white">
        <h3 className="font-heading text-2xl text-charcoal mb-4 leading-tight group-hover:text-gold transition-colors">
          {name}
        </h3>
        <p className="text-[#6B6158] text-sm leading-relaxed mb-10 font-body italic">
          "{desc}"
        </p>
        
        <div className="mt-auto flex flex-col gap-6">
          <div className="flex items-baseline gap-1">
            <span className="text-gold font-heading text-3xl font-semibold">${addon.price}</span>
            <span className="text-[10px] text-charcoal/40 uppercase font-bold tracking-widest">/{addon.unit}</span>
          </div>
          
          <button 
            onClick={onToggle}
            className={cn(
              "w-full py-5 text-[11px] font-bold uppercase tracking-[0.3em] rounded-custom transition-all flex items-center justify-center gap-3",
              isSelected 
                ? "bg-earth text-ivory" 
                : "bg-gold text-charcoal hover:bg-ochre hover:text-white"
            )}
          >
            {isSelected ? <Check size={14} /> : null}
            {isSelected ? t('addons.labels.added') : t('addons.labels.add')}
          </button>
        </div>
      </div>
    </div>
  );
};

const PracticalCard = ({ addon, isSelected, onToggle }) => {
  const { t } = useTranslation();
  const name = t(`addons.practical.${addon.id}.name`);

  return (
    <div className="bg-white p-6 rounded-custom border border-[#E8E0D5] flex items-center justify-between hover:border-gold transition-colors group">
      <div className="flex items-center gap-5">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all",
          isSelected ? "bg-gold text-charcoal" : "bg-ivory text-gold group-hover:bg-gold/10"
        )}>
          {addon.icon}
        </div>
        <div>
          <h4 className="text-[15px] font-medium text-charcoal mb-1">{name}</h4>
          <div className="flex items-baseline gap-1">
            <span className="text-gold font-semibold">${addon.price}</span>
            <span className="text-[9px] text-charcoal/40 font-bold uppercase tracking-widest">/{addon.unit}</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onToggle}
        className={cn(
          "text-[11px] font-bold uppercase tracking-widest transition-all",
          isSelected ? "text-gold" : "text-zinc-300 hover:text-gold"
        )}
      >
        {isSelected ? t('addons.labels.addedShort') : t('addons.labels.addShort')}
      </button>
    </div>
  );
};

export const AddOns = () => {
  const { t } = useTranslation();
  const { trip, toggleAddon } = useTrip();
  const { signature: signatureAddons, practical: practicalAddonsData } = useAddons();
  const practicalAddons = practicalAddonsData.map(a => ({ ...a, icon: practicalIcons[a.id] }));

  return (
    <section id="addons" className="py-32 bg-ivory bg-grain">
      <div className="max-w-[1440px] mx-auto px-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <div className="w-[60px] h-px bg-ochre mx-auto mb-10" />
          <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block">
            {t('addons.header.tag')}
          </span>
          <h2 className="text-6xl md:text-7xl font-heading text-charcoal mb-6">{t('addons.header.title')}</h2>
          <p className="text-[#6B6158] max-w-xl mx-auto font-body text-base leading-relaxed">
            {t('addons.header.desc')}
          </p>
        </div>

        {/* Atmospheric Quote */}
        <div className="mb-24 border-l-2 border-gold pl-10 py-4 max-w-3xl mx-auto md:mx-0">
          <p className="text-2xl font-heading text-charcoal italic leading-relaxed mb-4">
            "{t('addons.quote.text')}"
          </p>
          <span className="text-[10px] font-bold text-gold uppercase tracking-widest">
            — {t('addons.quote.author')}
          </span>
        </div>

        {/* TIER 1: Signature Experiences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {signatureAddons.map((addon) => (
            <SignatureCard 
              key={addon.id} 
              addon={addon}
              isSelected={trip.addons.some(a => a.id === addon.id)}
              onToggle={() => toggleAddon({...addon, name: t(`addons.signature.${addon.id}.name`)})}
            />
          ))}
        </div>

        {/* TIER SEPARATOR */}
        <div className="relative py-20 mb-20 flex justify-center items-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-[#E8E0D5]" />
          </div>
          <span className="relative bg-ivory px-10 text-[10px] font-bold text-[#A59D94] uppercase tracking-[0.4em]">
            {t('addons.labels.practical')}
          </span>
        </div>

        {/* TIER 2: Practical Additions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {practicalAddons.map((addon) => (
            <PracticalCard 
              key={addon.id} 
              addon={addon}
              isSelected={trip.addons.some(a => a.id === addon.id)}
              onToggle={() => toggleAddon({...addon, name: t(`addons.practical.${addon.id}.name`)})}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
