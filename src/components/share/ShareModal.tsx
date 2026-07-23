import React, { useRef, useState } from 'react';
import { Modal } from '../common/Modal';
import { useGameStore } from '../../store/useGameStore';
import { calculateSquadChemistry } from '../../utils/chemistry';
import { Copy, Download, CheckCircle2, Trophy } from 'lucide-react';
import { toPng } from 'html-to-image';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, seasonState, slots, leagueMode } = useGameStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isShareModalOpen) return null;

  const { chemistryScore, effectiveSquadRating } = calculateSquadChemistry(slots);
  const tournament = seasonState.tournamentResult;

  // Generate 16-match emoji string
  const emojiGrid = seasonState.matches
    .map((m) => (m.result === 'WIN' ? '🟩' : m.result === 'TIE' ? '🟨' : '🟥'))
    .join('');

  const shareText = `🏏 16-0 CRICKET SQUAD DRAFT 🏏
League: ${leagueMode}
Season Record: ${seasonState.wins}W - ${seasonState.losses}L ${seasonState.isFlawless ? '🏆 PERFECT 16-0!' : ''}
Final Rank: #${tournament?.userFinalRank || 1} in Points Table ${tournament?.isChampion ? '🏆 CHAMPIONS!' : ''}
Chemistry: ${chemistryScore}% | Squad OVR: ${effectiveSquadRating}

Results Grid:
${emojiGrid}

Can you win the League? Play the 16-0 Draft Challenge!`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 0.95 });
      const link = document.createElement('a');
      link.download = `16-0-cricket-season-${seasonState.wins}W-${seasonState.losses}L.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // Ignore image download error
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Modal
      isOpen={isShareModalOpen}
      onClose={() => setIsShareModalOpen(false)}
      title="Season Tournament Results & Post-Mortem"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Printable Card Node */}
        <div
          ref={cardRef}
          className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/50 shadow-2xl text-left space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-slate-950 text-sm">
                16
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">16-0 CRICKET DRAFT</h4>
                <p className="text-[10px] text-emerald-400 font-bold uppercase">{leagueMode} MODE</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                {seasonState.wins}W - {seasonState.losses}L
              </span>
            </div>
          </div>

          {/* Tournament Rank & Championship Banner */}
          {tournament && (
            <div className="p-3 bg-gradient-to-r from-amber-950/80 to-slate-900 border border-amber-500/40 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <div>
                  <h5 className="text-xs font-black text-white">
                    {tournament.isChampion ? 'IPL / BBL CHAMPIONS 🏆' : `Ranked #${tournament.userFinalRank} in Points Table`}
                  </h5>
                  <p className="text-[10px] text-slate-400">
                    Points: {seasonState.wins * 2} PTS | NRR: +{(seasonState.wins * 0.12).toFixed(2)}
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-amber-400 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                {tournament.isChampion ? 'TROPHY WON' : 'PLAYOFFS'}
              </span>
            </div>
          )}

          {/* Emoji Grid Display */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 block mb-1.5">
              16-MATCH CAMPAIGN EMOJI GRID
            </span>
            <div className="text-xl tracking-widest font-mono select-all font-bold">
              {emojiGrid || '🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩'}
            </div>
          </div>

          {/* Squad Highlights List */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 block mb-1.5">DRAFTED XI SQUAD</span>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
              {slots.map((s) => (
                <div key={s.id} className="bg-slate-900/80 p-1.5 rounded border border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 truncate max-w-[80px]">{s.slotName}:</span>
                  <span className="text-[11px] font-bold text-emerald-300 truncate max-w-[90px]">
                    {s.assignedPlayer?.name || 'Empty'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-slate-800 text-slate-300">
            <span>Chemistry: {chemistryScore}%</span>
            <span>Squad OVR: {effectiveSquadRating}</span>
            <span className="text-emerald-400">#16-0Cricket</span>
          </div>
        </div>

        {/* Share Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={handleCopyText}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-emerald-400 transition"
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy WhatsApp / X Text'}</span>
          </button>

          <button
            onClick={handleDownloadImage}
            disabled={isExporting}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-slate-700 transition"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>{isExporting ? 'Generating Image...' : 'Save PNG Image'}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
