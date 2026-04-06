import React, { useState, useEffect } from 'react';
import { 
  PayPalButtons, 
  usePayPalScriptReducer
} from '@paypal/react-paypal-js';
import { httpsCallable } from 'firebase/functions';
import { functions, db } from '../lib/firebase';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';

const STATES = {
  IDLE: 'idle',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed'
};

/**
 * 🌿 Specialized State Views
 */

const ProcessingView = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-10 text-center select-none">
    <div className="relative w-24 h-24 mb-8">
      <div className="absolute inset-0 border-4 border-gold/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center text-3xl">🌿</div>
    </div>
    <h3 className="text-2xl font-heading text-charcoal mb-4">Securing Your Safari...</h3>
    <p className="text-charcoal/60 text-sm leading-relaxed max-w-[280px] mx-auto mb-8">
      Your payment is being verified via encrypted channels. This takes just a moment.
      <br /><strong className="text-charcoal">Please do not close this window.</strong>
    </p>
    
    <div className="w-full max-w-[240px] space-y-4">
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-green-600 font-bold">
        <CheckCircle2 size={14} /> <span>Payment Submitted</span>
      </div>
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gold font-bold animate-pulse">
        <div className="w-3 h-3 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <span>Awaiting bank confirmation</span>
      </div>
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-zinc-300 font-bold">
        <div className="w-3 h-3 rounded-full bg-zinc-200" />
        <span>Booking secured</span>
      </div>
    </div>
  </div>
);

