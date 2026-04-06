import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Mail, Lock, LogIn, ShieldAlert } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials. Access restricted to authorized team members.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white p-12 rounded-custom shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-heading tracking-tighter text-charcoal mb-4">
              Savanna<span className="text-gold">Admin</span>
            </h1>
            <p className="text-zinc-500 text-sm font-body">Expedition Management Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded text-xs flex items-center gap-3 border border-red-100 italic">
                <ShieldAlert size={16} />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-gold transition-colors" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 p-5 pl-12 rounded-custom font-body text-sm outline-none focus:border-gold transition-all"
                  placeholder="name@savannabeyond.co.ke"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Security Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-gold transition-colors" />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 p-5 pl-12 rounded-custom font-body text-sm outline-none focus:border-gold transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-charcoal text-ivory py-5 rounded-custom font-bold uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 shadow-2xl active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Access Portal'} <LogIn size={18} />
            </button>
          </form>

          <p className="text-center mt-12 text-[10px] text-zinc-400 italic">
            This portal is for authorized Savanna & Beyond staff only. <br/>All access is logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
};
