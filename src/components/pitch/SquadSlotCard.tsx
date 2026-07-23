import React from 'react';
import type { SquadSlot } from '../../types/game';
import { calculateSlotEfficiency } from '../../utils/chemistry';
import { ROLE_ICONS } from '../../data/slotsConfig';
import { X, Plus, ShieldAlert, EyeOff } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

interface SquadSlotCardProps {
  slot: SquadSlot;
}

export const SquadSlotCard: React.FC<SquadSlotCardProps> = ({ slot }) => {
  const { openPlayerPicker, removePlayerFromSlot, spunTeam, difficultyMode } = useGameStore();

  const isAssigned = slot.assignedPlayer !== null;
  const player = slot.assignedPlayer;
  const isHardMode = difficultyMode === 'HARD';

  const eff = player ? calculateSlotEfficiency(player, slot.requiredRole) : null;

  return (
    <div
      className={`relative rounded-xl p-2.5 transition-all flex flex-col justify-between h-28 border ${
        isAssigned
          ? isHardMode
            ? 'bg-slate-900/90 border-slate-700'
            : eff?.isExactRole
            ? 'bg-slate-900/90 border-emerald-500/60 shadow-[0_0_12px_rgba(52,211,153,0.25)]'
            : eff?.isSecondaryRole
            ? 'bg-slate-900/90 border-cyan-500/50'
            : 'bg-slate-900/90 border-red-500/60 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
          : spunTeam
          ? 'bg-slate-950/80 border-dashed border-emerald-400/80 hover:bg-slate-900 cursor-pointer animate-pulse-glow'
          : 'bg-slate-950/60 border-dashed border-slate-700 hover:border-slate-500 cursor-pointer'
      }`}
      onClick={() => {
        if (!isAssigned && spunTeam) {
          openPlayerPicker(slot.id);
        }
      }}
    >
      {/* Slot Header */}
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-extrabold text-slate-300 flex items-center gap-1">
          <span>{ROLE_ICONS[slot.requiredRole]}</span>
          <span className="truncate max-w-[100px]">{slot.slotName}</span>
        </span>

        {isAssigned && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              removePlayerFromSlot(slot.id);
            }}
            className="p-0.5 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
            title="Remove Player"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Body: Assigned Player or Empty Trigger */}
      {isAssigned && player ? (
        <div className="my-auto space-y-1">
          <div className="flex items-center justify-between">
            <h5 className="font-extrabold text-xs text-white truncate max-w-[110px]">
              {player.name}
            </h5>
            <span className="font-black text-xs text-emerald-400">
              {isHardMode ? '???' : player.overallRating}
            </span>
          </div>

          <p className="text-[9px] text-slate-400 truncate">
            {slot.assignedFromTeam || player.countryOrFranchise}
          </p>

          {/* Fit indicator */}
          <div className="flex items-center justify-between text-[9px] font-bold pt-1 border-t border-slate-800">
            {isHardMode ? (
              <span className="text-slate-400 flex items-center gap-1">
                <EyeOff className="w-3 h-3 text-rose-400" /> Hidden (Hard Mode)
              </span>
            ) : (
              <>
                <span className={eff?.isExactRole ? 'text-emerald-400' : eff?.isSecondaryRole ? 'text-cyan-300' : 'text-red-400'}>
                  {eff?.isExactRole ? '100% Fit' : eff?.isSecondaryRole ? '85% Fit' : '35% Fit Penalty!'}
                </span>
                {eff?.isSevereMismatch && <ShieldAlert className="w-3 h-3 text-red-400" />}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="my-auto flex flex-col items-center justify-center text-center space-y-1">
          <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
            <Plus className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-semibold text-slate-400">
            {spunTeam ? 'Tap to Pick' : 'Spin Wheel First'}
          </span>
        </div>
      )}
    </div>
  );
};
