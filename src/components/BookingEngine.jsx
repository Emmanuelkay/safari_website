import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Check, ChevronRight, ChevronLeft, CreditCard, Smartphone, Globe, Landmark, ShieldCheck, Mail, MessageSquare } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useTrip } from '../context/TripContext';
import { CheckoutModal } from './CheckoutModal';

const STEPS = ["Choose Safari", "Your Details", "Review", "Payment"];

export const BookingEngine = () => {
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

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    let total = (trip.package?.price || 0) * (trip.guests || 2);
    trip.addons.forEach(a => total += a.price * (a.unit === 'pp' ? (trip.guests || 2) : 1));
    return total;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const refId = `SNB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // If payment is PayPal, we open the checkout modal. 
      // We will save to DB only after or during the checkout flow to ensure consistency.
      if (formData.paymentMethod === 'paypal') {
        setBookingRef(refId);
        setIsCheckoutOpen(true);
        setLoading(false);
        return;
      }

      // Standard enquiry flow for other methods
      await addDoc(collection(db, "bookings"), {
        ...formData,
        ...trip,
        packageName: trip.package?.title,
        totalAmount: calculateTotal(),
        bookingRef: refId,
        status: 'ENQUIRY',
        createdAt: serverTimestamp(),
      });
      setBookingRef(refId);
      setStep(5);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Something went wrong. Please reach us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (success || step === 5) {
    return (
      <section className="py-32 bg-ivory text-center">
        <div className="max-w-2xl mx-auto px-10">
          <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto mb-10 text-charcoal">
            <Check size={40} strokeWidth={3} />
          </div>
          <h2 className="text-5xl font-heading text-charcoal mb-6">Expedition Reserved</h2>
          <p className="text-zinc-500 mb-10 font-body">
            Booking Reference: <span className="text-earth font-bold">{bookingRef}</span><br />
            Our Nairobi team will contact you within 24 hours to finalise your itinerary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="btn-ochre bg-charcoal text-ivory">Back to Home</a>
            <a href="https://wa.me/254700000000" className="btn-ochre border border-charcoal text-charcoal bg-transparent hover:bg-charcoal hover:text-ivory">Chat on WhatsApp</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-32 bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-20">
          {/* Form Side */}
          <div>
            <div className="mb-12">
               <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block">Secure Your Expedition</span>
               <h2 className="text-5xl font-heading text-charcoal mb-8">Step {step}: {STEPS[step-1]}</h2>
               
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
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Current Selection</span>
                      <a href="#packages" className="text-[10px] text-ochre font-bold uppercase hover:underline">Change Safari</a>
                   </div>
                   <h3 className="text-3xl font-heading text-charcoal mb-2">{trip.package?.title || 'No Safari Selected'}</h3>
                   <div className="flex flex-wrap gap-2">
                      {trip.addons.map(a => (
                        <span key={a.id} className="bg-gold/10 text-gold px-2 py-1 text-[9px] font-bold rounded uppercase">{a.name}</span>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Travelers</label>
                    <input 
                      type="number" 
                      min="1"
                      value={trip.guests}
                      onChange={(e) => updateGuests(parseInt(e.target.value))}
                      className="w-full bg-ivory border-gold/10 p-5 rounded-custom font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Preferred Date</label>
                    <input 
                      type="date" 
                      value={trip.dates}
                      onChange={(e) => updateDates(e.target.value)}
                      className="w-full bg-ivory border-gold/10 p-5 rounded-custom font-body"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Details */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Full Name</label>
                  <input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full bg-ivory border-gold/10 p-5 rounded-custom font-body"
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
                    <input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-ivory border-gold/10 p-5 rounded-custom font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">WhatsApp Number</label>
                    <input 
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="+254..."
                      className="w-full bg-ivory border-gold/10 p-5 rounded-custom font-body"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Special Requests</label>
                   <textarea 
                     name="requests"
                     value={formData.requests}
                     onChange={handleInputChange}
                     rows="4"
                     className="w-full bg-ivory border-gold/10 p-5 rounded-custom font-body"
                   />
                </div>
              </div>
            )}

            {/* STEP 3: Review */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="bg-ivory p-10 rounded-custom space-y-6 shadow-sm">
                  <div className="flex justify-between border-b border-gold/10 pb-4">
                    <span className="text-zinc-500 font-body">Expedition</span>
                    <span className="font-heading text-xl text-charcoal">{trip.package?.title || 'Not Selected'}</span>
                  </div>
                  <div className="flex justify-between border-b border-gold/10 pb-4">
                    <span className="text-zinc-500 font-body">Travelers</span>
                    <span className="text-charcoal font-bold">{trip.guests} Adults</span>
                  </div>
                  <div className="flex justify-between border-b border-gold/10 pb-4">
                    <span className="text-zinc-500 font-body">Date</span>
                    <span className="text-charcoal font-bold">{trip.dates || 'TBD'}</span>
                  </div>
                   <div className="flex justify-between border-b border-gold/10 pb-4">
                    <span className="text-zinc-500 font-body">Extras</span>
                    <div className="text-right">
                       {trip.addons.map(a => <div key={a.id} className="text-[11px] font-bold text-gold uppercase">{a.name}</div>)}
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <span className="text-charcoal font-bold">Estimated Total</span>
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
                      <img src="https://www.paypalobjects.com/webstatic/icon/pp256.png" alt="PayPal" className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-charcoal uppercase tracking-widest mb-1">Secure PayPal Gateway</h4>
                      <p className="text-[11px] text-[#6B6158]">Handle cards, credit, or PayPal accounts securely.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t border-gold/10">
                    <div className="flex items-start gap-4">
                      <Check className="w-4 h-4 text-gold mt-0.5" />
                      <span className="text-[12px] text-zinc-500 font-body">Encrypted 256-bit SSL transaction</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <Check className="w-4 h-4 text-gold mt-0.5" />
                      <span className="text-[12px] text-zinc-500 font-body">No account required (Credit/Debit accepted)</span>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                     <ShieldCheck size={120} className="text-charcoal" />
                  </div>
                </div>
                
                <div className="bg-gold/5 p-8 rounded-custom border border-dashed border-gold/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-500 text-sm">30% Deposit Required</span>
                    <span className="text-2xl font-heading text-charcoal">${(calculateTotal() * 0.3).toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 italic">Balance due 30 days before travel. No hidden fees.</p>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="mt-16 flex gap-4">
              {step > 1 && (
                <button onClick={prevStep} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-charcoal transition-colors">
                  <ChevronLeft size={16} /> Back
                </button>
              )}
              <button 
                onClick={step === 4 ? handleSubmit : nextStep}
                disabled={loading || (step === 1 && !trip.package)}
                className="ml-auto bg-gold text-charcoal px-14 py-6 rounded-custom font-bold uppercase tracking-[0.3em] text-[12px] flex items-center gap-3 transition-transform hover:-translate-y-1 shadow-2xl disabled:opacity-50"
              >
                {loading ? 'Processing...' : step === 4 ? 'Confirm & Reserve' : 'Next Step'} <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Trust Side */}
          <div className="bg-ivory rounded-lg p-10 flex flex-col h-fit sticky top-32">
             <div className="mb-10 pb-10 border-b border-gold/10">
                <h3 className="font-heading text-3xl text-charcoal mb-4 tracking-tight">Booking Policy</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed font-body">
                   A 30% deposit secures your expedition. The remaining balance is payable within 30 days of departure.
                </p>
             </div>

             <div className="space-y-8">
               <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold flex-shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase text-charcoal tracking-widest mb-1 shadow-sm">Secure Payment</h4>
                    <p className="text-[12px] text-zinc-500 leading-relaxed font-body">256-bit SSL encrypted transactions.</p>
                  </div>
               </div>
               <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase text-charcoal tracking-widest mb-1 shadow-sm">Instant Confirmation</h4>
                    <p className="text-[12px] text-zinc-500 leading-relaxed font-body">Reference generated immediately.</p>
                  </div>
               </div>
               <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold flex-shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase text-charcoal tracking-widest mb-1 shadow-sm">Lead Guide Support</h4>
                    <p className="text-[12px] text-zinc-500 leading-relaxed font-body">Direct contact with our Nairobi team.</p>
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
        amount={calculateTotal() * 0.3} // 30% Deposit
        tripDetails={`${trip.package?.title || 'Safari'} - ${trip.guests} Travelers`}
        bookingData={{
          ...formData,
          ...trip,
          packageName: trip.package?.title,
          totalAmount: calculateTotal(),
          bookingRef: bookingRef,
          depositAmount: calculateTotal() * 0.3
        }}
      />
    </section>
  );
};

