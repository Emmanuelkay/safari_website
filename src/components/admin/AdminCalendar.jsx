import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight, Users, MapPin } from 'lucide-react';

const STATUS_COLORS = {
  ENQUIRY: 'bg-amber-400',
  CONFIRMED_DEPOSIT: 'bg-gold',
  CONFIRMED_FULL: 'bg-green-500',
  COMPLETED: 'bg-zinc-400',
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const AdminCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bookings"), (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date().toISOString().split('T')[0];

  // Parse booking dates into a lookup map
  const dateBookings = {};
  bookings.forEach(b => {
    const date = b.dates || (b.trip?.dates);
    if (date) {
      if (!dateBookings[date]) dateBookings[date] = [];
      dateBookings[date].push(b);
    }
  });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const selectedDateBookings = selectedDate ? (dateBookings[selectedDate] || []) : [];

  // Build calendar grid
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  if (loading) {
    return <div className="p-20 text-center animate-pulse italic text-zinc-400">Loading calendar...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-heading text-charcoal mb-2">Expedition Calendar</h2>
        <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest opacity-70">
          Upcoming safari departures
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Calendar Grid */}
        <div className="bg-white rounded-custom border border-zinc-200 shadow-sm p-8">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-8">
            <button onClick={prevMonth} className="p-2 hover:bg-zinc-100 rounded transition-colors" aria-label="Previous month">
              <ChevronLeft size={20} className="text-zinc-400" />
            </button>
            <h3 className="text-2xl font-heading text-charcoal">
              {MONTH_NAMES[month]} {year}
            </h3>
            <button onClick={nextMonth} className="p-2 hover:bg-zinc-100 rounded transition-colors" aria-label="Next month">
              <ChevronRight size={20} className="text-zinc-400" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_NAMES.map(d => (
              <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest text-zinc-400 py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Date Cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;

              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayBookings = dateBookings[dateStr] || [];
              const isToday = dateStr === today;
              const isSelected = dateStr === selectedDate;

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr === selectedDate ? null : dateStr)}
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all relative",
                    isToday && "ring-2 ring-gold",
                    isSelected ? "bg-charcoal text-ivory" : "hover:bg-zinc-50",
                    dayBookings.length > 0 && !isSelected && "bg-gold/5"
                  )}
                >
                  <span className={cn(isSelected ? "text-ivory" : isToday ? "text-gold font-bold" : "text-charcoal")}>
                    {day}
                  </span>
                  {dayBookings.length > 0 && (
                    <div className="flex gap-0.5 mt-1">
                      {dayBookings.slice(0, 3).map((b, j) => (
                        <div key={j} className={cn("w-1.5 h-1.5 rounded-full", STATUS_COLORS[b.status] || 'bg-zinc-300')} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-6 mt-8 pt-6 border-t border-zinc-100">
            {[
              { label: 'Enquiry', color: 'bg-amber-400' },
              { label: 'Deposit', color: 'bg-gold' },
              { label: 'Confirmed', color: 'bg-green-500' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                <div className={cn("w-2.5 h-2.5 rounded-full", item.color)} />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Selected Day Details */}
        <div className="bg-white rounded-custom border border-zinc-200 shadow-sm p-8">
          <h3 className="font-heading text-xl text-charcoal mb-6">
            {selectedDate
              ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
              : 'Select a date'
            }
          </h3>

          {!selectedDate ? (
            <p className="text-zinc-400 text-sm italic">Click a date to see departures.</p>
          ) : selectedDateBookings.length === 0 ? (
            <p className="text-zinc-400 text-sm italic">No departures on this date.</p>
          ) : (
            <div className="space-y-4">
              {selectedDateBookings.map((b) => (
                <div key={b.id} className="p-5 bg-zinc-50 rounded-lg border border-zinc-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-bold text-gold uppercase tracking-widest">{b.ref || b.bookingRef}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[9px] font-bold uppercase text-white",
                      STATUS_COLORS[b.status] || 'bg-zinc-400'
                    )}>
                      {(b.status || '').replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h4 className="font-bold text-charcoal mb-2">{b.fullName}</h4>
                  <div className="space-y-1 text-[11px] text-zinc-500">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-gold" />
                      {b.packageName || 'Safari'}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={12} className="text-gold" />
                      {b.guests || b.trip?.guests || '—'} travelers
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-zinc-100 text-[11px] font-bold text-charcoal">
                    ${(b.totalAmount || 0).toLocaleString()} USD
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
