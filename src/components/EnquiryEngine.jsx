import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';
import { useTranslation } from 'react-i18next';


export const EnquiryEngine = () => {
  const { t } = useTranslation();
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
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const depositRate = 500;
  const totalDeposit = formData.travelers * depositRate;

  const handleInputChange = (field, value) => {
    // For phone, allow only numbers and '+'
    if (field === 'phone') {
      const sanitized = value.replace(/[^0-9+]/g, '');
      setFormData(prev => ({ ...prev, [field]: sanitized }));
      return;
    }
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
           <h2 className="text-4xl font-heading text-white mb-4">{t('enquiry.success.title')}</h2>
           <p className="text-zinc-400 mb-8">
             {t('enquiry.success.desc')}
           </p>
           <button onClick={() => setIsSuccess(false)} className="text-sand border border-sand/30 px-8 py-3 rounded uppercase text-[11px] font-bold tracking-widest hover:bg-sand/10 transition-all">
             {t('enquiry.success.another')}
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
            <span className="text-sand font-heading text-lg font-semibold tracking-[2px] uppercase opacity-90 mb-4 block">{t('enquiry.info.tag')}</span>
            <h2 className="text-5xl md:text-6xl font-heading text-white mb-6">{t('enquiry.info.title')}</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-md">
              {t('enquiry.info.desc')}
            </p>
            
            <div className="space-y-8">
               <div>
                  <strong className="text-sand text-[11px] uppercase tracking-[2px] block mb-2">{t('enquiry.info.emailLabel')}</strong>
                  <span className="text-xl">expeditions@savannabeyond.co.ke</span>
               </div>
               <div>
                  <strong className="text-sand text-[11px] uppercase tracking-[2px] block mb-2">{t('enquiry.info.whatsappLabel')}</strong>
                  <span className="text-xl">+254 718 592 358</span>
               </div>
               <div>
                  <strong className="text-sand text-[11px] uppercase tracking-[2px] block mb-2">{t('enquiry.info.supportLabel')}</strong>
                  <span className="text-lg opacity-80">{t('enquiry.info.supportHours')}</span>
               </div>
               <div className="inline-block mt-4 px-4 py-2 border border-sand/20 rounded-[4px] text-[13px] text-sand">
                  {t('enquiry.info.paymentMethods')}
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white/5 p-8 sm:p-12 rounded-custom border border-white/10">
             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                 <div>
                  <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">{t('enquiry.form.fullName')}</label>
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
                      <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">{t('enquiry.form.email')}</label>
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
                      <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">{t('enquiry.form.whatsapp')}</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-gold transition-colors">
                          <Phone size={18} />
                        </div>
                        <input 
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder={t('enquiry.form.whatsappPlaceholder')}
                          className="w-full bg-white/5 border border-white/10 rounded-[4px] p-4 pl-12 text-white placeholder:text-zinc-500 focus:border-gold focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">{t('enquiry.form.travelers')}</label>
                      <input 
                         type="number" 
                         min="1" 
                         value={formData.travelers}
                         onChange={(e) => handleInputChange('travelers', parseInt(e.target.value) || 1)}
                         className="w-full bg-white/5 border border-white/10 rounded-[4px] p-4 text-white placeholder:text-zinc-500 focus:border-ochre focus:outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">{t('enquiry.form.tripType')}</label>
                      <select 
                         value={formData.tripType}
                         onChange={(e) => handleInputChange('tripType', e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-[4px] p-4 text-white focus:border-ochre focus:outline-none transition-all appearance-none"
                      >
                         <option value="safari" className="bg-midnight">{t('enquiry.form.options.safari')}</option>
                         <option value="city" className="bg-midnight">{t('enquiry.form.options.city')}</option>
                         <option value="combo" className="bg-midnight">{t('enquiry.form.options.combo')}</option>
                         <option value="full" className="bg-midnight">{t('enquiry.form.options.full')}</option>
                      </select>
                    </div>
                </div>

                 <div>
                    <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">{t('enquiry.form.budget')}</label>
                    <select 
                       value={formData.budget}
                       onChange={(e) => handleInputChange('budget', e.target.value)}
                       className="w-full bg-white/5 border border-white/10 rounded-[4px] p-4 text-white focus:border-ochre focus:outline-none transition-all appearance-none"
                    >
                       <option value="none" className="bg-midnight">{t('enquiry.form.budgetOptions.none')}</option>
                       <option value="under-500" className="bg-midnight">{t('enquiry.form.budgetOptions.under500')}</option>
                       <option value="500-1000" className="bg-midnight">{t('enquiry.form.budgetOptions.500to1000')}</option>
                       <option value="1000-2000" className="bg-midnight">{t('enquiry.form.budgetOptions.1000to2000')}</option>
                       <option value="over-2000" className="bg-midnight">{t('enquiry.form.budgetOptions.over2000')}</option>
                    </select>
                 </div>

                 <div>
                  <label className="block text-[11px] uppercase tracking-widest text-sand font-bold mb-3">{t('enquiry.form.message')}</label>
                  <textarea 
                    rows="4" 
                    placeholder={t('enquiry.form.messagePlaceholder')} 
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-[4px] p-4 text-white placeholder:text-zinc-500 focus:border-ochre focus:outline-none transition-all" 
                  />
                </div>

                 <div className="flex flex-col gap-4">
                  <button 
                    type="button"
                    onClick={() => {
                      if (!isValidEmail(formData.email)) {
                        alert(t('booking.alerts.invalidEmail'));
                        return;
                      }
                      // For now, general enquiry just shows success if it's not going to PayPal
                      setIsSuccess(true);
                    }}
                    className="btn-ochre w-full py-5 text-base uppercase tracking-widest font-bold"
                  >
                    {t('enquiry.form.btns.send')}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      if (!isValidEmail(formData.email)) {
                        alert(t('booking.alerts.invalidEmail'));
                        return;
                      }
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-5 text-base uppercase tracking-widest font-bold bg-white text-midnight border border-white hover:bg-transparent hover:text-white transition-colors"
                  >
                    {t('enquiry.form.btns.deposit', { amount: totalDeposit.toLocaleString() })}
                  </button>
                </div>

                <p className="text-[11px] text-zinc-500 text-center uppercase tracking-wider">{t('enquiry.form.btns.note')}</p>
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
