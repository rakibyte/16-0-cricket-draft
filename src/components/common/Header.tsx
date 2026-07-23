import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { RefreshCw, Video, Globe, Shield, Flame, Award, Eye, EyeOff, BarChart2, User, Home, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentView,
    setCurrentView,
    leagueMode, 
    setLeagueMode, 
    difficultyMode,
    setDifficultyMode,
    username,
    respinTokens, 
    setIsAdModalOpen, 
    setIsTrophyModalOpen,
    setIsLeaderboardModalOpen,
    setIsProfileModalOpen,
    resetDraft,
    userStats 
  } = useGameStore();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-emerald-500/20 px-4 py-3 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Title Brand Logo (Clickable -> Navigates to HOME) */}
        <div 
          onClick={() => setCurrentView('HOME')}
          className="flex items-center gap-3 cursor-pointer group"
          title="Click to return to 16-0 Home Page"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-[0_0_15px_rgba(52,211,153,0.5)] group-hover:scale-105 transition">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-emerald-400 text-xl tracking-tighter">
              16
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-300 to-white bg-clip-text text-transparent group-hover:brightness-125 transition">
                16-0
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-widest">
                CRICKET DRAFT
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Best Streak: <span className="text-emerald-400 font-bold">{userStats.bestStreak} Wins</span> &bull; {userStats.leagueTitlesWon} Titles Won
            </p>
          </div>
        </div>

        {/* League Selector (IPL, BBL, World Cricket, All-Time XI) */}
        {currentView === 'DRAFT' && (
          <div className="flex flex-wrap items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setLeagueMode('IPL')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                leagueMode === 'IPL'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              IPL
            </button>

            <button
              onClick={() => setLeagueMode('BBL')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                leagueMode === 'BBL'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              BBL
            </button>

            <button
              onClick={() => setLeagueMode('WORLD_CRICKET')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                leagueMode === 'WORLD_CRICKET'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              World
            </button>

            <button
              onClick={() => setLeagueMode('ALL_TIME_XI')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                leagueMode === 'ALL_TIME_XI'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300 fill-current" />
              All-Time XI
            </button>
          </div>
        )}

        {/* Right Actions: Account Profile, Home, Difficulty Toggle, Leaderboard, Trophy Cabinet, Respins */}
        <div className="flex items-center gap-2">
          {/* Home View Button */}
          {currentView === 'DRAFT' && (
            <button
              onClick={() => setCurrentView('HOME')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-extrabold hover:bg-slate-700 transition"
              title="Return to Home Page"
            >
              <Home className="w-3.5 h-3.5 text-emerald-400" />
              <span>Home</span>
            </button>
          )}

          {/* Personal Account Profile Button */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold hover:border-emerald-400 transition shadow-md"
            title="Personal Account Profile & Run History"
          >
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span className="max-w-[90px] truncate">{username}</span>
          </button>

          {/* Easy vs Hard Difficulty Mode Toggle */}
          {currentView === 'DRAFT' && (
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setDifficultyMode('EASY')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition ${
                  difficultyMode === 'EASY'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Easy Mode: All OVR ratings & fit percentages visible"
              >
                <Eye className="w-3 h-3" />
                Easy
              </button>
              <button
                onClick={() => setDifficultyMode('HARD')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition ${
                  difficultyMode === 'HARD'
                    ? 'bg-rose-500 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Hard Mode: Ratings & probabilities hidden! Test real cricket IQ"
              >
                <EyeOff className="w-3 h-3" />
                Hard
              </button>
            </div>
          )}

          {/* Global Leaderboard Button */}
          <button
            onClick={() => setIsLeaderboardModalOpen(true)}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-cyan-400 hover:bg-slate-700 transition"
            title="Global XI Hall of Fame Leaderboard"
          >
            <BarChart2 className="w-4 h-4" />
          </button>

          {/* Trophy Cabinet Icon */}
          <button
            onClick={() => setIsTrophyModalOpen(true)}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-amber-400 hover:bg-slate-700 transition"
            title="Trophy Cabinet & Achievements"
          >
            <Award className="w-4 h-4" />
          </button>

          {/* Ad Re-spin Button */}
          {currentView === 'DRAFT' && (
            <button
              onClick={() => setIsAdModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-700 transition"
            >
              <Video className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Re-spins ({respinTokens})</span>
            </button>
          )}

          {/* Reset Button */}
          {currentView === 'DRAFT' && (
            <button
              onClick={resetDraft}
              title="Reset Squad & Season"
              className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
