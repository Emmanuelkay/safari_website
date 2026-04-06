import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  MoreVertical, 
  Calendar, 
  DollarSign,
  Search,
  Filter,
  X,
  ShieldCheck,
  Clock,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

const COLUMNS = [
  { id: 'ENQUIRY', label: 'New Enquiries', color: 'bg-amber-500' },
  { id: 'QUOTE_SENT', label: 'Quoted', color: 'bg-blue-500' },
  { id: 'CONFIRMED_DEPOSIT', label: 'Deposit Paid', color: 'bg-gold' },
  { id: 'CONFIRMED_FULL', label: 'Fully Paid', color: 'bg-green-600' },
  { id: 'PAYMENT_FAILED', label: 'Failed/Alerts', color: 'bg-red-500' },
  { id: 'COMPLETED', label: 'Archived', color: 'bg-zinc-400' }
];

/**
 * 💳 Payment Details Drawer Component
 */
const PaymentDrawer = ({ booking, onClose }) => {
  if (!booking) return null;

  const formatDate = (ts) => {
    if (!ts) return 'N/A';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleString('en-KE', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[300] border-l border-zinc-100 flex flex-col"
    >
      <div className="p-8 border-b border-zinc-100 flex justify-between items-center bg-ivory/30">
        <div>
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] block mb-1">Transaction Audit</span>
          <h3 className="text-2xl font-heading text-charcoal">{booking.ref || 'Booking Details'}</h3>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-zinc-400">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Status Pill */}
        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-custom border border-zinc-100">
          <span className="text-xs text-zinc-500 font-medium">Pipeline Status</span>
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white",
            COLUMNS.find(c => c.id === booking.status)?.color || 'bg-zinc-400'
          )}>
            {booking.status?.replace('_', ' ')}
          </span>
        </div>

        {/* Guest Summary */}
        <section>
          <h4 className="text-[11px] font-bold text-charcoal/40 uppercase tracking-widest mb-4 flex items-center gap-2">
             <Clock size={14} /> Guest Intelligence
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400 italic">Traveler:</span>
              <span className="font-bold text-charcoal">{booking.fullName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400 italic">Expedition:</span>
              <span className="font-bold text-charcoal">{booking.packageName}</span>
            </div>
          </div>
        </section>

        <div className="h-px bg-zinc-100" />

        {/* Financial Audit */}
        <section>
          <h4 className="text-[11px] font-bold text-charcoal/40 uppercase tracking-widest mb-4 flex items-center gap-2">
             <ShieldCheck size={14} className="text-gold" /> PayPal Audit Log
          </h4>
          
          <div className="bg-ivory/20 rounded-custom border border-gold/10 p-6 space-y-5">
            <div>
              <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Capture ID</label>
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono text-charcoal bg-white px-2 py-1 rounded border border-zinc-100">
                  {booking.paypalCaptureId || 'AWAITING_CAPTURE'}
                </code>
                {booking.paypalCaptureId && (
                  <a href={`https://www.paypal.com/activity/payment/${booking.paypalCaptureId}`} target="_blank" rel="noreferrer" className="text-gold hover:text-charcoal transition-colors">
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Deposit Paid</label>
                <p className="text-lg font-heading text-gold">${(booking.depositPaid || 0).toLocaleString()}</p>
              </div>
              <div>
                <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Confirmed At</label>
                <p className="text-[11px] font-medium text-charcoal">{formatDate(booking.depositPaidAt)}</p>
              </div>
            </div>

            <div>
              <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Remaining Balance</label>
              <p className="text-sm font-bold text-red-500">${(booking.balanceDue || 0).toLocaleString()}</p>
            </div>
          </div>
        </section>

        {booking.status === 'PAYMENT_FAILED' && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-custom flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0" size={18} />
            <div>
              <h5 className="text-[11px] font-bold text-red-700 uppercase tracking-widest mb-1">Verification Denied</h5>
              <p className="text-xs text-red-600/80">The bank or PayPal has aborted this transaction. Please contact the guest.</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 border-t border-zinc-100">
        <button 
          onClick={onClose}
          className="w-full py-4 bg-charcoal text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-custom hover:opacity-90 transition-all"
        >
          Close Log
        </button>
      </div>
    </motion.div>
  );
};

export const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const q = collection(db, "bookings");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "bookings", id), { 
        status: newStatus,
        lastAdminAction: new Date().toISOString()
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse italic">Connecting to Field Records...</div>;

  return (
    <div className="relative">
      <div className="space-y-8 p-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-heading text-charcoal mb-2">Expedition Pipeline</h2>
            <p className="text-zinc-500 text-sm font-body uppercase text-[11px] font-bold tracking-widest opacity-60">
              Live tracking from Nairobi Operations
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center bg-white border border-zinc-200 px-4 py-2 rounded-lg text-sm text-zinc-400">
              <Search size={16} />
              <input placeholder="Search bookings..." className="bg-transparent border-none outline-none ml-2" />
            </div>
            <button className="bg-white border border-zinc-200 p-3 rounded-lg text-zinc-400 hover:text-charcoal transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-10 min-h-[750px] custom-scrollbar">
          {COLUMNS.map((col) => (
            <div key={col.id} className="flex-shrink-0 w-80 flex flex-col gap-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full", col.color)} />
                  <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] text-charcoal/60">{col.label}</h3>
                  <span className="bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded text-[10px] font-bold">
                    {bookings.filter(b => b.status === col.id).length}
                  </span>
                </div>
                <button className="text-zinc-300 hover:text-zinc-500"><Plus size={16} /></button>
              </div>

              <div className="flex-grow space-y-4">
                {bookings
                  .filter(b => b.status === col.id)
                  .map((booking) => (
                    <div 
                      key={booking.id} 
                      onClick={() => setSelectedBooking(booking)}
                      className="bg-white p-6 rounded-custom border border-zinc-200 shadow-sm hover:shadow-xl hover:border-gold/20 transition-all group overflow-hidden relative cursor-pointer"
                    >
                      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             const idx = COLUMNS.findIndex(c => c.id === col.id);
                             const next = COLUMNS[(idx + 1) % COLUMNS.length].id;
                             updateStatus(booking.id, next);
                           }}
                           className="p-1 hover:bg-zinc-100 rounded text-zinc-400"
                          >
                           <MoreVertical size={16} />
                         </button>
                      </div>

                      <div className="mb-4">
                         <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-bold text-gold uppercase tracking-widest">{booking.ref || 'REF-TBD'}</span>
                            {booking.paypalCaptureId && (
                              <ShieldCheck size={12} className="text-green-500" />
                            )}
                         </div>
                         <h4 className="font-bold text-charcoal group-hover:text-gold transition-colors">{booking.fullName}</h4>
                      </div>

                      <div className="space-y-2 mb-6">
                         <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
                            <Calendar size={14} className="opacity-40" />
                            <span>{booking.dates || 'Dates Pending'}</span>
                         </div>
                         <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
                            <DollarSign size={14} className="opacity-40" />
                            <span className="font-bold text-charcoal">${(booking.totalAmountUSD || 0).toLocaleString()}</span>
                         </div>
                      </div>

                      {booking.depositPaid > 0 && (
                        <div className="mt-4 pt-4 border-t border-zinc-50 flex justify-between items-center">
                           <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Deposit Received</span>
                           <span className="text-[11px] font-bold text-green-600">${booking.depositPaid.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-over Overlay */}
      <AnimatePresence>
        {selectedBooking && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[250]"
            />
            <PaymentDrawer 
              booking={selectedBooking} 
              onClose={() => setSelectedBooking(null)} 
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
