import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Team } from '../../types/game';
import { playReelSlotSound, playWheelWinSound } from '../../utils/soundEngine';
import { triggerHapticTick, triggerHapticSuccess } from '../../utils/hapticEngine';
import { RefreshCw, RotateCcw, Video } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

interface ReelSpinnerProps {
  teams: Team[];
  onTeamSelected: (team: Team) => void;
  onOpenAdModal: () => void;
  respinTokens: number;
}

export const ReelSpinner: React.FC<ReelSpinnerProps> = ({
  teams,
  onTeamSelected,
  onOpenAdModal,
  respinTokens,
}) => {
  const { slots, resetDraft, useRespinToken } = useGameStore();

  const [isSpinning, setIsSpinning] = useState(false);
  const [displayedClub, setDisplayedClub] = useState<string>('CLUB');
  const [displayedSeason, setDisplayedSeason] = useState<string>('SEASON');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const filledCount = slots.filter((s) => s.assignedPlayer !== null).length;
  const positionsLeft = 11 - filledCount;
  const isDraftComplete = positionsLeft === 0;

  const handleSpin = () => {
    if (isSpinning || teams.length === 0 || isDraftComplete) return;

    setIsSpinning(true);
    setSelectedTeam(null);

    // Pick random winning team from pool
    const winningIndex = Math.floor(Math.random() * teams.length);
    const winningTeam = teams[winningIndex];

    let ticks = 0;
    const maxTicks = 18;

    const interval = setInterval(() => {
      ticks++;
      const randomRandomTeam = teams[Math.floor(Math.random() * teams.length)];
      setDisplayedClub(randomRandomTeam.name);
      setDisplayedSeason(String(randomRandomTeam.year));

      playReelSlotSound();
      triggerHapticTick();

      if (ticks >= maxTicks) {
        clearInterval(interval);
        setDisplayedClub(winningTeam.name);
        setDisplayedSeason(String(winningTeam.year));
        setSelectedTeam(winningTeam);
        setIsSpinning(false);

        playWheelWinSound();
        triggerHapticSuccess();

        onTeamSelected(winningTeam);
      }
    }, 90);
  };

  const handleRespin = () => {
    if (respinTokens > 0) {
      const success = useRespinToken();
      if (success) {
        handleSpin();
      }
    } else {
      onOpenAdModal();
    }
  };

  // Listen for Spacebar key to trigger spin automatically!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isSpinning && !isDraftComplete) {
        e.preventDefault();
        handleSpin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpinning, isDraftComplete, teams]);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-6 w-full max-w-lg mx-auto">
      {/* Subheader Title */}
      <div className="space-y-1">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
          SPIN FOR A SQUAD
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {positionsLeft} {positionsLeft === 1 ? 'position' : 'positions'} left to fill
        </h2>
      </div>

      {/* Dual Reel Slot Box ([ CLUB ] x [ SEASON ]) */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 w-full">
        {/* Club Box */}
        <div className="flex-1 h-20 rounded-2xl bg-slate-900 border-2 border-slate-700/80 shadow-xl flex flex-col items-center justify-center p-2 relative overflow-hidden">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
            CLUB / TEAM
          </span>
          <motion.span
            key={displayedClub}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-sm sm:text-base font-extrabold text-emerald-400 truncate max-w-[130px]"
          >
            {displayedClub}
          </motion.span>
        </div>

        {/* Multiplier Icon */}
        <span className="text-xl font-bold text-slate-500">✕</span>

        {/* Season Box */}
        <div className="flex-1 h-20 rounded-2xl bg-slate-900 border-2 border-slate-700/80 shadow-xl flex flex-col items-center justify-center p-2 relative overflow-hidden">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
            SEASON / YEAR
          </span>
          <motion.span
            key={displayedSeason}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-base sm:text-lg font-black text-cyan-300"
          >
            {displayedSeason}
          </motion.span>
        </div>
      </div>

      {/* Prominent Green Spin Button */}
      <div className="w-full space-y-2">
        <button
          onClick={handleSpin}
          disabled={isSpinning || isDraftComplete}
          className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg sm:text-xl shadow-[0_0_30px_rgba(52,211,153,0.5)] transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSpinning ? (
            <RefreshCw className="w-6 h-6 animate-spin text-slate-950" />
          ) : isDraftComplete ? (
            <span>SQUAD FULLY DRAFTED</span>
          ) : (
            <>
              <span>🎰 Spin the Wheel</span>
            </>
          )}
        </button>

        {!isDraftComplete && (
          <p className="text-xs text-slate-500 font-medium">
            or tap anywhere, or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">Space</kbd>
          </p>
        )}
      </div>

      {/* Selected Result Card */}
      {selectedTeam && !isSpinning && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-3 rounded-2xl glass-card border border-emerald-500/50 flex items-center justify-between gap-4 w-full"
        >
          <div className="flex items-center gap-3 text-left">
            <span className="text-3xl">{selectedTeam.badgeSymbol}</span>
            <div>
              <h4 className="text-sm font-extrabold text-white">
                {selectedTeam.name} ({selectedTeam.year})
              </h4>
              <p className="text-[11px] text-emerald-400 font-semibold">{selectedTeam.era}</p>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
            {selectedTeam.overallRating} OVR
          </div>
        </motion.div>
      )}

      {/* Re-spin & Restart Run Action Bar */}
      <div className="flex items-center gap-3 pt-2">
        {!isDraftComplete && (
          <button
            onClick={handleRespin}
            disabled={isSpinning}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition disabled:opacity-50"
          >
            <Video className="w-3.5 h-3.5 text-amber-400" />
            <span>Re-spin ({respinTokens})</span>
          </button>
        )}

        <button
          onClick={resetDraft}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-bold transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart run</span>
        </button>
      </div>
    </div>
  );
};
