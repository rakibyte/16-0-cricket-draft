import React from 'react';
import { Modal } from '../common/Modal';
import { useGameStore } from '../../store/useGameStore';
import { Trophy, Award, ShieldAlert } from 'lucide-react';

export const MatchScorecardModal: React.FC = () => {
  const { activeMatchSummary, setActiveMatchSummary } = useGameStore();

  if (!activeMatchSummary) return null;

  const isWin = activeMatchSummary.result === 'WIN';
  const isTie = activeMatchSummary.result === 'TIE';

  return (
    <Modal
      isOpen={activeMatchSummary !== null}
      onClose={() => setActiveMatchSummary(null)}
      title={`Match #${activeMatchSummary.matchIndex} Scorecard ${
        activeMatchSummary.isPlayoff ? '(PLAYOFF)' : '(LEAGUE)'
      }`}
    >
      <div className="space-y-4 text-center">
        {/* Outcome Banner */}
        <div
          className={`p-4 rounded-2xl border ${
            isWin
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
              : isTie
              ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
              : 'bg-red-950/80 border-red-500/50 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            {isWin && <Trophy className="w-6 h-6 text-emerald-400 animate-bounce" />}
            {isTie && <Award className="w-6 h-6 text-amber-400" />}
            {!isWin && !isTie && <ShieldAlert className="w-6 h-6 text-red-400" />}
            <h3 className="text-2xl font-black uppercase tracking-tight">
              {isWin ? 'MATCH VICTORY!' : isTie ? 'MATCH TIED' : 'MATCH DEFEAT'}
            </h3>
          </div>
          <p className="text-sm font-bold">{activeMatchSummary.margin}</p>
        </div>

        {/* Teams & Scores Comparison */}
        <div className="grid grid-cols-2 gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
          {/* User Team */}
          <div className="border-r border-slate-800 pr-2">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">
              YOUR XI SQUAD
            </span>
            <div className="text-xl font-black text-white mt-1">
              {activeMatchSummary.userScore}
            </div>
          </div>

          {/* Opponent Team */}
          <div className="pl-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
              {activeMatchSummary.opponentName}
            </span>
            <div className="text-xl font-black text-slate-200 mt-1">
              {activeMatchSummary.opponentScore}
            </div>
          </div>
        </div>

        {/* Man of the Match */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Award className="w-4 h-4" />
            <span>Player of the Match:</span>
          </div>
          <span className="font-black text-white">{activeMatchSummary.mom}</span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setActiveMatchSummary(null)}
          className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-sm hover:bg-emerald-400 transition"
        >
          Continue Campaign
        </button>
      </div>
    </Modal>
  );
};
