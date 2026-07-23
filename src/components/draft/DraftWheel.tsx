import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import type { Team } from '../../types/game';
import { playWheelTickSound, playWheelWinSound } from '../../utils/soundEngine';
import { triggerHapticTick, triggerHapticSuccess } from '../../utils/hapticEngine';
import { RefreshCw, Play, Video } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

interface DraftWheelProps {
  teams: Team[];
  onTeamSelected: (team: Team) => void;
  onOpenAdModal: () => void;
  respinTokens: number;
}

export const DraftWheel: React.FC<DraftWheelProps> = ({
  teams,
  onTeamSelected,
  onOpenAdModal,
  respinTokens,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const controls = useAnimationControls();
  const lastTickAngle = useRef(0);
  const { useRespinToken, slots } = useGameStore();

  const filledCount = slots.filter((s) => s.assignedPlayer !== null).length;
  const isDraftComplete = filledCount === 11;

  const numSlices = teams.length;
  const sliceAngle = 360 / Math.max(1, numSlices);

  useEffect(() => {
    setSelectedTeam(null);
    setCurrentRotation(0);
    controls.set({ rotate: 0 });
  }, [teams, controls]);

  const handleSpin = async () => {
    if (isSpinning || teams.length === 0 || isDraftComplete) return;

    setIsSpinning(true);
    setSelectedTeam(null);

    // Pick random winning index
    const winningIndex = Math.floor(Math.random() * numSlices);
    const winningTeam = teams[winningIndex];

    // Compute rotation angle (5 full spins + slice offset)
    const baseSpins = 360 * 5;
    const sliceCenter = winningIndex * sliceAngle + sliceAngle / 2;
    const targetAngle = currentRotation + baseSpins + (360 - sliceCenter);

    lastTickAngle.current = currentRotation;

    await controls.start({
      rotate: targetAngle,
      transition: {
        duration: 4.0,
        ease: [0.15, 0.85, 0.35, 0.98], // Custom spring easing curve
      },
    });

    setCurrentRotation(targetAngle % 360);
    setIsSpinning(false);
    setSelectedTeam(winningTeam);

    // Trigger victory sound & heavy haptic feedback
    playWheelWinSound();
    triggerHapticSuccess();

    onTeamSelected(winningTeam);
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

  return (
    <div className="flex flex-col items-center justify-center p-4 relative w-full">
      {/* Neon Pointer */}
      <div className="z-20 -mb-4 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.9)]">
        <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-emerald-400" />
      </div>

      {/* Wheel Outer Frame */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border-4 border-cyan-500/40 shadow-[0_0_45px_rgba(6,182,212,0.25)] flex items-center justify-center bg-slate-950 overflow-hidden">
        {/* Animated Rotating Wheel */}
        <motion.div
          animate={controls}
          className="w-full h-full rounded-full relative"
          onUpdate={(latest) => {
            if (typeof latest.rotate === 'number') {
              const degreesPassed = Math.abs(latest.rotate - lastTickAngle.current);
              if (degreesPassed >= sliceAngle) {
                lastTickAngle.current = latest.rotate;
                playWheelTickSound();
                triggerHapticTick();
              }
            }
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {teams.map((team, index) => {
              const startAngle = index * sliceAngle;
              const endAngle = (index + 1) * sliceAngle;

              const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
              const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
              const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
              const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

              const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

              return (
                <g key={team.id}>
                  <path
                    d={pathData}
                    fill={index % 2 === 0 ? team.primaryColor || '#1e293b' : team.secondaryColor || '#0f172a'}
                    stroke="#020617"
                    strokeWidth="0.6"
                  />
                  <text
                    x="73"
                    y="50"
                    fill="#ffffff"
                    fontSize="3.8"
                    fontWeight="800"
                    transform={`rotate(${startAngle + sliceAngle / 2}, 50, 50)`}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="select-none font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  >
                    {team.shortCode} '{String(team.year).slice(-2)}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Center Hub Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning || isDraftComplete}
          className="absolute z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 font-black text-lg flex flex-col items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.6)] border-4 border-slate-950 transition-transform active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isSpinning ? (
            <RefreshCw className="w-8 h-8 animate-spin text-slate-950" />
          ) : isDraftComplete ? (
            <span className="text-[11px] font-black text-slate-950 text-center uppercase leading-tight px-1">
              SQUAD READY
            </span>
          ) : (
            <>
              <Play className="w-6 h-6 fill-current" />
              <span className="text-[10px] tracking-wider uppercase font-extrabold">SPIN</span>
            </>
          )}
        </button>
      </div>

      {/* Selected Team Banner */}
      {selectedTeam && !isSpinning && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-2xl glass-card border border-emerald-500/50 flex items-center justify-between gap-4 w-full max-w-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedTeam.badgeSymbol}</span>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">
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

      {/* Re-spin Options */}
      {!isDraftComplete && (
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleRespin}
            disabled={isSpinning}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-slate-200 text-xs font-bold transition disabled:opacity-50"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Re-spin ({respinTokens})</span>
          </button>

          <button
            onClick={onOpenAdModal}
            disabled={isSpinning}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition disabled:opacity-50"
          >
            <Video className="w-3.5 h-3.5 text-amber-400" />
            <span>Free Tokens</span>
          </button>
        </div>
      )}
    </div>
  );
};
