import React from 'react';
import { Modal } from '../common/Modal';
import { useGameStore } from '../../store/useGameStore';
import { User, Trophy, Flame, Calendar, Crown, Activity, Target } from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const {
    isProfileModalOpen,
    setIsProfileModalOpen,
    username,
    userStats,
    runHistory,
  } = useGameStore();

  if (!isProfileModalOpen) return null;

  const totalMatches = userStats.totalWins + userStats.totalLosses;
  const winRate = totalMatches > 0 ? Math.round((userStats.totalWins / totalMatches) * 100) : 0;

  return (
    <Modal
      isOpen={isProfileModalOpen}
      onClose={() => setIsProfileModalOpen(false)}
      title="Personal Account & Draft History"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* User Account Profile Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/40 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-[0_0_15px_rgba(52,211,153,0.5)]">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
                <User className="w-7 h-7" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">{username}</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase">
                  Level {Math.max(1, Math.floor(userStats.totalSeasonsPlayed / 2) + 1)} Manager
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Pro Draft Architect &bull; Joined 16-0 League
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-amber-400 drop-shadow">
              {userStats.leagueTitlesWon} 🏆
            </span>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Titles Won</span>
          </div>
        </div>

        {/* Lifetime Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-bold uppercase mb-1">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              Best Streak
            </div>
            <span className="text-lg font-black text-emerald-400">{userStats.bestStreak} Wins</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-bold uppercase mb-1">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Win Rate
            </div>
            <span className="text-lg font-black text-cyan-300">{winRate}%</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-bold uppercase mb-1">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              Highest OVR
            </div>
            <span className="text-lg font-black text-amber-400">{userStats.highestTeamOvr} OVR</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-bold uppercase mb-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              Total Runs
            </div>
            <span className="text-lg font-black text-white">{userStats.totalSeasonsPlayed} Played</span>
          </div>
        </div>

        {/* Detailed Run History Logs */}
        <div className="space-y-2">
          <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-400" />
            Complete Draft Run History
          </h4>

          {runHistory.length > 0 ? (
            <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-1">
              {runHistory.map((run) => (
                <div
                  key={run.id}
                  className={`p-3.5 rounded-xl border space-y-2 transition ${
                    run.isFlawless
                      ? 'bg-emerald-950/70 border-emerald-500/60 shadow-[0_0_12px_rgba(52,211,153,0.2)]'
                      : run.isChampion
                      ? 'bg-amber-950/60 border-amber-500/50'
                      : 'bg-slate-900/90 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white">{run.date}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold uppercase">
                        {run.leagueMode}
                      </span>
                      {run.isChampion && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black flex items-center gap-1">
                          <Crown className="w-3 h-3 text-amber-400" />
                          Champions
                        </span>
                      )}
                    </div>
                    <div className="text-right font-black">
                      <span className="text-emerald-400">{run.wins}W</span> - <span className="text-red-400">{run.losses}L</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                    <span>Squad OVR: {run.squadOvr}</span>
                    <span>Chemistry: {run.chemistry}%</span>
                  </div>

                  {/* Drafted XI Squad List */}
                  <p className="text-[10px] text-slate-400 truncate font-mono">
                    <span className="text-slate-500 font-bold">XI: </span>
                    {run.squadNames.slice(0, 5).join(', ')}...
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-500 text-xs font-medium">
              No draft runs recorded yet. Start your first 16-0 campaign to log career statistics!
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
