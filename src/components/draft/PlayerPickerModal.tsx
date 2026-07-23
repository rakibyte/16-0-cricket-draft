import React from 'react';
import { Modal } from '../common/Modal';
import { useGameStore } from '../../store/useGameStore';
import type { Player } from '../../types/game';
import { calculateSlotEfficiency, isPositionAllowed } from '../../utils/chemistry';
import { ROLE_LABELS, ROLE_ICONS } from '../../data/slotsConfig';
import { playLockPlayerSound } from '../../utils/soundEngine';
import { triggerHapticLock } from '../../utils/hapticEngine';
import { ShieldAlert, CheckCircle, Zap, Lock, EyeOff, XCircle } from 'lucide-react';

export const PlayerPickerModal: React.FC = () => {
  const {
    spunTeam,
    activePickerSlotId,
    closePlayerPicker,
    assignPlayerToSlot,
    slots,
    difficultyMode,
  } = useGameStore();

  if (!spunTeam || activePickerSlotId === null) return null;

  const currentSlot = slots.find((s) => s.id === activePickerSlotId) || slots.find((s) => s.assignedPlayer === null);
  if (!currentSlot) return null;

  const isHardMode = difficultyMode === 'HARD';
  const reqRole = currentSlot.requiredRole;

  // Get normalized names of all players already in the current XI
  const draftedPlayerNames = slots
    .map((s) => s.assignedPlayer?.name.toLowerCase().trim())
    .filter((name): name is string => Boolean(name));

  const handleSelectPlayer = (player: Player) => {
    const normName = player.name.toLowerCase().trim();
    if (draftedPlayerNames.includes(normName)) return; // Strict duplicate name prevention!
    if (!isPositionAllowed(player, reqRole)) return;  // Strict position compatibility enforcement!

    playLockPlayerSound();
    triggerHapticLock();
    assignPlayerToSlot(currentSlot.id, player, `${spunTeam.name} ('${String(spunTeam.year).slice(-2)})`);
    closePlayerPicker();
  };

  // Sort players for target slot:
  // 1. Position Allowed & Exact/Primary Match
  // 2. Position Allowed & Secondary Match
  // 3. Position Allowed & Other
  // 4. Disallowed Positions (at the very bottom)
  const sortedRoster = [...spunTeam.roster].sort((a, b) => {
    const aAllowed = isPositionAllowed(a, reqRole);
    const bAllowed = isPositionAllowed(b, reqRole);

    if (aAllowed && !bAllowed) return -1;
    if (!aAllowed && bAllowed) return 1;

    const aExact = a.primaryRole === reqRole;
    const bExact = b.primaryRole === reqRole;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    const aSec = a.secondaryRole === reqRole;
    const bSec = b.secondaryRole === reqRole;
    if (aSec && !bSec) return -1;
    if (!aSec && bSec) return 1;

    return b.overallRating - a.overallRating;
  });

  return (
    <Modal
      isOpen={activePickerSlotId !== null}
      onClose={closePlayerPicker}
      title={`Draft Player for #${currentSlot.id} ${currentSlot.slotName}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Banner */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{spunTeam.badgeSymbol}</span>
            <div>
              <h4 className="text-base font-extrabold text-white">{spunTeam.name} ({spunTeam.year})</h4>
              <p className="text-xs text-emerald-400 font-semibold">{spunTeam.era}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-bold">Targeting Slot:</span>
            <div className="text-xs font-black text-emerald-400 flex items-center gap-1">
              <span>{ROLE_ICONS[currentSlot.requiredRole]}</span>
              <span>#{currentSlot.id} {currentSlot.slotName}</span>
            </div>
          </div>
        </div>

        {isHardMode && (
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-rose-400 shrink-0" />
            <span>HARD MODE ACTIVE: Numeric OVR ratings & fit percentages are hidden! Rely on real cricket knowledge.</span>
          </div>
        )}

        {/* Player Roster Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {sortedRoster.map((player) => {
            const normName = player.name.toLowerCase().trim();
            const isAlreadyDrafted = draftedPlayerNames.includes(normName);
            const isAllowed = isPositionAllowed(player, reqRole);
            const eff = calculateSlotEfficiency(player, reqRole);

            const isSelectionDisabled = isAlreadyDrafted || !isAllowed;

            return (
              <div
                key={player.id}
                onClick={() => !isSelectionDisabled && handleSelectPlayer(player)}
                className={`p-3.5 rounded-xl border transition flex flex-col justify-between space-y-3 relative ${
                  isSelectionDisabled
                    ? 'bg-slate-950/60 border-slate-800/80 opacity-50 cursor-not-allowed'
                    : !isHardMode && eff.isExactRole
                    ? 'bg-slate-900/90 border-emerald-500/60 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)] cursor-pointer'
                    : !isHardMode && eff.isSecondaryRole
                    ? 'bg-slate-900/90 border-cyan-500/50 hover:border-cyan-400 cursor-pointer'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-600 cursor-pointer'
                }`}
              >
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-extrabold text-sm text-white">{player.name}</h5>
                      {player.isLegend && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-black uppercase">
                          Legend
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Primary: {ROLE_LABELS[player.primaryRole]}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-emerald-400 leading-none">
                      {isHardMode ? '???' : player.overallRating}
                    </span>
                    <span className="text-[9px] text-slate-400 block font-bold">OVR</span>
                  </div>
                </div>

                {/* Role Efficiency Badge */}
                <div className="flex items-center justify-between bg-slate-950/80 p-2 rounded-lg text-xs">
                  <div className="flex items-center gap-1">
                    {isAlreadyDrafted ? (
                      <span className="text-slate-500 text-[10px] font-extrabold flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-400" /> Already in XI
                      </span>
                    ) : !isAllowed ? (
                      <span className="text-red-400 text-[10px] font-extrabold flex items-center gap-1">
                        <XCircle className="w-3 h-3 text-red-400" /> Position Mismatch
                      </span>
                    ) : isHardMode ? (
                      <span className="text-rose-400 text-[11px] font-extrabold flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> Hidden Fit
                      </span>
                    ) : (
                      <>
                        {eff.isExactRole && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                        {!eff.isExactRole && eff.isSevereMismatch && (
                          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                        )}
                        <span
                          className={`font-extrabold text-[11px] ${
                            eff.isExactRole
                              ? 'text-emerald-400'
                              : eff.isSecondaryRole
                              ? 'text-cyan-300'
                              : 'text-amber-300'
                          }`}
                        >
                          {Math.round(eff.efficiencyMultiplier * 100)}% Fit
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {isAlreadyDrafted
                      ? 'Duplicate Resticted'
                      : !isAllowed
                      ? 'Cannot play this position'
                      : isHardMode
                      ? 'Hidden in Hard Mode'
                      : eff.reason}
                  </span>
                </div>

                {/* Draft Button */}
                <button
                  disabled={isSelectionDisabled}
                  className={`w-full py-2 rounded-lg font-black text-xs transition flex items-center justify-center gap-1 ${
                    isAlreadyDrafted
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : !isAllowed
                      ? 'bg-red-950/60 text-red-400 border border-red-500/30 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-md'
                  }`}
                >
                  {isAlreadyDrafted ? (
                    'Unavailable (Already in XI)'
                  ) : !isAllowed ? (
                    'Not Allowed for this Position'
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      Lock Into Slot #{currentSlot.id} ({currentSlot.slotName})
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
