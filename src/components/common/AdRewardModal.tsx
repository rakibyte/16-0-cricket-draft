import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { useGameStore } from '../../store/useGameStore';
import { Video, Award, CheckCircle2, Play } from 'lucide-react';
import { triggerHapticSuccess } from '../../utils/hapticEngine';

export const AdRewardModal: React.FC = () => {
  const { isAdModalOpen, setIsAdModalOpen, grantRespinTokens } = useGameStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isRewarded, setIsRewarded] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isPlaying && countdown === 0) {
      setIsPlaying(false);
      setIsRewarded(true);
      grantRespinTokens(2);
      triggerHapticSuccess();
    }
    return () => clearTimeout(timer);
  }, [isPlaying, countdown, grantRespinTokens]);

  const handleStartAd = () => {
    setIsPlaying(true);
    setCountdown(3);
    setIsRewarded(false);
  };

  const handleClose = () => {
    setIsAdModalOpen(false);
    setIsPlaying(false);
    setIsRewarded(false);
    setCountdown(3);
  };

  return (
    <Modal isOpen={isAdModalOpen} onClose={handleClose} title="Rewarded Video Ad">
      <div className="flex flex-col items-center justify-center p-4 text-center space-y-4">
        {!isPlaying && !isRewarded && (
          <>
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Video className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-100">Watch Ad for Extra Re-spins</h4>
              <p className="text-xs text-slate-400 mt-1">
                Watch a short 3-second sponsor clip to receive +2 Wheel Re-spins instantly!
              </p>
            </div>
            <button
              onClick={handleStartAd}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch Video Ad (3s)
            </button>
          </>
        )}

        {isPlaying && (
          <div className="w-full py-8 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin flex items-center justify-center">
              <span className="text-xs font-black text-amber-400 animate-none">{countdown}</span>
            </div>
            <p className="text-xs font-semibold text-slate-300">Playing Sponsor Advertisement...</p>
            <p className="text-[10px] text-slate-500">Reward will unlock automatically</p>
          </div>
        )}

        {isRewarded && (
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Award className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-emerald-400">Reward Claimed!</h4>
            <p className="text-xs text-slate-300">You earned +2 Team Re-spin Tokens.</p>
            <button
              onClick={handleClose}
              className="w-full py-2.5 px-6 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Back to Drafting
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
