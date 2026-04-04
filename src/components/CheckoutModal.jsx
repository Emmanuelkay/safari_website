import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// Standard public Stripe test key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const StripeCheckoutForm = ({ amount, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    // Fake processing delay as we don't have a backend to confirm the Intent
    setTimeout(() => {
      setIsProcessing(false);
      setMessage("Note: This is a frontend simulation. Connect a backend to capture this test payment.");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <div className="flex gap-4 pt-4">
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 py-4 text-[13px] uppercase tracking-widest font-bold text-zinc-500 border border-zinc-200 rounded-[4px] hover:bg-zinc-50 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isProcessing || !stripe || !elements}
          className="flex-1 py-4 text-[13px] uppercase tracking-widest font-bold bg-midnight text-white border border-midnight rounded-[4px] hover:bg-midnight/90 transition-colors disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : `Pay $${amount}`}
        </button>
      </div>
      {message && <div className="text-sm font-medium text-amber-600 text-center">{message}</div>}
    </form>
  );
};

export const CheckoutModal = ({ isOpen, onClose, amount = 500, tripDetails = "Safari Expedition" }) => {
  const [method, setMethod] = useState('card'); // 'card' or 'paypal'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-midnight/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-[4px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Order Summary Side */}
        <div className="bg-[#F5F0E8] p-8 md:w-[45%] flex flex-col justify-between">
          <div>
            <span className="text-sand font-heading text-xs font-semibold tracking-[2px] uppercase opacity-90 block mb-2">Order Summary</span>
            <h3 className="text-2xl font-heading text-midnight mb-6">Secure Your Journey</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Booking:</span>
                <span className="font-medium text-midnight border-b border-sand/30 pb-1">{tripDetails}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Secure Deposit:</span>
                <span className="font-semibold text-midnight">${amount}.00</span>
              </div>
              <div className="h-px bg-sand/30 w-full my-4" />
              <div className="flex justify-between text-lg font-heading">
                <span className="text-midnight">Total Due:</span>
                <span className="text-ochre">${amount}.00</span>
              </div>
            </div>
          </div>
          
          <div className="text-[11px] text-zinc-500 flex items-center gap-2 uppercase tracking-wider">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            SSL Secure Checkout
          </div>
        </div>

        {/* Payment Side */}
        <div className="p-8 md:w-[55%] bg-white flex flex-col">
          <div className="flex gap-4 mb-8">
            <button 
              className={`flex-1 flex justify-center items-center gap-2 py-3 text-[11px] tracking-widest uppercase font-bold border-b-2 transition-colors ${method === 'card' ? 'border-ochre text-ochre' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
              onClick={() => setMethod('card')}
            >
              Credit Card
            </button>
            <button 
              className={`flex-1 flex justify-center items-center gap-2 py-3 text-[11px] tracking-widest uppercase font-bold border-b-2 transition-colors ${method === 'paypal' ? 'border-[#003087] text-[#003087]' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
              onClick={() => setMethod('paypal')}
            >
              PayPal
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {method === 'card' ? (
              <Elements stripe={stripePromise} options={{ 
                mode: 'payment', 
                amount: amount * 100, 
                currency: 'usd', 
                appearance: { 
                  theme: 'stripe', 
                  variables: { 
                    colorPrimary: '#C19A5B', 
                    colorBackground: '#ffffff', 
                    colorText: '#2C2A25' 
                  } 
                } 
              }}>
                <StripeCheckoutForm amount={amount} onCancel={onClose} />
              </Elements>
            ) : (
              <div className="space-y-6">
                <PayPalScriptProvider options={{ "client-id": "test", components: "buttons", currency: "USD" }}>
                  <PayPalButtons 
                    style={{ layout: "vertical", shape: "rect", color: "gold", label: "pay" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{ amount: { value: amount.toString() } }]
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        alert(`Transaction completed by ${details.payer.name.given_name}. (Test Mode)`);
                        onClose();
                      });
                    }}
                  />
                </PayPalScriptProvider>
                <button 
                  onClick={onClose}
                  className="w-full py-4 mt-2 text-[13px] uppercase tracking-widest font-bold text-zinc-500 border border-zinc-200 rounded-[4px] hover:bg-zinc-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
