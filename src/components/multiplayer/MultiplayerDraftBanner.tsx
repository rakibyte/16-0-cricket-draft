import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Clock, Users } from 'lucide-react';

export const MultiplayerDraftBanner: React.FC = () => {
  const { multiplayerRoom, slots, setIsMultiplayerModalOpen } = useGameStore();

  const [timeLeft, setTimeLeft] = useState(multiplayerRoom?.timerSeconds || 180);

  useEffect(() => {
    if (!multiplayerRoom || multiplayerRoom.status !== 'DRAFTING') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [multiplayerRoom]);

  if (!multiplayerRoom || (multiplayerRoom.status !== 'DRAFTING' && multiplayerRoom.status !== 'SIMULATING')) {
    return null;
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedTime = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  const filledCount = slots.filter((s) => s.assignedPlayer !== null).length;

  return (
    <div className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-cyan-950 border border-purple-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-black text-lg">
          <Users className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-white uppercase tracking-wider">
              MULTIPLAYER ROOM: <span className="font-mono text-purple-300">{multiplayerRoom.roomCode}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-black uppercase">
              {multiplayerRoom.leagueMode}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 font-medium">
            Draft your XI before timer expires &bull; Picked: <span className="text-emerald-400 font-black">{filledCount}/11</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        {/* Countdown Timer */}
        <div className={`px-4 py-1.5 rounded-xl border flex items-center gap-1.5 font-mono text-base font-black ${
          timeLeft < 30 ? 'bg-rose-950/80 border-rose-500 text-rose-400 animate-pulse' : 'bg-slate-950 border-purple-500/40 text-purple-300'
        }`}>
          <Clock className="w-4 h-4 text-purple-400" />
          <span>{formattedTime}</span>
        </div>

        <button
          onClick={() => setIsMultiplayerModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-purple-500 text-white text-xs font-extrabold hover:bg-purple-400 transition shadow"
        >
          View Room Lobby
        </button>
      </div>
    </div>
  );
};
