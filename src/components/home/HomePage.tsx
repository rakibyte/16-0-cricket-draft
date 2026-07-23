import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Play, Shield, Flame, Globe, User, Award, BarChart2, Sparkles, Users } from 'lucide-react';
import type { LeagueMode } from '../../types/game';

export const HomePage: React.FC = () => {
  const {
    setCurrentView,
    setLeagueMode,
    leagueMode,
    userStats,
    username,
    setIsProfileModalOpen,
    setIsTrophyModalOpen,
    setIsLeaderboardModalOpen,
    setIsMultiplayerModalOpen,
    resetDraft,
  } = useGameStore();

  const handleStartDraft = (mode?: LeagueMode) => {
    if (mode) {
      setLeagueMode(mode);
    }
    resetDraft();
    setCurrentView('DRAFT');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      {/* 38-0 Style Hero Header Banner */}
      <div className="text-center space-y-4 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-black tracking-widest uppercase shadow-[0_0_20px_rgba(52,211,153,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 fill-current" />
          The Ultimate Cricket Draft Challenge
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          16-0 <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">CRICKET DRAFT</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-medium">
          Spin historic rosters, pick 1 star per team to construct a rigid 11-player squad, and simulate a 16-match campaign to win the League!
        </p>

        {/* Primary CTA Buttons: Solo Draft & Multiplayer Room */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => handleStartDraft()}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:brightness-110 text-slate-950 font-black text-xl shadow-[0_0_35px_rgba(52,211,153,0.5)] transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <Play className="w-6 h-6 fill-current" />
            <span>SOLO DRAFT CHALLENGE</span>
          </button>

          <button
            onClick={() => setIsMultiplayerModalOpen(true)}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:brightness-110 text-white font-black text-xl shadow-[0_0_35px_rgba(168,85,247,0.5)] transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <Users className="w-6 h-6" />
            <span>MULTIPLAYER ROOM</span>
          </button>
        </div>
      </div>

      {/* Account Profile Quick Stats Bar */}
      <div className="glass-card rounded-3xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
              <User className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">{username}</h3>
            <p className="text-xs text-slate-400">
              Best Streak: <span className="text-emerald-400 font-black">{userStats.bestStreak} Wins</span> &bull; {userStats.leagueTitlesWon} League Titles
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition"
          >
            <User className="w-4 h-4 text-emerald-400" />
            <span>Account & History</span>
          </button>
          <button
            onClick={() => setIsLeaderboardModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 font-extrabold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-800 transition"
            title="Global Hall of Fame"
          >
            <BarChart2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsTrophyModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 font-extrabold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-800 transition"
            title="Trophy Cabinet"
          >
            <Award className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Select Tournament League Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest text-center sm:text-left">
          CHOOSE LEAGUE MODE TO START DRAFT
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* IPL */}
          <div
            onClick={() => handleStartDraft('IPL')}
            className={`p-5 rounded-3xl border-2 transition cursor-pointer flex flex-col justify-between space-y-4 hover:scale-[1.02] ${
              leagueMode === 'IPL'
                ? 'bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-950 border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 uppercase">
                IPL
              </span>
            </div>
            <div>
              <h4 className="text-base font-black text-white">IPL (2008–2025)</h4>
              <p className="text-xs text-slate-400 mt-1">
                Draft from 17 IPL seasons: RR 2008, Deccan 2009, CSK, MI, KKR, SRH & GT.
              </p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition flex items-center justify-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-current" />
              IPL Draft
            </button>
          </div>

          {/* Big Bash */}
          <div
            onClick={() => handleStartDraft('BBL')}
            className={`p-5 rounded-3xl border-2 transition cursor-pointer flex flex-col justify-between space-y-4 hover:scale-[1.02] ${
              leagueMode === 'BBL'
                ? 'bg-gradient-to-br from-cyan-950/80 via-slate-900 to-slate-950 border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30 uppercase">
                BBL
              </span>
            </div>
            <div>
              <h4 className="text-base font-black text-white">Big Bash League</h4>
              <p className="text-xs text-slate-400 mt-1">
                Draft from BBL champions: Sydney Sixers, Scorchers, Strikers & Brisbane Heat.
              </p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition flex items-center justify-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-current" />
              BBL Draft
            </button>
          </div>

          {/* World Cricket */}
          <div
            onClick={() => handleStartDraft('WORLD_CRICKET')}
            className={`p-5 rounded-3xl border-2 transition cursor-pointer flex flex-col justify-between space-y-4 hover:scale-[1.02] ${
              leagueMode === 'WORLD_CRICKET'
                ? 'bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border-emerald-500 shadow-[0_0_25px_rgba(52,211,153,0.3)]'
                : 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 uppercase">
                WORLD
              </span>
            </div>
            <div>
              <h4 className="text-base font-black text-white">World Legends</h4>
              <p className="text-xs text-slate-400 mt-1">
                Draft from World Cup champions: West Indies 79, India 83, Aus 99, India 2011/24.
              </p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 transition flex items-center justify-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-current" />
              World Draft
            </button>
          </div>

          {/* All-Time XI */}
          <div
            onClick={() => handleStartDraft('ALL_TIME_XI')}
            className={`p-5 rounded-3xl border-2 transition cursor-pointer flex flex-col justify-between space-y-4 hover:scale-[1.02] ${
              leagueMode === 'ALL_TIME_XI'
                ? 'bg-gradient-to-br from-purple-950/80 via-slate-900 to-slate-950 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.3)]'
                : 'bg-slate-900/90 border-slate-800 hover:border-purple-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <span className="text-[10px] font-black text-purple-300 px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 uppercase">
                ALL-TIME XI
              </span>
            </div>
            <div>
              <h4 className="text-base font-black text-white">All-Time Franchise XI</h4>
              <p className="text-xs text-slate-400 mt-1">
                Draft from All-Time rosters: CSK, MI, Team India, Australia, West Indies & RCB legends!
              </p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-purple-500 text-white font-black text-xs hover:bg-purple-400 transition flex items-center justify-center gap-1.5 shadow-lg">
              <Play className="w-3.5 h-3.5 fill-current" />
              All-Time Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
