import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { cn } from '../../lib/utils';
import { DollarSign, Users, TrendingUp, Package } from 'lucide-react';

const STATUS_LABELS = {
  ENQUIRY: 'Enquiry',
  QUOTE_SENT: 'Quoted',
  CONFIRMED_DEPOSIT: 'Deposit Paid',
  CONFIRMED_FULL: 'Fully Paid',
  PAYMENT_FAILED: 'Failed',
  FLAGGED_UNDERPAID: 'Flagged',
  COMPLETED: 'Completed',
};

const STATUS_COLORS = {
  ENQUIRY: 'bg-amber-500',
  QUOTE_SENT: 'bg-blue-500',
  CONFIRMED_DEPOSIT: 'bg-gold',
  CONFIRMED_FULL: 'bg-green-500',
  PAYMENT_FAILED: 'bg-red-500',
  FLAGGED_UNDERPAID: 'bg-red-400',
  COMPLETED: 'bg-zinc-400',
};

export const AdminAnalytics = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bookings"), (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="p-20 text-center animate-pulse italic text-zinc-400">Loading analytics...</div>;
  }

  // Revenue metrics
  const totalBookedValue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const totalCollected = bookings.reduce((sum, b) => sum + (b.depositPaid || 0), 0);
  const totalOutstanding = totalBookedValue - totalCollected;
  const avgBookingValue = bookings.length > 0 ? totalBookedValue / bookings.length : 0;

  // Status breakdown
  const statusCounts = {};
  bookings.forEach(b => {
    const s = b.status || 'UNKNOWN';
    statusCounts[s] = (statusCounts[s] || 0) + 1;
  });

  // Package popularity
  const packageCounts = {};
  bookings.forEach(b => {
    const name = b.packageName || 'Unknown';
    if (!packageCounts[name]) packageCounts[name] = { count: 0, revenue: 0 };
    packageCounts[name].count++;
    packageCounts[name].revenue += (b.totalAmount || 0);
  });
  const topPackages = Object.entries(packageCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8);

  // Monthly breakdown (from createdAt)
  const monthlyCounts = {};
  bookings.forEach(b => {
    const date = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : null);
    if (date) {
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyCounts[key]) monthlyCounts[key] = { bookings: 0, revenue: 0 };
      monthlyCounts[key].bookings++;
      monthlyCounts[key].revenue += (b.totalAmount || 0);
    }
  });
  const monthlyData = Object.entries(monthlyCounts).sort((a, b) => a[0].localeCompare(b[0])).slice(-6);
  const maxMonthlyBookings = Math.max(...monthlyData.map(([, d]) => d.bookings), 1);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-4xl font-heading text-charcoal mb-2">Financial Analytics</h2>
        <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest opacity-70">
          Revenue and conversion metrics — live from Firestore
        </p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Booked Value', value: `$${totalBookedValue.toLocaleString()}`, icon: <DollarSign size={18} /> },
          { label: 'Revenue Collected', value: `$${totalCollected.toLocaleString()}`, icon: <TrendingUp size={18} /> },
          { label: 'Outstanding Balance', value: `$${totalOutstanding.toLocaleString()}`, icon: <DollarSign size={18} /> },
          { label: 'Avg. Booking Value', value: `$${avgBookingValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: <Users size={18} /> },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-custom border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gold/10 rounded text-gold">{card.icon}</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{card.label}</span>
            </div>
            <p className="text-2xl font-heading text-charcoal font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Status Funnel */}
        <div className="bg-white rounded-custom border border-zinc-200 shadow-sm p-8">
          <h3 className="font-heading text-xl text-charcoal mb-6">Booking Funnel</h3>
          <div className="space-y-4">
            {Object.entries(statusCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([status, count]) => {
                const pct = bookings.length > 0 ? (count / bookings.length) * 100 : 0;
                return (
                  <div key={status}>
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span className="uppercase tracking-widest text-zinc-500">{STATUS_LABELS[status] || status}</span>
                      <span className="text-charcoal">{count} <span className="text-zinc-400 font-normal">({pct.toFixed(0)}%)</span></span>
                    </div>
                    <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-700", STATUS_COLORS[status] || 'bg-zinc-300')}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-custom border border-zinc-200 shadow-sm p-8">
          <h3 className="font-heading text-xl text-charcoal mb-6">Monthly Bookings</h3>
          {monthlyData.length === 0 ? (
            <p className="text-zinc-400 text-sm italic">No data yet.</p>
          ) : (
            <div className="flex items-end gap-3 h-48">
              {monthlyData.map(([month, data]) => {
                const height = (data.bookings / maxMonthlyBookings) * 100;
                return (
                  <div key={month} className="flex-1 flex flex-col items-center justify-end gap-2">
                    <span className="text-[10px] font-bold text-charcoal">{data.bookings}</span>
                    <div
                      className="w-full bg-gold/80 rounded-t transition-all duration-500 min-h-[4px]"
                      style={{ height: `${Math.max(height, 4)}%` }}
                    />
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                      {month.split('-')[1]}/{month.split('-')[0].slice(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Package Popularity */}
      <div className="bg-white rounded-custom border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-zinc-100">
          <h3 className="font-heading text-xl text-charcoal flex items-center gap-3">
            <Package size={18} className="text-gold" /> Package Performance
          </h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-50/50 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <th className="px-8 py-4">Package</th>
              <th className="px-8 py-4">Bookings</th>
              <th className="px-8 py-4">Total Value</th>
              <th className="px-8 py-4">Share</th>
            </tr>
          </thead>
          <tbody className="text-sm font-body">
            {topPackages.map(([name, data]) => (
              <tr key={name} className="border-t border-zinc-50 hover:bg-zinc-50/50">
                <td className="px-8 py-5 font-bold text-charcoal">{name}</td>
                <td className="px-8 py-5">{data.count}</td>
                <td className="px-8 py-5 font-bold text-gold">${data.revenue.toLocaleString()}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full"
                        style={{ width: `${bookings.length > 0 ? (data.count / bookings.length) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-400">
                      {bookings.length > 0 ? ((data.count / bookings.length) * 100).toFixed(0) : 0}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
