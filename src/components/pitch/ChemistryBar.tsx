import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { calculateSquadChemistry } from '../../utils/chemistry';
import { ShieldAlert, Zap, EyeOff } from 'lucide-react';

export const ChemistryBar: React.FC = () => {
  const { slots, difficultyMode } = useGameStore();
  const { chemistryScore, effectiveSquadRating, outOfPositionCount } = calculateSquadChemistry(slots);

  const filledCount = slots.filter((s) => s.assignedPlayer !== null).length;
  const isHardMode = difficultyMode === 'HARD';

  return (
    <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">
              Squad Chemistry & Synergy
            </h4>
            <p className="text-[11px] text-slate-400">
              {filledCount}/11 Slots Filled {!isHardMode && outOfPositionCount > 0 && `(${outOfPositionCount} Out of Position!)`}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-black bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
            {isHardMode ? '???' : `${chemistryScore}%`}
          </div>
          <span className="text-[10px] text-slate-400 font-bold block">
            Squad OVR: {isHardMode ? '???' : effectiveSquadRating}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isHardMode
              ? 'bg-slate-700'
              : chemistryScore >= 85
              ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]'
              : chemistryScore >= 60
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
              : 'bg-gradient-to-r from-red-500 to-rose-600'
          }`}
          style={{ width: isHardMode ? '100%' : `${chemistryScore}%` }}
        />
      </div>

      {/* Hard Mode / Out of Position Warnings */}
      {isHardMode ? (
        <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
          <EyeOff className="w-4 h-4 shrink-0" />
          <span>HARD MODE: All OVR ratings & fit percentages are hidden! Test your real cricket IQ.</span>
        </div>
      ) : (
        outOfPositionCount > 0 && (
          <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold bg-red-500/10 p-2 rounded-lg border border-red-500/20">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>
              Warning: {outOfPositionCount} player(s) out of position! Severe win probability penalty applied.
            </span>
          </div>
        )
      )}
    </div>
  );
};
