import React, { useState } from 'react';
import { CheckoutModal } from './CheckoutModal';

export const EnquiryEngine = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 2,
    tripType: 'safari',
    budget: 'none',
    message: ''
  });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const depositRate = 500;
  const totalDeposit = formData.travelers * depositRate;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <section className="py-24 bg-midnight text-ivory text-center" id="contact">
        <div className="max-w-2xl mx-auto px-6">
           <div className="w-20 h-20 bg-sand rounded-full flex items-center justify-center mx-auto mb-8 text-midnight">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
           </div>
           <h2 className="text-4xl font-heading text-white mb-4">Transmission Received</h2>
           <p className="text-zinc-400 mb-8">
             Your field request has been logged. Our Nairobi team will contact you within 12 hours via email or WhatsApp.
           </p>
           <button onClick={() => setIsSuccess(false)} className="text-sand border border-sand/30 px-8 py-3 rounded uppercase text-[11px] font-bold tracking-widest hover:bg-sand/10 transition-all">
             Send another message
           </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-midnight text-ivory" id="contact">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <span className="text-sand font-heading text-lg font-semibold tracking-[2px] uppercase opacity-90 mb-4 block">Reserve Your Kenyan Odyssey</span>
            <h2 className="text-5xl md:text-6xl font-heading text-white mb-6">Start Your Journey</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-md">
              Our travel team is based in Nairobi. We know these parks, these roads, and these camps because we live here. Talk to a person, not a booking engine.
            </p>
            
            <div className="space-y-8">
               <div>
                  <strong className="text-sand text-[11px] uppercase tracking-[2px] block mb-2">Email</strong>
                  <span className="text-xl">expeditions@savannabeyond.co.ke</span>
               </div>
               <div>
                  <strong className="text-sand text-[11px] uppercase tracking-[2px] block mb-2">WhatsApp</strong>
                  <span className="text-xl">+254 718 592 358</span>
               </div>
               <div>
                  <strong className="text-sand text-[11px] uppercase tracking-[2px] block mb-2">Support</strong>
                  <span className="text-lg opacity-80">Available 7 days, 8am–8pm EAT</span>
               </div>
               <div className="inline-block mt-4 px-4 py-2 border border-sand/20 rounded-[4px] text-[13px] text-sand">
                  We accept PayPal (Cards), M-Pesa & bank transfer
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white/5 p-8 sm:p-12 rounded-custom border border-white/10">
             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-[4px] p-4 text-white placeholder:text-zinc-500 focus:border-ochre focus:outline-none transition-all" 
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">Email Address</label>
                     <input 
                        type="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-[4px] p-4 text-white placeholder:text-zinc-500 focus:border-ochre focus:outline-none transition-all" 
                        required 
                     />
                   </div>
                   <div>
                     <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">WhatsApp Number</label>
                     <input 
                        type="tel" 
                        placeholder="+1 234 567 890" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-[4px] p-4 text-white placeholder:text-zinc-500 focus:border-ochre focus:outline-none transition-all" 
                        required 
                     />
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">Travelers</label>
                     <input 
                        type="number" 
                        min="1" 
                        value={formData.travelers}
                        onChange={(e) => handleInputChange('travelers', parseInt(e.target.value) || 1)}
                        className="w-full bg-white/5 border border-white/10 rounded-[4px] p-4 text-white placeholder:text-zinc-500 focus:border-ochre focus:outline-none transition-all" 
                     />
                   </div>
                   <div>
                     <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">Trip Type</label>
                     <select 
                        value={formData.tripType}
                        onChange={(e) => handleInputChange('tripType', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-[4px] p-4 text-white focus:border-ochre focus:outline-none transition-all appearance-none"
                     >
                        <option value="safari" className="bg-midnight">Safari Only</option>
                        <option value="city" className="bg-midnight">City Tour Only</option>
                        <option value="combo" className="bg-midnight">Safari + City</option>
                        <option value="full" className="bg-midnight">Full Kenya Journey</option>
                     </select>
                   </div>
                </div>

                <div>
                   <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">Budget per Person</label>
                   <select 
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-[4px] p-4 text-white focus:border-ochre focus:outline-none transition-all appearance-none"
                   >
                      <option value="none" className="bg-midnight">Not sure yet</option>
                      <option value="under-500" className="bg-midnight">Under $500</option>
                      <option value="500-1000" className="bg-midnight">$500–$1,000</option>
                      <option value="1000-2000" className="bg-midnight">$1,000–$2,000</option>
                      <option value="over-2000" className="bg-midnight">$2,000+</option>
                   </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">Tell us about your trip</label>
                  <textarea 
                    rows="4" 
                    placeholder="Interests, dietary requirements, or custom needs..." 
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-[4px] p-4 text-white placeholder:text-zinc-500 focus:border-ochre focus:outline-none transition-all" 
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <button className="btn-ochre w-full py-5 text-base uppercase tracking-widest font-bold">Send General Enquiry</button>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-5 text-base uppercase tracking-widest font-bold bg-white text-midnight border border-white hover:bg-transparent hover:text-white transition-colors"
                  >
                    Proceed to Secure Deposit (${totalDeposit.toLocaleString()})
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500 text-center uppercase tracking-wider">Secure your booking instantly. Refundable within 48 hours.</p>
             </form>
          </div>

        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onSuccess={() => setIsSuccess(true)}
        amount={totalDeposit} 
        tripDetails={`${formData.travelers} Guest${formData.travelers > 1 ? 's' : ''} - ${formData.tripType.toUpperCase()} Expedition`} 
        bookingData={{
          fullName: formData.name,
          email: formData.email,
          whatsapp: formData.phone,
          guests: formData.travelers,
          tripType: formData.tripType,
          budget: formData.budget,
          requests: formData.message,
          totalAmount: totalDeposit, // This is just the deposit in this context or total?
          status: 'ENQUIRY' // Will be overridden to DEPOSIT_PAID in CheckoutModal
        }}
      />
    </section>
  );
};
