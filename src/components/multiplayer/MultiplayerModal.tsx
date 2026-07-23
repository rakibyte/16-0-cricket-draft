import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useGameStore } from '../../store/useGameStore';
import { Users, Plus, Key, Play, Trophy, Crown, ShieldCheck, CheckCircle2, Sparkles, LogOut } from 'lucide-react';
import type { LeagueMode } from '../../types/game';

export const MultiplayerModal: React.FC = () => {
  const {
    isMultiplayerModalOpen,
    setIsMultiplayerModalOpen,
    multiplayerRoom,
    createMultiplayerRoom,
    joinMultiplayerRoom,
    leaveMultiplayerRoom,
    toggleMultiplayerReady,
    startMultiplayerDraft,
    username,
    setCurrentView,
    resetDraft,
  } = useGameStore();

  const [tab, setTab] = useState<'CREATE' | 'JOIN'>('CREATE');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [selectedLeague, setSelectedLeague] = useState<LeagueMode>('IPL');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [timerSeconds, setTimerSeconds] = useState(180); // 3 minutes default

  if (!isMultiplayerModalOpen) return null;

  const handleCreate = () => {
    createMultiplayerRoom(selectedLeague, maxPlayers, timerSeconds);
  };

  const handleJoin = () => {
    if (roomCodeInput.trim()) {
      joinMultiplayerRoom(roomCodeInput.trim().toUpperCase());
    }
  };

  const handleStartDraft = () => {
    startMultiplayerDraft();
    resetDraft();
    setCurrentView('DRAFT');
    setIsMultiplayerModalOpen(false);
  };

  return (
    <Modal
      isOpen={isMultiplayerModalOpen}
      onClose={() => setIsMultiplayerModalOpen(false)}
      title="Live Multiplayer Draft Room"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {!multiplayerRoom ? (
          /* State 1: Create or Join Room Form */
          <div className="space-y-4">
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-black">
              <button
                onClick={() => setTab('CREATE')}
                className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  tab === 'CREATE' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
                Create Private Room
              </button>
              <button
                onClick={() => setTab('JOIN')}
                className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  tab === 'JOIN' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Key className="w-4 h-4" />
                Join with Room Code
              </button>
            </div>

            {tab === 'CREATE' ? (
              <div className="space-y-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Select Tournament League Mode
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {(['IPL', 'BBL', 'WORLD_CRICKET', 'ALL_TIME_XI'] as LeagueMode[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setSelectedLeague(mode)}
                        className={`py-2 rounded-xl text-xs font-black transition ${
                          selectedLeague === mode
                            ? 'bg-emerald-500 text-slate-950 shadow'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {mode === 'WORLD_CRICKET' ? 'WORLD' : mode === 'ALL_TIME_XI' ? 'ALL-TIME' : mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                      Max Players
                    </label>
                    <select
                      value={maxPlayers}
                      onChange={(e) => setMaxPlayers(parseInt(e.target.value, 10))}
                      className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none"
                    >
                      <option value={2}>2 Players (1v1 Duels)</option>
                      <option value={4}>4 Players (Mini League)</option>
                      <option value={8}>8 Players (Full Tournament)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                      Draft Timer Limit
                    </label>
                    <select
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(parseInt(e.target.value, 10))}
                      className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none"
                    >
                      <option value={180}>3 Minutes (Standard)</option>
                      <option value={300}>5 Minutes (Relaxed)</option>
                      <option value={120}>2 Minutes (Blitz Draft)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleCreate}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2 mt-2"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Create Room & Generate Code</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                    Enter 6-Digit Room Code
                  </label>
                  <input
                    type="text"
                    value={roomCodeInput}
                    onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                    placeholder="e.g. CRIC-84"
                    maxLength={10}
                    className="w-full text-center tracking-widest text-lg font-mono font-black py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 focus:outline-none focus:border-cyan-500 uppercase"
                  />
                </div>

                <button
                  onClick={handleJoin}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-sm shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  <span>Join Multiplayer Room</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* State 2: Active Room View (Lobby / Drafting / Reveal) */
          <div className="space-y-4">
            {/* Room Header Info */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/40 flex items-center justify-between shadow-xl">
              <div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">
                  ROOM CODE: <span className="font-mono text-white text-base ml-1">{multiplayerRoom.roomCode}</span>
                </span>
                <p className="text-xs text-slate-300 font-bold mt-0.5">
                  League: {multiplayerRoom.leagueMode} &bull; Timer: {Math.floor(multiplayerRoom.timerSeconds / 60)} Mins
                </p>
              </div>

              <button
                onClick={leaveMultiplayerRoom}
                className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30 transition flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Leave Room
              </button>
            </div>

            {/* Players List with Live Scoreboard Comparison */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>CONNECTED PLAYERS ({multiplayerRoom.players.length}/{multiplayerRoom.maxPlayers})</span>
                <span className="text-emerald-400 text-[10px]">Head-to-Head Live Score & Standings Comparison</span>
              </h4>

              <div className="space-y-2 max-h-[42vh] overflow-y-auto pr-1">
                {multiplayerRoom.players.map((p) => {
                  const isYou = p.username === username;

                  return (
                    <div
                      key={p.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between transition ${
                        isYou
                          ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border-emerald-500/60 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                          : 'bg-slate-900/90 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center font-black text-white text-xs border border-slate-800">
                          {p.isHost ? <Crown className="w-4 h-4 text-amber-400" /> : <Users className="w-4 h-4 text-cyan-400" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-extrabold text-white">
                              {p.username}
                            </span>
                            {isYou && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 text-[9px] font-black uppercase">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold block">
                            {p.hasFinishedSim
                              ? `Record: ${p.wins} Wins | Squad OVR: ${p.squadOvr}`
                              : p.hasFinishedDraft
                              ? 'Draft Completed - Simulating Season...'
                              : 'Drafting 11 Squad Slots...'}
                          </span>
                        </div>
                      </div>

                      {/* Opponent Score & Rank Comparison */}
                      <div className="text-right flex items-center gap-3">
                        {p.hasFinishedSim ? (
                          <div className="text-right">
                            <span className="text-sm font-black text-amber-400 block">{p.score} PTS</span>
                            <span className="text-[10px] font-bold text-emerald-400">{p.wins}W - {16 - (p.wins || 0)}L</span>
                          </div>
                        ) : p.isReady ? (
                          <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            Ready
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-400 text-[10px] font-bold uppercase">
                            Waiting
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Room Host Controls */}
            {multiplayerRoom.status === 'LOBBY' && (
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={toggleMultiplayerReady}
                  className="flex-1 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-xs hover:bg-slate-700 transition flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Toggle Ready</span>
                </button>

                {multiplayerRoom.hostUsername === username && (
                  <button
                    onClick={handleStartDraft}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-xs shadow-lg hover:brightness-110 transition flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>START MULTIPLAYER DRAFT</span>
                  </button>
                )}
              </div>
            )}

            {/* Final Reveal Scoreboard */}
            {multiplayerRoom.status === 'REVEAL' && (
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="text-center">
                  <h3 className="text-xl font-black text-amber-400 flex items-center justify-center gap-2">
                    <Trophy className="w-6 h-6 text-amber-400" />
                    MULTIPLAYER CHAMPIONS REVEAL!
                  </h3>
                  <p className="text-xs text-slate-400">Head-to-Head Opponents Scoreboard Comparison</p>
                </div>

                <div className="space-y-2">
                  {multiplayerRoom.players
                    .slice()
                    .sort((a, b) => (b.score || 0) - (a.score || 0))
                    .map((p, idx) => (
                      <div
                        key={p.id}
                        className={`p-3.5 rounded-xl border flex items-center justify-between ${
                          idx === 0
                            ? 'bg-amber-950/80 border-amber-500/80 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                            : 'bg-slate-900 border-slate-800 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-black text-base">{idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : `#${idx + 1}`}</span>
                          <div>
                            <span className="font-extrabold text-sm text-white flex items-center gap-1">
                              {p.username}
                              {idx === 0 && <Crown className="w-4 h-4 text-amber-400" />}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold block">
                              Record: {p.wins} Wins &bull; Squad OVR: {p.squadOvr}
                            </span>
                          </div>
                        </div>

                        <div className="text-right font-black">
                          <span className="text-amber-400 text-lg">{p.score} PTS</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
