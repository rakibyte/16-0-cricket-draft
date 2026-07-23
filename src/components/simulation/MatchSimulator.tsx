import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Play, FastForward, Trophy, ShieldAlert, Share2, RefreshCw, Table, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playMatchWinSound } from '../../utils/soundEngine';
import { triggerHapticSuccess } from '../../utils/hapticEngine';

export const MatchSimulator: React.FC = () => {
  const {
    slots,
    seasonState,
    runNextMatch,
    simulateFullSeason,
    restartSeason,
    setIsShareModalOpen,
    setActiveMatchSummary,
  } = useGameStore();

  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<'stepper' | 'table' | 'bracket'>('stepper');

  const filledCount = slots.filter((s) => s.assignedPlayer !== null).length;
  const isSquadComplete = filledCount === 11;

  const handleSimNext = () => {
    if (!isSquadComplete || seasonState.isCompleted) return;
    setIsSimulating(true);

    setTimeout(() => {
      const match = runNextMatch();
      setIsSimulating(false);

      if (match?.result === 'WIN') {
        playMatchWinSound();
      }

      if (seasonState.currentMatchIndex + 1 === 16 && seasonState.wins + (match?.result === 'WIN' ? 1 : 0) === 16) {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        triggerHapticSuccess();
      }
    }, 400);
  };

  const handleSimFull = () => {
    if (!isSquadComplete) return;
    setIsSimulating(true);
    setTimeout(() => {
      simulateFullSeason();
      setIsSimulating(false);
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
      triggerHapticSuccess();
    }, 600);
  };

  const tournament = seasonState.tournamentResult;

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-5">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-black text-white">16-0 League & Tournament Campaign</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            14 League Matches + Playoffs (Qualifier 1, Eliminator, Qualifier 2, Grand Final)
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!seasonState.isCompleted && (
            <>
              <button
                onClick={handleSimNext}
                disabled={!isSquadComplete || isSimulating}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(52,211,153,0.4)] hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSimulating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
                <span>Sim Match #{seasonState.currentMatchIndex + 1}</span>
              </button>

              <button
                onClick={handleSimFull}
                disabled={!isSquadComplete || isSimulating}
                className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-700 transition disabled:opacity-50"
                title="Instant Fast-Forward Season"
              >
                <FastForward className="w-4 h-4 text-cyan-400" />
                <span>Auto-Sim Season</span>
              </button>
            </>
          )}

          {seasonState.isCompleted && (
            <>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Results Grid</span>
              </button>
              <button
                onClick={restartSeason}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs hover:bg-slate-700 transition"
              >
                New Season
              </button>
            </>
          )}
        </div>
      </div>

      {!isSquadComplete && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-bold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Draft all 11 squad slots on the pitch to unlock the tournament simulation!</span>
        </div>
      )}

      {/* Sub Navigation Tabs (Stepper vs Points Table vs Playoff Bracket) */}
      <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold w-fit">
        <button
          onClick={() => setActiveTab('stepper')}
          className={`px-3 py-1.5 rounded-lg transition ${
            activeTab === 'stepper' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          16-Match Ticker
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
            activeTab === 'table' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          Points Table (8 Teams)
        </button>
        {seasonState.isCompleted && (
          <button
            onClick={() => setActiveTab('bracket')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
              activeTab === 'bracket' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Playoffs & Knockout
          </button>
        )}
      </div>

      {/* Tab 1: 16-Match Stepper Progress Grid */}
      {activeTab === 'stepper' && (
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>CAMPAIGN PROGRESS ({seasonState.currentMatchIndex}/16 GAMES)</span>
            <span className="text-emerald-400">{seasonState.wins} Wins - {seasonState.losses} Losses</span>
          </div>

          <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
            {Array.from({ length: 16 }).map((_, idx) => {
              const matchNum = idx + 1;
              const isPlayoff = matchNum >= 15;
              const matchSummary = seasonState.matches[idx];

              return (
                <div
                  key={matchNum}
                  onClick={() => matchSummary && setActiveMatchSummary(matchSummary)}
                  className={`h-11 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition ${
                    matchSummary
                      ? matchSummary.result === 'WIN'
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.3)]'
                        : matchSummary.result === 'TIE'
                        ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                        : 'bg-red-950/80 border-red-500 text-red-400'
                      : isPlayoff
                      ? 'bg-slate-900 border-amber-500/40 text-amber-400/60'
                      : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}
                  title={
                    matchSummary
                      ? `Match ${matchNum}: ${matchSummary.result} (${matchSummary.margin})`
                      : `Match ${matchNum} ${isPlayoff ? '(Playoffs)' : ''}`
                  }
                >
                  <span className="text-[9px] font-black">{isPlayoff ? `P${matchNum - 14}` : `M${matchNum}`}</span>
                  <span className="text-xs font-black">
                    {matchSummary
                      ? matchSummary.result === 'WIN'
                        ? '🟩'
                        : matchSummary.result === 'TIE'
                        ? '🟨'
                        : '🟥'
                      : isPlayoff
                      ? '🏆'
                      : '⚪'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: 8-Team Points Table */}
      {activeTab === 'table' && (
        <div className="space-y-3">
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-extrabold border-b border-slate-800">
                <tr>
                  <th className="p-2.5 text-center">POS</th>
                  <th className="p-2.5">TEAM</th>
                  <th className="p-2.5 text-center">P</th>
                  <th className="p-2.5 text-center">W</th>
                  <th className="p-2.5 text-center">L</th>
                  <th className="p-2.5 text-center">T</th>
                  <th className="p-2.5 text-center">NRR</th>
                  <th className="p-2.5 text-center">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-200">
                {tournament ? (
                  tournament.pointsTable.map((row) => (
                    <tr
                      key={row.teamName}
                      className={
                        row.isUser
                          ? 'bg-emerald-950/70 text-emerald-300 font-extrabold border-l-4 border-l-emerald-400'
                          : row.rank <= 4
                          ? 'bg-slate-900/40'
                          : ''
                      }
                    >
                      <td className="p-2.5 text-center font-black">{row.rank}</td>
                      <td className="p-2.5 font-bold flex items-center gap-1.5">
                        {row.isUser && <CrownIcon className="w-3.5 h-3.5 text-amber-400" />}
                        <span>{row.teamName}</span>
                      </td>
                      <td className="p-2.5 text-center">{row.p}</td>
                      <td className="p-2.5 text-center text-emerald-400 font-bold">{row.w}</td>
                      <td className="p-2.5 text-center text-red-400">{row.l}</td>
                      <td className="p-2.5 text-center">{row.t}</td>
                      <td className="p-2.5 text-center font-mono">{row.nrr > 0 ? `+${row.nrr}` : row.nrr}</td>
                      <td className="p-2.5 text-center font-black text-white">{row.pts}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-slate-500 font-medium">
                      Simulate season matches to calculate live League Points Table!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-slate-400 text-right font-medium">
            Top 4 teams qualify for Playoffs (Qualifier 1 & Eliminator)
          </p>
        </div>
      )}

      {/* Tab 3: Playoff Knockout Bracket */}
      {activeTab === 'bracket' && tournament && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tournament.playoffMatches.map((match) => (
              <div
                key={match.stageName}
                className={`p-3.5 rounded-xl border space-y-2 ${
                  match.stageName === 'Grand Final'
                    ? 'bg-gradient-to-r from-amber-950/80 to-slate-900 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-black">
                  <span className="text-amber-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    {match.stageName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{match.scoreText}</span>
                </div>

                <div className="space-y-1 text-xs font-bold">
                  <div className={`p-1.5 rounded flex items-center justify-between ${match.winner === match.team1 ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-slate-950 text-slate-400'}`}>
                    <span>{match.team1}</span>
                    {match.winner === match.team1 && <span className="text-[10px] text-emerald-400 font-extrabold">WINNER</span>}
                  </div>
                  <div className={`p-1.5 rounded flex items-center justify-between ${match.winner === match.team2 ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-slate-950 text-slate-400'}`}>
                    <span>{match.team2}</span>
                    {match.winner === match.team2 && <span className="text-[10px] text-emerald-400 font-extrabold">WINNER</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {tournament.isChampion && (
            <div className="p-3 bg-emerald-950 border border-emerald-500/50 rounded-xl text-center text-emerald-300 font-black text-sm flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
              <span>CONGRATULATIONS! YOUR XI IS THE IPL/BBL CHAMPION! 🏆</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CrownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className}>👑</span>
);
