import React from 'react';
import { ShieldCheck, Star, MapPin, MessageSquare, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TrustBar = () => {
  const { t } = useTranslation();
  const items = [
    { id: 'guides', icon: <ShieldCheck className="w-8 h-8 stroke-ochre" />, num: t('trustBar.guides.num') },
    { id: 'rated', icon: <Star className="w-8 h-8 stroke-ochre" />, num: t('trustBar.rated.num') },
    { id: 'destinations', icon: <MapPin className="w-8 h-8 stroke-ochre" />, num: t('trustBar.destinations.num') },
    { id: 'support', icon: <MessageSquare className="w-8 h-8 stroke-ochre" />, num: t('trustBar.support.num') },
    { id: 'privacy', icon: <Users className="w-8 h-8 stroke-ochre" />, num: t('trustBar.privacy.num') },
  ];

  return (
    <section className="bg-ivory py-16 border-b border-[#e0dbce]">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center group">
            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <div className="font-heading text-3xl font-semibold text-charcoal mb-1">
              {item.num}
            </div>
            <div className="text-[13px] text-zinc-600 font-medium leading-relaxed">
              {t(`trustBar.${item.id}.label`)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
