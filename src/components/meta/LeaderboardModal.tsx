import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useGameStore } from '../../store/useGameStore';
import { User, Send, CheckCircle2, Crown, Sparkles } from 'lucide-react';
import { playCoinClaimSound } from '../../utils/soundEngine';

export const LeaderboardModal: React.FC = () => {
  const {
    isLeaderboardModalOpen,
    setIsLeaderboardModalOpen,
    username,
    setUsername,
    leaderboardEntries,
    submitToLeaderboard,
    seasonState,
    lastSubmittedLeaderboardId,
  } = useGameStore();

  const [inputName, setInputName] = useState(username || 'CricketGod99');
  const [submitted, setSubmitted] = useState(false);

  if (!isLeaderboardModalOpen) return null;

  const canSubmit = seasonState.isCompleted;

  const handleSaveUsername = () => {
    if (inputName.trim()) {
      setUsername(inputName.trim());
    }
  };

  const handleSubmitScore = () => {
    if (!canSubmit) return;
    handleSaveUsername();
    submitToLeaderboard();
    playCoinClaimSound();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Modal
      isOpen={isLeaderboardModalOpen}
      onClose={() => setIsLeaderboardModalOpen(false)}
      title="Global XI Hall of Fame Leaderboard"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Username Selection Header */}
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <User className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-bold text-slate-300">Your Gamer Handle:</span>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onBlur={handleSaveUsername}
              placeholder="Enter username..."
              className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-emerald-500 max-w-[160px]"
            />
          </div>

          {canSubmit && (
            <button
              onClick={handleSubmitScore}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 transition"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submitted to Board!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 fill-current" />
                  <span>Submit XI ({seasonState.wins}W - {seasonState.losses}L)</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-slate-400">
            <span>RANKING ALGORITHM SCORE</span>
            <span className="text-emerald-400 text-[10px]">Score = Wins×100 + OVR×10 + Chem×5 + Trophy×500</span>
          </div>

          <div className="max-h-[55vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-extrabold border-b border-slate-800">
                <tr>
                  <th className="p-3 text-center">RANK</th>
                  <th className="p-3">USER & SQUAD XI</th>
                  <th className="p-3 text-center">LEAGUE</th>
                  <th className="p-3 text-center">RECORD</th>
                  <th className="p-3 text-center">OVR</th>
                  <th className="p-3 text-center">SCORE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-200">
                {leaderboardEntries.map((entry, idx) => {
                  const rank = idx + 1;
                  const isUserSubmitted = entry.id === lastSubmittedLeaderboardId;

                  return (
                    <tr
                      key={entry.id}
                      className={
                        isUserSubmitted
                          ? 'bg-gradient-to-r from-emerald-950 to-slate-900 text-emerald-300 font-black border-2 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)] animate-pulse'
                          : rank === 1
                          ? 'bg-amber-950/60 text-amber-300 border-l-4 border-l-amber-400 font-extrabold'
                          : rank === 2
                          ? 'bg-slate-900/90 text-cyan-300 border-l-4 border-l-cyan-400'
                          : rank === 3
                          ? 'bg-slate-900/60 text-emerald-300 border-l-4 border-l-emerald-400'
                          : 'hover:bg-slate-900/40'
                      }
                    >
                      <td className="p-3 text-center font-black">
                        {rank === 1 ? '🥇 #1' : rank === 2 ? '🥈 #2' : rank === 3 ? '🥉 #3' : `#${rank}`}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-white">{entry.username}</span>
                          {entry.isChampion && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                          {isUserSubmitted && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 text-[9px] font-black uppercase flex items-center gap-0.5">
                              <Sparkles className="w-2.5 h-2.5 fill-current" />
                              YOU (Rank #{rank})
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 truncate max-w-[180px]">
                          {entry.draftedPlayers.slice(0, 3).join(', ')}...
                        </p>
                      </td>
                      <td className="p-3 text-center text-[10px] font-bold uppercase text-slate-400">
                        {entry.leagueMode}
                      </td>
                      <td className="p-3 text-center text-emerald-400 font-extrabold">
                        {entry.wins}W - {entry.losses}L
                      </td>
                      <td className="p-3 text-center font-black">{entry.squadOvr}</td>
                      <td className="p-3 text-center font-black text-amber-400">{entry.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};
