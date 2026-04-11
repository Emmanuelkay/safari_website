import React, { useState } from 'react';
import { MessageCircle, Phone, Clock, ShieldCheck, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

export const ActionCenter = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 sm:bottom-8 sm:left-8 sm:right-auto z-[100]">
      {/* Trigger FAB */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "bg-white border-2 border-gold text-charcoal p-5 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 group relative",
          isOpen ? "rotate-90 border-zinc-200" : "animate-bounce"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} className="text-gold" />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-charcoal text-[8px] font-bold text-ivory px-2 py-1 rounded-full uppercase tracking-widest border border-gold/20">
            {t('common.online')}
          </span>
        )}
      </button>

      {/* Action Sheet */}
      <div className={cn(
        "absolute bottom-20 right-0 sm:right-auto sm:left-0 w-80 bg-white rounded-custom shadow-[0_20px_100px_rgba(0,0,0,0.15)] border border-gold/10 transition-all duration-500 transform origin-bottom-right sm:origin-bottom-left overflow-hidden",
        isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10 pointer-events-none"
      )}>
        <div className="p-8 bg-ivory/50 border-b border-gold/10">
           <h3 className="font-heading text-2xl text-charcoal mb-2 tracking-tight">{t('actionCenter.title')}</h3>
           <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400">{t('actionCenter.location')}</p>
        </div>

        <div className="p-8 space-y-6">
           <a 
             href="https://wa.me/254718592358" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-5 p-4 rounded-lg bg-zinc-50 border border-zinc-100 hover:bg-gold/10 hover:border-gold/30 transition-all group"
           >
             <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-green-500">
                <MessageCircle size={18} />
             </div>
             <div>
                <h4 className="text-[12px] font-bold text-charcoal">{t('actionCenter.quickChat.title')}</h4>
                <p className="text-[10px] text-zinc-400 font-medium italic">{t('actionCenter.quickChat.desc')}</p>
             </div>
           </a>

           <a 
             href="tel:+254718592358" 
             className="flex items-center gap-5 p-4 rounded-lg bg-zinc-50 border border-zinc-100 hover:bg-gold/10 hover:border-gold/30 transition-all group"
           >
             <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-gold">
                <Phone size={18} />
             </div>
             <div>
                <h4 className="text-[12px] font-bold text-charcoal">{t('actionCenter.voiceCall.title')}</h4>
                <p className="text-[10px] text-zinc-400 font-medium italic">{t('actionCenter.voiceCall.desc')}</p>
             </div>
           </a>

           <div className="flex flex-col gap-4 pt-4 border-t border-zinc-50">
              <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                 <Clock size={12} className="text-gold" /> {t('actionCenter.hours')}
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                 <ShieldCheck size={12} className="text-gold" /> {t('actionCenter.licensed')}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
