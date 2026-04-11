import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  MapPin,
  Clock,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, limit, onSnapshot, orderBy } from 'firebase/firestore';
import { cn } from '../../lib/utils';

const StatCard = ({ title, value, icon, loading }) => (
  <div className="bg-white p-8 rounded-custom shadow-sm border border-zinc-200">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-gold/10 rounded-lg text-gold font-bold">
        {icon}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">{title}</p>
      <h3 className="text-3xl font-heading text-charcoal font-semibold">
        {loading ? <span className="inline-block w-20 h-8 bg-zinc-100 rounded animate-pulse" /> : value}
      </h3>
    </div>
  </div>
);

const STATUS_COLORS = {
  ENQUIRY: "bg-amber-100 text-amber-700",
  QUOTE_SENT: "bg-blue-100 text-blue-700",
  CONFIRMED_DEPOSIT: "bg-gold/20 text-gold",
  CONFIRMED_FULL: "bg-green-100 text-green-700",
  PAYMENT_FAILED: "bg-red-100 text-red-700",
  FLAGGED_UNDERPAID: "bg-red-100 text-red-700",
  COMPLETED: "bg-zinc-100 text-zinc-500",
};

export const AdminDashboard = () => {
  const [recentBookings, setRecentBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recentQ = query(collection(db, "bookings"), orderBy("createdAt", "desc"), limit(5));
    const allQ = collection(db, "bookings");

    const unsubRecent = onSnapshot(recentQ, (snapshot) => {
      setRecentBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubAll = onSnapshot(allQ, (snapshot) => {
      setAllBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => { unsubRecent(); unsubAll(); };
  }, []);

  // Compute real stats from Firestore data
  const totalBookings = allBookings.length;
  const totalRevenue = allBookings.reduce((sum, b) => sum + (b.depositPaid || 0), 0);
  const confirmedBookings = allBookings.filter(b =>
    ['CONFIRMED_DEPOSIT', 'CONFIRMED_FULL', 'COMPLETED'].includes(b.status)
  ).length;
  const conversionRate = totalBookings > 0
    ? ((confirmedBookings / totalBookings) * 100).toFixed(1)
    : '0.0';
  const activeExpeditions = allBookings.filter(b =>
    ['CONFIRMED_DEPOSIT', 'CONFIRMED_FULL'].includes(b.status)
  ).length;

  const stats = [
    { title: "Total Bookings", value: totalBookings.toLocaleString(), icon: <Users size={20} /> },
    { title: "Revenue Collected", value: `$${totalRevenue.toLocaleString()}`, icon: <DollarSign size={20} /> },
    { title: "Conversion Rate", value: `${conversionRate}%`, icon: <ArrowUpRight size={20} /> },
    { title: "Active Expeditions", value: activeExpeditions.toLocaleString(), icon: <Calendar size={20} /> },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-heading text-charcoal mb-2">Expedition Summary</h2>
          <p className="text-zinc-500 text-sm font-body tracking-tight font-medium uppercase text-[11px] opacity-70">
            Real-time insights from Firestore
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => <StatCard key={i} {...stat} loading={loading} />)}
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* Recent Pipeline */}
        <div className="bg-white rounded-custom shadow-sm border border-zinc-200 overflow-hidden">
          <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
            <h3 className="font-heading text-2xl text-charcoal tracking-tight">Recent Pipeline</h3>
            <Link to="/admin/bookings" className="text-[11px] font-bold uppercase text-gold hover:underline tracking-widest">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50/50 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <th className="px-8 py-5">Ref</th>
                  <th className="px-8 py-5">Guest</th>
                  <th className="px-8 py-5">Safari</th>
                  <th className="px-8 py-5">Total</th>
                  <th className="px-8 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-body">
                {loading ? (
                  <tr><td colSpan="5" className="p-20 text-center animate-pulse italic text-zinc-400">Loading bookings...</td></tr>
                ) : recentBookings.length === 0 ? (
                  <tr><td colSpan="5" className="p-20 text-center italic text-zinc-400">No bookings yet.</td></tr>
                ) : (
                  recentBookings.map((b) => (
                    <tr key={b.id} className="border-t border-zinc-50 hover:bg-zinc-50/50 transition-all">
                      <td className="px-8 py-6 font-bold text-earth text-[11px] tracking-widest">{b.ref || b.bookingRef || '—'}</td>
                      <td className="px-8 py-6">
                        <div>
                          <p className="font-bold text-charcoal">{b.fullName}</p>
                          <p className="text-[10px] text-zinc-400">{b.email}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-[13px] font-medium text-charcoal">{b.packageName}</td>
                      <td className="px-8 py-6">
                        <p className="font-bold text-charcoal">${(b.totalAmount || 0).toLocaleString()}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest",
                          STATUS_COLORS[b.status] || "bg-zinc-100 text-zinc-500"
                        )}>
                          {(b.status || 'UNKNOWN').replace(/_/g, ' ')}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-charcoal rounded-custom p-8 text-ivory flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-heading text-2xl tracking-tight">Status Breakdown</h3>
              <span className="p-3 bg-white/5 rounded-lg text-gold border border-white/10"><MapPin size={20} /></span>
            </div>
          </div>

          <div className="space-y-4 flex-grow">
            {[
              { label: 'New Enquiries', status: 'ENQUIRY', color: 'bg-amber-500' },
              { label: 'Deposit Paid', status: 'CONFIRMED_DEPOSIT', color: 'bg-gold' },
              { label: 'Fully Paid', status: 'CONFIRMED_FULL', color: 'bg-green-500' },
              { label: 'Completed', status: 'COMPLETED', color: 'bg-zinc-400' },
              { label: 'Failed/Flagged', status: 'PAYMENT_FAILED', color: 'bg-red-500' },
            ].map((item) => {
              const count = allBookings.filter(b => b.status === item.status).length;
              const pct = totalBookings > 0 ? ((count / totalBookings) * 100).toFixed(0) : 0;
              return (
                <div key={item.status} className="flex items-center gap-4 p-4 bg-white/5 rounded border border-white/10">
                  <div className={cn("w-3 h-3 rounded-full flex-shrink-0", item.color)} />
                  <div className="flex-grow">
                    <p className="text-[11px] font-bold uppercase tracking-widest">{item.label}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-heading font-bold">{count}</span>
                    <span className="text-[10px] text-ivory/40 ml-2">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
