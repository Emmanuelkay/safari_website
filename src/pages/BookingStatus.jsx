import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, AlertCircle, Package } from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';
import { cn } from '../lib/utils';
import { SEO } from '../components/SEO';

const STATUS_MAP = {
  ENQUIRY: { label: 'Enquiry Received', color: 'text-amber-600 bg-amber-50', icon: Clock, desc: 'We have received your booking request. Our team will be in touch within 24 hours.' },
  QUOTE_SENT: { label: 'Quote Sent', color: 'text-blue-600 bg-blue-50', icon: Package, desc: 'A detailed quote has been sent to your email. Please review and confirm.' },
  CONFIRMED_DEPOSIT: { label: 'Deposit Confirmed', color: 'text-gold bg-gold/10', icon: CheckCircle2, desc: 'Your deposit has been received. Your safari is secured! We will send your itinerary shortly.' },
  CONFIRMED_FULL: { label: 'Fully Paid', color: 'text-green-600 bg-green-50', icon: CheckCircle2, desc: 'Payment complete. Your expedition is fully confirmed. See you in Kenya!' },
  COMPLETED: { label: 'Completed', color: 'text-zinc-600 bg-zinc-100', icon: CheckCircle2, desc: 'This expedition has been completed. Thank you for traveling with us!' },
  PAYMENT_FAILED: { label: 'Payment Issue', color: 'text-red-600 bg-red-50', icon: AlertCircle, desc: 'There was an issue with your payment. Please contact us for assistance.' },
  FLAGGED_UNDERPAID: { label: 'Under Review', color: 'text-red-600 bg-red-50', icon: AlertCircle, desc: 'Your booking is under review. Our team will contact you shortly.' },
};

export const BookingStatus = () => {
  const [ref, setRef] = useState('');
  const [email, setEmail] = useState('');
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!ref.trim() || !email.trim()) return;

    setLoading(true);
    setError('');
    setBooking(null);

    try {
      const lookupFn = httpsCallable(functions, 'lookupBooking');
      const { data } = await lookupFn({ bookingRef: ref.trim(), email: email.trim() });
      setBooking(data);
    } catch (err) {
      setError(err.message === 'No booking found with that reference and email combination.'
        ? 'No booking found. Please check your reference number and email address.'
        : 'Something went wrong. Please try again or contact us via WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  };

  const statusInfo = booking ? (STATUS_MAP[booking.status] || STATUS_MAP.ENQUIRY) : null;
  const StatusIcon = statusInfo?.icon;

  return (
    <>
      <SEO
        title="Check Booking Status | Savanna & Beyond"
        description="Look up your safari booking status with your reference number and email."
        url="https://savannabeyond.co.ke/booking/status"
      />
      <div className="pt-32 pb-24 bg-ivory min-h-screen">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold font-body text-[11px] font-bold tracking-[0.4em] uppercase mb-4 block">Traveler Portal</span>
            <h1 className="text-4xl md:text-5xl font-heading text-charcoal mb-4">Check Your Booking</h1>
            <p className="text-zinc-500 font-body">Enter your booking reference and email to view your status.</p>
          </div>

          <form onSubmit={handleLookup} className="bg-white p-8 rounded-custom border border-zinc-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <label htmlFor="booking-ref" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Booking Reference</label>
              <input
                id="booking-ref"
                type="text"
                value={ref}
                onChange={(e) => setRef(e.target.value.toUpperCase())}
                placeholder="SNB-A3F7B2C91E04"
                className="w-full bg-ivory border border-gold/10 p-4 rounded-custom font-body font-mono tracking-wider"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="booking-email" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
              <input
                id="booking-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                className="w-full bg-ivory border border-gold/10 p-4 rounded-custom font-body"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-charcoal py-4 rounded-custom font-bold uppercase tracking-[0.2em] text-[12px] flex items-center justify-center gap-3 hover:-translate-y-0.5 transition-transform shadow-lg disabled:opacity-50"
            >
              {loading ? 'Looking up...' : <><Search size={16} /> Find My Booking</>}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-5 bg-red-50 border border-red-100 rounded-custom text-red-600 text-sm text-center" role="alert">
              {error}
            </div>
          )}

          {booking && statusInfo && (
            <div className="mt-8 bg-white rounded-custom border border-zinc-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              {/* Status Banner */}
              <div className={cn("p-6 flex items-center gap-4", statusInfo.color)}>
                <StatusIcon size={24} />
                <div>
                  <h3 className="font-bold text-lg">{statusInfo.label}</h3>
                  <p className="text-sm opacity-80">{statusInfo.desc}</p>
                </div>
              </div>

              {/* Details */}
              <div className="p-8 space-y-5">
                <div className="flex justify-between text-sm border-b border-zinc-100 pb-4">
                  <span className="text-zinc-400">Reference</span>
                  <span className="font-bold font-mono tracking-wider text-charcoal">{booking.ref}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-zinc-100 pb-4">
                  <span className="text-zinc-400">Package</span>
                  <span className="font-bold text-charcoal">{booking.packageName}</span>
                </div>
                {booking.travelDate && (
                  <div className="flex justify-between text-sm border-b border-zinc-100 pb-4">
                    <span className="text-zinc-400">Travel Date</span>
                    <span className="font-bold text-charcoal">{booking.travelDate}</span>
                  </div>
                )}
                {booking.guests && (
                  <div className="flex justify-between text-sm border-b border-zinc-100 pb-4">
                    <span className="text-zinc-400">Travelers</span>
                    <span className="font-bold text-charcoal">{booking.guests}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm border-b border-zinc-100 pb-4">
                  <span className="text-zinc-400">Total Amount</span>
                  <span className="font-bold text-charcoal">${(booking.totalAmount || 0).toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-zinc-400">Paid</span>
                  <span className="font-bold text-gold">${(booking.depositPaid || 0).toLocaleString()} USD</span>
                </div>
              </div>

              {/* Help */}
              <div className="px-8 pb-8">
                <a
                  href={`https://wa.me/254718592358?text=Hi, I have a question about booking ${booking.ref}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 border border-charcoal text-charcoal rounded-custom font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-charcoal hover:text-ivory transition-colors"
                >
                  Questions? WhatsApp Us
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
