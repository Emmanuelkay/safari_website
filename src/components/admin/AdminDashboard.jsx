import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, limit, onSnapshot, orderBy } from 'firebase/firestore';
import { cn } from '../../lib/utils';

const StatCard = ({ title, value, icon, trend, trendValue }) => (
  <div className="bg-white p-8 rounded-custom shadow-sm border border-zinc-200">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-gold/10 rounded-lg text-gold font-bold">
        {icon}
      </div>
      <div className={cn(
        "flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest",
        trend === 'up' ? "text-green-600" : "text-red-500"
      )}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trendValue}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">{title}</p>
      <h3 className="text-3xl font-heading text-charcoal font-semibold">{value}</h3>
    </div>
  </div>
);

export const AdminDashboard = () => {
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecentBookings(bookings);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const stats = [
    { title: "Total Bookings", value: "148", icon: <Users size={20} />, trend: "up", trendValue: "+12%" },
    { title: "Projected Revenue", value: "$42,850", icon: <TrendingUp size={20} />, trend: "up", trendValue: "+8.4%" },
    { title: "Conversion Rate", value: "3.2%", icon: <ArrowUpRight size={20} />, trend: "down", trendValue: "-1.5%" },
    { title: "Active Expeditions", value: "12", icon: <Calendar size={20} />, trend: "up", trendValue: "+26%" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-heading text-charcoal mb-2">Expedition Summary</h2>
          <p className="text-zinc-500 text-sm font-body tracking-tight font-medium uppercase text-[11px] opacity-70">
            Real-time insights from the Nairobi HQ
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border border-zinc-200 text-charcoal px-6 py-3 rounded-custom text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors">
            Generate Report
          </button>
          <button className="bg-gold text-charcoal px-6 py-3 rounded-custom text-[11px] font-bold uppercase tracking-widest hover:bg-charcoal hover:text-ivory transition-all shadow-xl">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
        {/* Recent Pipeline */}
        <div className="bg-white rounded-custom shadow-sm border border-zinc-200 overflow-hidden">
          <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
            <h3 className="font-heading text-2xl text-charcoal tracking-tight">Recent Pipeline</h3>
            <Link to="/admin/bookings" className="text-[11px] font-bold uppercase text-gold hover:underline tracking-widest">View All Bookings</Link>
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
                  <tr><td colSpan="5" className="p-20 text-center animate-pulse italic text-zinc-400">Syncing with Cloud Firestore Library...</td></tr>
                ) : recentBookings.length === 0 ? (
                  <tr><td colSpan="5" className="p-20 text-center italic text-zinc-400">No recent entries found.</td></tr>
                ) : (
                  recentBookings.map((b) => (
                    <tr key={b.id} className="border-t border-zinc-50 hover:bg-zinc-50/50 transition-all">
                      <td className="px-8 py-6 font-bold text-earth text-[11px] tracking-widest">{b.bookingRef || 'SNB-GEN-001'}</td>
                      <td className="px-8 py-6">
                        <div>
                          <p className="font-bold text-charcoal">{b.fullName}</p>
                          <p className="text-[10px] text-zinc-400">{b.email}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-[13px] font-medium text-charcoal">{b.packageName}</td>
                      <td className="px-8 py-6">
                        <p className="font-bold text-charcoal">${(b.totalAmount || 0).toLocaleString()}</p>
                        <p className="text-[10px] text-zinc-400 uppercase font-medium">{b.guests} Guests</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest",
                          b.status === 'ENQUIRY' ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700 shadow-sm"
                        )}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Departure Map Placeholder */}
        <div className="bg-charcoal rounded-custom p-8 text-ivory flex flex-col justify-between">
           <div>
              <div className="flex justify-between items-center mb-8">
                 <h3 className="font-heading text-2xl tracking-tight">Field Map</h3>
                 <span className="p-3 bg-white/5 rounded-lg text-gold border border-white/10"><MapPin size={20} /></span>
              </div>
              <p className="text-sm font-body text-ivory/50 leading-relaxed mb-10 italic">
                 Active expeditions currently in the field. Interactive tracking and location telemetry dashboard integrated in Phase 5.
              </p>
           </div>
           
           <div className="space-y-6">
              {[
                { name: "Mara Expedition #41", status: "In Transit", camp: "Sarova Mara Game Camp", icon: <Clock /> },
                { name: "Amboseli Sunset #12", status: "Arrived", camp: "Amboseli Serena Lodge", icon: <CheckCircle2 /> }
              ].map((loc, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="text-gold group-hover:scale-110 transition-transform">{loc.icon}</div>
                  <div>
                    <h4 className="text-[12px] font-bold tracking-widest uppercase">{loc.name}</h4>
                    <p className="text-[10px] text-ivory/40 uppercase font-black">{loc.status} · {loc.camp}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