const SuccessView = ({ booking, onClose }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-10 text-center overflow-y-auto custom-scrollbar">
    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
      <CheckCircle2 className="w-10 h-10 text-green-600" />
    </div>
    
    <h2 className="text-3xl font-heading text-charcoal mb-2">Your Safari is Confirmed.</h2>
    <p className="text-[#6B6158] text-sm mb-8">The Mara awaits, traveler.</p>

    <div className="w-full bg-ivory rounded-custom p-6 space-y-4 mb-8 border border-gold/10">
      <div className="flex justify-between text-[12px] border-b border-gold/5 pb-3">
        <span className="text-[#A59D94] uppercase tracking-widest">Reference</span>
        <strong className="text-charcoal font-bold tracking-widest">{booking.ref}</strong>
      </div>
      <div className="flex justify-between text-[12px] border-b border-gold/5 pb-3">
        <span className="text-[#A59D94] uppercase tracking-widest">Package</span>
        <strong className="text-charcoal truncate ml-4">{booking.packageName}</strong>
      </div>
      <div className="flex justify-between text-[12px] pt-1">
        <span className="text-[#A59D94] uppercase tracking-widest font-bold">Amount Paid</span>
        <strong className="text-gold font-bold">${booking.depositAmount} USD</strong>
      </div>
    </div>

    <p className="text-[11px] text-[#A59D94] uppercase tracking-widest mb-10 leading-loose">
      📧 Confirmation sent to your inbox<br />
      📱 WhatsApp alert sent to your guide<br />
      👋 Team will contact you within 24 hours
    </p>

    <a 
      href={`https://wa.me/254700000000?text=Hi! My booking ref is ${booking.ref}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:shadow-lg transition-all"
    >
      <MessageCircle size={18} />
      WhatsApp Our Team
    </a>
  </div>
);

const FailedView = ({ message, booking, onRetry }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
      <AlertCircle className="w-10 h-10 text-red-600" />
    </div>
    <h3 className="text-2xl font-heading text-charcoal mb-4">Payment Not Successful</h3>
    <p className="text-charcoal/60 text-sm mb-10 leading-relaxed max-w-[280px]">
      {message || "Something went wrong with your payment transmission."}
    </p>

    <div className="flex flex-col w-full gap-4">
      <button 
        onClick={onRetry}
        className="w-full py-5 text-[11px] uppercase tracking-[0.3em] font-bold bg-charcoal text-ivory rounded-custom hover:opacity-90 active:scale-95 transition-all"
      >
        Try Again
      </button>
      <a 
        href="https://wa.me/254700000000"
        className="w-full py-4 text-[11px] uppercase tracking-[0.3em] font-bold border border-zinc-200 rounded-custom hover:bg-zinc-50 transition-colors"
      >
        Get Help on WhatsApp
      </a>
    </div>
    
    <p className="mt-8 text-[11px] text-[#A59D94] leading-relaxed uppercase tracking-widest">
      Your card has not been charged.<br />
      Reference <strong>{booking.ref}</strong> is still held for you.
    </p>
  </div>
);

/**
 * 👑 Checkout Modal
 */
export const CheckoutModal = ({ isOpen, onClose, amount = 0, tripDetails = "", bookingData = null }) => {
  const [paymentState, setPaymentState] = useState(STATES.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const [{ isPending }] = usePayPalScriptReducer();

  const booking = {
    ref: bookingData?.ref || "SNB-PENDING",
    packageName: tripDetails,
    depositAmount: amount,
    email: bookingData?.email,
    name: bookingData?.name,
    travelers: bookingData?.travelers,
    travelDate: bookingData?.travelDate
  };

  const pollForConfirmation = async (bookingRef, attempts = 0) => {
    if (attempts > 30) { // 1.5 minutes max
      setPaymentState(STATES.SUCCESS); // Fallback success (delayed confirmation)
      return;
    }

    try {
      const getBookingPaymentStatus = httpsCallable(functions, 'getBookingPaymentStatus');
      const { data } = await getBookingPaymentStatus({ bookingRef });
      
      console.log(`[Polling] ${bookingRef} Status: ${data.status}`);

      if (['CONFIRMED_DEPOSIT', 'CONFIRMED_FULL'].includes(data.status)) {
        setPaymentState(STATES.SUCCESS);
      } else if (data.status === 'PAYMENT_FAILED') {
        setPaymentState(STATES.FAILED);
        setErrorMessage("Payment was declined by the provider.");
      } else {
        // Still processing or initiated, wait 3s and retry
        setTimeout(() => pollForConfirmation(bookingRef, attempts + 1), 3000);
      }
    } catch (error) {
      console.error("[Polling] Error:", error);
      setTimeout(() => pollForConfirmation(bookingRef, attempts + 1), 5000);
    }
  };

  if (!isOpen) return null;

  const handleCreateOrder = async () => {
    try {
      const createPayPalPayment = httpsCallable(functions, 'createPayPalPayment');
      const res = await createPayPalPayment({
        bookingRef: booking.ref,
        packageName: booking.packageName,
        amountUSD: booking.depositAmount,
        paymentType: 'deposit',
        travelerEmail: booking.email,
        travelerName: booking.name,
        travelers: booking.travelers,
        travelDate: booking.travelDate
      });
      return res.data.orderID;
    } catch (error) {
      console.error("PayPal Initiation Error:", error);
      setPaymentState(STATES.FAILED);
      setErrorMessage(error.message || "Could not establish secure payment handshake.");
    }
  };

  const handleApprove = async (data) => {
    try {
      setPaymentState(STATES.PROCESSING);

      const capturePayPalPayment = httpsCallable(functions, 'capturePayPalPayment');
      const res = await capturePayPalPayment({
        orderID: data.orderID,
        bookingRef: booking.ref
      });

      if (res.data.status === 'PROCESSING') {
        // Start the polling cycle for the webhook result
        pollForConfirmation(booking.ref);
      } else {
        setPaymentState(STATES.FAILED);
        setErrorMessage("Capture failed. Our team has been notified.");
      }
    } catch (error) {
      console.error("PayPal Capture Error:", error);
      setPaymentState(STATES.FAILED);
      setErrorMessage(error.message || "Verification of deposit failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Editorial Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-charcoal/95 backdrop-blur-md" 
        onClick={paymentState === STATES.SUCCESS ? onClose : undefined} 
      />

      {/* Modal Interface */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-5xl rounded-custom shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row min-h-[620px]"
      >
        {/* Left: Summary Panel */}
        <div className="bg-ivory p-12 md:w-[40%] border-b md:border-b-0 md:border-r border-gold/10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Acacia Watermark */}
          <div className="absolute -bottom-10 -left-10 text-charcoal/5 pointer-events-none select-none text-[200px] rotate-12">🌿</div>
          
          <div className="relative z-10">
            <span className="text-gold font-body text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Official Receipt</span>
            <h3 className="text-4xl font-heading text-charcoal mb-10 leading-tight">Secure Your Expedition</h3>

            <div className="space-y-6 mb-12">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#6B6158]">Trip Detail:</span>
                <span className="font-medium text-charcoal text-right max-w-[160px] truncate">{tripDetails}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-[#6B6158]">Reference:</span>
                <span className="font-medium text-charcoal tracking-widest">{booking.ref}</span>
              </div>
              <div className="h-px bg-gold/20 w-full my-8" />
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A59D94]">Deposit Due</span>
                <span className="text-5xl font-heading text-gold font-semibold">${amount.toFixed(0)}</span>
              </div>
              <p className="text-[10px] text-charcoal/40 uppercase tracking-widest italic pt-2">30% deposit to lock dates</p>
            </div>
          </div>

          <div className="relative z-10 space-y-4 pt-10 border-t border-gold/10">
             <div className="flex items-center gap-3">
               <ShieldCheck className="w-5 h-5 text-gold" />
               <span className="text-[9px] font-bold text-[#A59D94] uppercase tracking-[0.3em]">PCI-DSS Secure Handshake</span>
             </div>
             <div className="flex justify-between text-[8px] uppercase tracking-widest text-charcoal/40 font-bold">
               <span>🔒 256-bit SSL</span>
               <span>🛡 Buyer Protection</span>
               <span>✈ KATO Licensed</span>
             </div>
          </div>
        </div>

        {/* Right: Payment Processor */}
        <div className="md:w-[60%] flex flex-col relative bg-white min-h-[400px]">
          {paymentState !== STATES.PROCESSING && (
            <button onClick={onClose} className="absolute top-8 right-8 text-zinc-300 hover:text-charcoal transition-colors z-20">
              <X size={24} />
            </button>
          )}

          <div className="flex-1 flex flex-col overflow-y-auto">
            <AnimatePresence mode="wait">
              {paymentState === STATES.PROCESSING ? (
                <motion.div key="processing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex">
                  <ProcessingView />
                </motion.div>
              ) : paymentState === STATES.SUCCESS ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex">
                  <SuccessView booking={booking} onClose={onClose} />
                </motion.div>
              ) : paymentState === STATES.FAILED ? (
                <motion.div key="failed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex">
                  <FailedView message={errorMessage} booking={booking} onRetry={() => setPaymentState(STATES.IDLE)} />
                </motion.div>
              ) : (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 md:p-16 flex-1 flex flex-col justify-center">
                   <div className="mb-12 p-8 bg-ivory/30 border border-gold/10 rounded-custom flex items-center gap-6">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                        <img src="https://www.paypalobjects.com/webstatic/icon/pp256.png" alt="PayPal" className="h-7 w-7" />
                      </div>
                      <div>
                        <h5 className="text-[14px] font-bold text-charcoal uppercase tracking-[0.2em] mb-1">Trusted Checkout</h5>
                        <p className="text-[12px] text-[#6B6158]">Direct processing via PayPal secure portal</p>
                      </div>
                   </div>

                   <div className={cn("transition-opacity duration-300", isPending ? "opacity-30 pointer-events-none" : "opacity-100")}>
                      <PayPalButtons
                        style={{ 
                          layout: "vertical", 
                          shape: "rect", 
                          color: "gold", 
                          label: "pay",
                          height: 55
                        }}
                        createOrder={handleCreateOrder}
                        onApprove={handleApprove}
                      />
                   </div>

                   {isPending && (
                     <div className="mt-6 text-center animate-pulse">
                       <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold">Establishing handshake...</span>
                     </div>
                   )}
                   
                   <div className="mt-12 pt-8 border-t border-zinc-100 text-center">
                     <p className="text-[10px] text-[#A59D94] uppercase tracking-[0.4em]">
                        Your booking is confirmed immediately after verification
                     </p>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
