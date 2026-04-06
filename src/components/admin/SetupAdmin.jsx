import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Mail, Lock, UserPlus, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const SetupAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSetup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to initialize administrative account.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 text-center">
        <div className="w-full max-w-md bg-white p-12 rounded-custom shadow-2xl animate-in zoom-in fade-in duration-500">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-heading text-charcoal mb-4">Portal Initialized</h2>
          <p className="text-zinc-500 mb-10 text-sm leading-relaxed">
            Your administrative account has been established. You may now access the expedition management ecosystem.
          </p>
          <button 
            onClick={() => navigate('/admin/login')}
            className="w-full bg-charcoal text-ivory py-5 rounded-custom font-bold uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            Go to Login <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white p-12 rounded-custom shadow-2xl border-t-8 border-gold">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-4 block">Security Initialization</span>
            <h1 className="text-4xl font-heading tracking-tighter text-charcoal mb-4">
              Create Admin
            </h1>
            <p className="text-zinc-500 text-sm font-body italic">Establish your first expedition command account.</p>
          </div>

          <form onSubmit={handleSetup} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded text-[11px] border border-red-100 flex items-start gap-3 italic leading-relaxed">
                <span className="font-bold">Error:</span> {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Expedition Email</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-gold transition-colors" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 p-5 pl-12 rounded-custom font-body text-sm outline-none focus:border-gold transition-all"
                  placeholder="admin@savannabeyond.co.ke"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Portal Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-gold transition-colors" />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 p-5 pl-12 rounded-custom font-body text-sm outline-none focus:border-gold transition-all"
                  placeholder="Minimum 6 characters"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-charcoal py-5 rounded-custom font-bold uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 shadow-2xl active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Establishing...' : 'Create Admin Account'} <UserPlus size={18} />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-zinc-100 text-center">
             <p className="text-[10px] text-zinc-400 italic mb-4">
              Secure authentication layer active.
            </p>
             <button onClick={() => navigate('/admin/login')} className="text-[10px] font-bold uppercase tracking-widest text-charcoal hover:text-gold transition-colors">
               Back to Login
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
