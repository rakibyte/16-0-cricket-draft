import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useGameStore } from '../../store/useGameStore';
import { Mail, Lock, User, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { playCoinClaimSound } from '../../utils/soundEngine';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, userAccount, registerAccount, loginAccount } = useGameStore();

  const [mode, setMode] = useState<'REGISTER' | 'LOGIN'>('REGISTER');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'REGISTER') {
      if (!username) {
        setError('Please enter a username handle.');
        return;
      }
      registerAccount(email, username, password);
      playCoinClaimSound();
      setSuccess('Account created successfully! Welcome to 16-0 League.');
      setTimeout(() => setIsAuthModalOpen(false), 1500);
    } else {
      const ok = loginAccount(email, password);
      if (ok) {
        playCoinClaimSound();
        setSuccess('Signed in successfully!');
        setTimeout(() => setIsAuthModalOpen(false), 1500);
      } else {
        setError('Invalid email or password.');
      }
    }
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
      title="Personal Account Registration"
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        {/* Guest Limit Alert Banner */}
        {!userAccount.isRegistered && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold space-y-1">
            <div className="flex items-center gap-1.5 font-black text-amber-400">
              <Sparkles className="w-4 h-4" />
              Guest Seasons Limit ({userAccount.guestSeasonsPlayed}/2 Played)
            </div>
            <p className="text-[11px] text-slate-300 font-medium">
              Create a free email account to unlock unlimited 16-0 draft runs, multiplayer rooms, and save your career stats across devices!
            </p>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-black">
          <button
            onClick={() => setMode('REGISTER')}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === 'REGISTER' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => setMode('LOGIN')}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === 'LOGIN' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
              {error}
            </div>
          )}

          {success && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {success}
            </div>
          )}

          {mode === 'REGISTER' && (
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                Gamer Handle / Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. CricketKing99"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-xs shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2 mt-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{mode === 'REGISTER' ? 'Register Account' : 'Sign In Now'}</span>
          </button>
        </form>
      </div>
    </Modal>
  );
};
