import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { SquadSlotCard } from './SquadSlotCard';
import { ChemistryBar } from './ChemistryBar';
import { Zap } from 'lucide-react';

export const CricketPitch: React.FC = () => {
  const { slots } = useGameStore();

  const openers = slots.filter((s) => s.id === 1 || s.id === 2);
  const topMiddle = slots.filter((s) => s.id === 3 || s.id === 4);
  const wkAndAllrounders = slots.filter((s) => s.id === 5 || s.id === 6 || s.id === 7);
  const bowlers = slots.filter((s) => s.id >= 8 && s.id <= 11);

  // Calculate Franchise Synergy Links (2+ from same team)
  const teamCounts: Record<string, number> = {};
  slots.forEach((s) => {
    if (s.assignedFromTeam) {
      teamCounts[s.assignedFromTeam] = (teamCounts[s.assignedFromTeam] || 0) + 1;
    }
  });

  const activeSynergies = Object.entries(teamCounts).filter(([, count]) => count >= 2);

  return (
    <div className="w-full space-y-4">
      {/* Chemistry Status Bar */}
      <ChemistryBar />

      {/* Visual Cricket Ground Layout */}
      <div className="relative w-full rounded-3xl p-4 sm:p-6 pitch-gradient border-2 border-emerald-500/30 shadow-[0_0_35px_rgba(21,128,61,0.35)] overflow-hidden">
        {/* Pitch Lines Accent */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
          <div className="w-48 h-full border-x-2 border-dashed border-white" />
          <div className="absolute w-full h-24 border-y-2 border-white" />
          <div className="absolute w-40 h-40 rounded-full border-2 border-white" />
        </div>

        {/* Franchise Synergy Green Link Overlay */}
        {activeSynergies.length > 0 && (
          <div className="relative z-20 mb-3 p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400 fill-current animate-pulse" />
              <span>Franchise Synergy Active:</span>
            </div>
            <div className="flex items-center gap-2">
              {activeSynergies.map(([teamName, count]) => (
                <span key={teamName} className="px-2 py-0.5 rounded bg-emerald-500/30 border border-emerald-400/50 text-[10px] font-black text-emerald-200">
                  {teamName} ({count}x Link)
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 11 Squad Slots Grid */}
        <div className="relative z-10 space-y-4">
          {/* Section 1: Openers */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-300 uppercase tracking-widest mb-2 drop-shadow">
              <span>⚡</span> Openers (Slots 1 & 2)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {openers.map((slot) => (
                <SquadSlotCard key={slot.id} slot={slot} />
              ))}
            </div>
          </div>

          {/* Section 2: Top / Middle Order */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-300 uppercase tracking-widest mb-2 drop-shadow">
              <span>🏏</span> Middle Order (Slots 3 & 4)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topMiddle.map((slot) => (
                <SquadSlotCard key={slot.id} slot={slot} />
              ))}
            </div>
          </div>

          {/* Section 3: WK & All-Rounders */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-300 uppercase tracking-widest mb-2 drop-shadow">
              <span>🧤</span> Wicketkeeper & All-Rounders (Slots 5, 6 & 7)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {wkAndAllrounders.map((slot) => (
                <SquadSlotCard key={slot.id} slot={slot} />
              ))}
            </div>
          </div>

          {/* Section 4: Bowling Attack */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-300 uppercase tracking-widest mb-2 drop-shadow">
              <span>🔥</span> Bowling Unit (Slots 8 to 11)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {bowlers.map((slot) => (
                <SquadSlotCard key={slot.id} slot={slot} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
