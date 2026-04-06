import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  Menu
} from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { cn } from '../../lib/utils';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Bookings', icon: <BookOpen size={20} />, path: '/admin/bookings' },
    { name: 'Calendar', icon: <Calendar size={20} />, path: '/admin/calendar' },
    { name: 'Analytics', icon: <BarChart3 size={20} />, path: '/admin/analytics' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-body">
      {/* Sidebar */}
      <aside className="w-72 bg-charcoal text-ivory flex flex-col fixed h-full z-50 shadow-2xl">
        <div className="p-10 mb-10">
          <h1 className="text-2xl font-heading tracking-tighter">
            Savanna<span className="text-gold">Admin</span>
          </h1>
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Expedition Management</span>
        </div>

        <nav className="flex-grow px-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-[4px] text-sm font-medium transition-all group",
                location.pathname === item.path 
                  ? "bg-gold text-charcoal shadow-lg" 
                  : "text-zinc-400 hover:text-ivory hover:bg-white/5"
              )}
            >
              <span className={cn(
                "transition-colors",
                location.pathname === item.path ? "text-charcoal" : "text-gold/60 group-hover:text-gold"
              )}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 w-full text-zinc-500 hover:text-red-400 transition-colors text-sm font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow ml-72 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-zinc-200 px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center bg-zinc-100 px-4 py-2 rounded-lg w-96">
            <Search size={18} className="text-zinc-400" />
            <input 
              placeholder="Search bookings, guests..." 
              className="bg-transparent border-none outline-none text-sm ml-3 w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-zinc-400 hover:text-charcoal transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-10 w-px bg-zinc-200 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-charcoal">Nairobi Team</p>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Expedition Lead</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                NT
              </div>
            </div>
          </div>
        </header>

        <main className="p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
