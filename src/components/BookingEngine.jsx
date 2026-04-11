import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Check, ChevronRight, ChevronLeft, CreditCard, Smartphone, Globe, Landmark, ShieldCheck, Mail, MessageSquare, Phone } from 'lucide-react';

import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useTrip } from '../context/TripContext';
import { CheckoutModal } from './CheckoutModal';
import { useTranslation } from 'react-i18next';

const getSteps = (t) => t('booking.steps', { returnObjects: true }) || ["Choose Safari", "Your Details", "Review", "Payment"];

export const BookingEngine = () => {
  const { t } = useTranslation();
  const { trip, updateGuests, updateDates } = useTrip();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    nationality: '',
    referral: '',
    requests: '',
    paymentMethod: 'paypal'
  });
  const [success, setSuccess] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const nextStep = () => {
    if (step === 1) {
      if (trip.dates && trip.dates < today) {
        alert(t('booking.alerts.pastDate') || 'Please select a future travel date.');
        return;
      }
    }
    if (step === 2) {
      if (!formData.fullName || !formData.email || !formData.whatsapp) {
        alert(t('booking.alerts.fillDetails'));
        return;
      }
      if (!isValidEmail(formData.email)) {
        alert(t('booking.alerts.invalidEmail'));
        return;
      }
    }
    setStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For phone/whatsapp, allow only numbers and '+'
    if (name === 'whatsapp') {
      const sanitized = value.replace(/[^0-9+]/g, '');
      setFormData(prev => ({ ...prev, [name]: sanitized }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const calculateTotal = () => {
    let total = (trip.package?.price || 0) * (trip.guests || 2);
    trip.addons.forEach(a => total += a.price * (a.unit === 'pp' ? (trip.guests || 2) : 1));
    return total;
  };

  const handleSubmit = async () => {
    if (submitting) return;
    if (!isValidEmail(formData.email)) {
      alert(t('booking.alerts.invalidEmail'));
      return;
    }
    setSubmitting(true);
    setLoading(true);

    try {
      const randomBytes = crypto.getRandomValues(new Uint8Array(6));
      const hex = Array.from(randomBytes, b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      const refId = `SNB-${hex}`;
      
      // SANITIZE DATA: Remove non-serializable React elements (icons)
      const sanitizedAddons = trip.addons.map(({ icon, ...rest }) => rest);
      const sanitizedPackage = trip.package ? { 
        id: trip.package.id, 
        price: trip.package.price,
        category: trip.package.category
      } : null;

      // Save the booking to Firestore FIRST, so the backend validation doesn't fail
      await addDoc(collection(db, "bookings"), {
        ...formData,
        trip: {
          ...trip,
          addons: sanitizedAddons,
          package: sanitizedPackage
        },
        packageName: trip.package?.id ? t(`packages.p${trip.package.id}.title`) : 'Safari',
        totalAmount: calculateTotal(),
        ref: refId,           // Changed from bookingRef to map to backend query
        bookingRef: refId,    // Kept for frontend compatibility
        status: 'ENQUIRY',
        createdAt: serverTimestamp(),
      });

      if (formData.paymentMethod === 'paypal') {
        setBookingRef(refId);
        setIsCheckoutOpen(true);
        setLoading(false);
        return;
      }

      // Standard enquiry flow for other methods
      setBookingRef(refId);
      setStep(5);
    } catch (error) {
      alert(t('booking.alerts.error'));
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (success || step === 5) {
    return (
      <section className="py-32 bg-ivory text-center">
        <div className="max-w-2xl mx-auto px-10">
          <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto mb-10 text-charcoal">
            <Check size={40} strokeWidth={3} />
          </div>
          <h2 className="text-5xl font-heading text-charcoal mb-6">{t('booking.success.title')}</h2>
          <p className="text-zinc-500 mb-10 font-body">
            {t('booking.success.ref')}: <span className="text-earth font-bold">{bookingRef}</span><br />
            {t('booking.success.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="btn-ochre bg-charcoal text-ivory">{t('common.backHome')}</a>
            <a href="https://wa.me/254718592358" className="btn-ochre border border-charcoal text-charcoal bg-transparent hover:bg-charcoal hover:text-ivory">{t('common.chatWhatsApp')}</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-32 bg-ivory/50 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-20">
          {/* Form Side */}
          <div>
            <div className="mb-12">
               <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block">{t('booking.header.secure')}</span>
               <h2 className="text-5xl font-heading text-charcoal mb-8">{t('booking.header.step', { step })}: {getSteps(t)[step-1]}</h2>
               
               {/* Progress Bar */}
               <div className="flex gap-2 mb-12">
                 {[1, 2, 3, 4].map(s => (
                   <div key={s} className={cn(
                     "h-1 flex-grow rounded-full transition-all duration-500",
                     s <= step ? "bg-gold" : "bg-gold/10"
                   )} />
                 ))}
               </div>
            </div>

            {/* STEP 1: Selection Preview / Edit */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="bg-ivory/50 p-8 rounded-custom border border-gold/10">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t('booking.step1.currentSelection')}</span>
                      <a href="#packages" className="text-[10px] text-ochre font-bold uppercase hover:underline">{t('booking.step1.changeSafari')}</a>
                   </div>
                   <h3 className="text-3xl font-heading text-charcoal mb-2">{trip.package?.id ? t(`packages.p${trip.package.id}.title`) : t('booking.step1.noSafari')}</h3>
                   <div className="flex flex-wrap gap-2">
                      {trip.addons.map(a => (
                        <span key={a.id} className="bg-gold/10 text-gold px-2 py-1 text-[9px] font-bold rounded uppercase">
                          {t(`addons.${a.id.includes('village') || a.id.includes('boat') || a.id.includes('hotel') || a.id.includes('sim') ? 'practical' : 'signature'}.${a.id}.name`)}
                        </span>
                      ))}
                   </div>
                </div>

                 <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="travelers" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t('booking.step1.travelers')}</label>
                    <input
                      id="travelers"
                      type="number"
                      min="1"
                      value={trip.guests}
                      onChange={(e) => updateGuests(parseInt(e.target.value))}
                      className="w-full bg-ivory border border-gold/20 p-5 rounded-custom font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="travel-date" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t('booking.step1.preferredDate')}</label>
                    <input
                      id="travel-date"
                      type="date"
                      value={trip.dates}
                      min={today}
                      onChange={(e) => updateDates(e.target.value)}
                      className="w-full bg-ivory border border-gold/20 p-5 rounded-custom font-body"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Details */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                 <div className="space-y-2">
                  <label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t('booking.step2.fullName')}</label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    autoComplete="name"
                    maxLength={100}
                    className="w-full bg-ivory border border-gold/20 p-5 rounded-custom font-body"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t('booking.step2.email')}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      maxLength={254}
                      className="w-full bg-ivory border border-gold/20 p-5 rounded-custom font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t('booking.step2.whatsapp')}</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-gold transition-colors">
                        <Phone size={18} />
                      </div>
                      <input
                        id="whatsapp"
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder={t('booking.step2.whatsappPlaceholder')}
                        autoComplete="tel"
                        maxLength={20}
                        className="w-full bg-ivory border border-gold/10 p-5 pl-12 rounded-custom font-body focus:border-gold focus:outline-none transition-all placeholder:text-zinc-400"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                   <label htmlFor="requests" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{t('booking.step2.requests')}</label>
                   <textarea
                     id="requests"
                     name="requests"
                     value={formData.requests}
                     onChange={handleInputChange}
                     rows="4"
                     maxLength={1000}
                     className="w-full bg-ivory border border-gold/20 p-5 rounded-custom font-body"
                   />
                </div>
              </div>
            )}

            {/* STEP 3: Review */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                 <div className="bg-ivory p-10 rounded-custom space-y-6 shadow-sm">
                  <div className="flex justify-between border-b border-gold/10 pb-4">
                    <span className="text-zinc-500 font-body">{t('booking.step3.expedition')}</span>
                    <span className="font-heading text-xl text-charcoal">{trip.package?.id ? t(`packages.p${trip.package.id}.title`) : t('booking.step1.noSafari')}</span>
                  </div>
                  <div className="flex justify-between border-b border-gold/10 pb-4">
                    <span className="text-zinc-500 font-body">{t('booking.step1.travelers')}</span>
                    <span className="text-charcoal font-bold">{trip.guests} {t('common.adults')}</span>
                  </div>
                  <div className="flex justify-between border-b border-gold/10 pb-4">
                    <span className="text-zinc-500 font-body">{t('booking.step3.date')}</span>
                    <span className="text-charcoal font-bold">{trip.dates || t('common.tbd')}</span>
                  </div>
                   <div className="flex justify-between border-b border-gold/10 pb-4">
                    <span className="text-zinc-500 font-body">{t('booking.step3.extras')}</span>
                    <div className="text-right">
                       {trip.addons.map(a => <div key={a.id} className="text-[11px] font-bold text-gold uppercase">{t(`addons.${a.id.includes('village') || a.id.includes('boat') || a.id.includes('hotel') || a.id.includes('sim') ? 'practical' : 'signature'}.${a.id}.name`)}</div>)}
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <span className="text-charcoal font-bold">{t('booking.step3.total')}</span>
                    <span className="text-3xl font-heading text-gold font-bold">${calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Payment */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                {/* Simplified Payment Informational Card */}
                <div className="bg-ivory/50 border border-gold/20 p-10 rounded-custom space-y-6 relative overflow-hidden">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border border-gold/10">
                      <ShieldCheck className="w-8 h-8 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-charcoal uppercase tracking-widest mb-1">{t('booking.step4.gatewayTitle')}</h4>
                      <p className="text-[11px] text-[#6B6158]">{t('booking.step4.gatewayDesc')}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t border-gold/10">
                    <div className="flex items-start gap-4">
                      <Check className="w-4 h-4 text-gold mt-0.5" />
                      <span className="text-[12px] text-zinc-500 font-body">{t('booking.step4.feature1')}</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <Check className="w-4 h-4 text-gold mt-0.5" />
                      <span className="text-[12px] text-zinc-500 font-body">{t('booking.step4.feature2')}</span>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                     <ShieldCheck size={120} className="text-charcoal" />
                  </div>
                </div>
                
                <div className="bg-gold/5 p-8 rounded-custom border border-dashed border-gold/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-500 text-sm">{t('booking.step4.depositLabel')}</span>
                    <span className="text-2xl font-heading text-charcoal">${calculateTotal().toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 italic">{t('booking.step4.depositNote')}</p>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="mt-16 flex gap-4">
              {step > 1 && (
                <button onClick={prevStep} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-charcoal transition-colors">
                  <ChevronLeft size={16} /> {t('common.back')}
                </button>
              )}
              <button 
                onClick={step === 4 ? handleSubmit : nextStep}
                disabled={loading || submitting || (step === 1 && !trip.package)}
                className="ml-auto bg-gold text-charcoal px-14 py-6 rounded-custom font-bold uppercase tracking-[0.3em] text-[12px] flex items-center gap-3 transition-transform hover:-translate-y-1 shadow-2xl disabled:opacity-50"
              >
                {loading ? t('common.processing') : step === 4 ? t('booking.header.confirm') : t('common.nextStep')} <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Trust Side */}
          <div className="bg-ivory rounded-lg p-10 flex flex-col h-fit sticky top-32">
             <div className="mb-10 pb-10 border-b border-gold/10">
                <h3 className="font-heading text-3xl text-charcoal mb-4 tracking-tight">{t('booking.policy.title')}</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed font-body">
                   {t('booking.policy.desc')}
                </p>
             </div>

             <div className="space-y-8">
               <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold flex-shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase text-charcoal tracking-widest mb-1 shadow-sm">{t('booking.policy.feature1Title')}</h4>
                    <p className="text-[12px] text-zinc-500 leading-relaxed font-body">{t('booking.policy.feature1Desc')}</p>
                  </div>
               </div>
               <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase text-charcoal tracking-widest mb-1 shadow-sm">{t('booking.policy.feature2Title')}</h4>
                    <p className="text-[12px] text-zinc-500 leading-relaxed font-body">{t('booking.policy.feature2Desc')}</p>
                  </div>
               </div>
               <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold flex-shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase text-charcoal tracking-widest mb-1 shadow-sm">{t('booking.policy.feature3Title')}</h4>
                    <p className="text-[12px] text-zinc-500 leading-relaxed font-body">{t('booking.policy.feature3Desc')}</p>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={() => setSuccess(true)}
        amount={calculateTotal()}
        tripDetails={`${trip.package?.id ? t(`packages.p${trip.package.id}.title`) : 'Safari'} - ${trip.guests} ${t('common.adults')}`}
        bookingData={{
          ...formData,
          ...trip,
          name: formData.fullName,
          travelers: trip.guests,
          travelDate: trip.dates || 'TBD',
          packageName: trip.package?.id ? t(`packages.p${trip.package.id}.title`) : 'Safari',
          totalAmount: calculateTotal(),
          ref: bookingRef,
          bookingRef: bookingRef,
          depositAmount: calculateTotal()
        }}
      />
    </section>
  );
};
