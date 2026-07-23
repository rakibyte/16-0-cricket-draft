import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { useGameStore } from '../../store/useGameStore';
import { Video, Gift, CheckCircle2, Sparkles, Coins } from 'lucide-react';
import { playCoinClaimSound } from '../../utils/soundEngine';

export const AdRewardModal: React.FC = () => {
  const { isAdModalOpen, setIsAdModalOpen, grantRespinTokens, addCoins } = useGameStore();

  const [isPlayingAd, setIsPlayingAd] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [rewardType, setRewardType] = useState<'RESPIN' | 'COINS'>('RESPIN');

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlayingAd && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (isPlayingAd && countdown === 0) {
      setIsPlayingAd(false);
      setRewardClaimed(true);
      if (rewardType === 'RESPIN') {
        grantRespinTokens(3);
      } else {
        addCoins(100);
      }
      playCoinClaimSound();
    }
    return () => clearInterval(timer);
  }, [isPlayingAd, countdown, rewardType, grantRespinTokens, addCoins]);

  if (!isAdModalOpen) return null;

  const handleStartAd = (type: 'RESPIN' | 'COINS') => {
    setRewardType(type);
    setRewardClaimed(false);
    setCountdown(10);
    setIsPlayingAd(true);
  };

  const handleClose = () => {
    setIsPlayingAd(false);
    setRewardClaimed(false);
    setIsAdModalOpen(false);
  };

  return (
    <Modal
      isOpen={isAdModalOpen}
      onClose={handleClose}
      title="Rewarded Video Ads & Revenue Boost"
      maxWidth="max-w-md"
    >
      <div className="space-y-5 text-center">
        {!isPlayingAd && !rewardClaimed ? (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              <Gift className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">Watch Ad & Claim Free Rewards</h3>
              <p className="text-xs text-slate-400 mt-1">
                Support 16-0 Cricket Draft & earn extra Re-spin Tokens or Bonus Coins!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleStartAd('RESPIN')}
                className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/80 border border-amber-500/50 hover:border-amber-400 transition flex flex-col items-center gap-2 group"
              >
                <Video className="w-6 h-6 text-amber-400 group-hover:scale-110 transition" />
                <span className="text-xs font-black text-white">+3 Re-spins</span>
                <span className="text-[10px] text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded">Watch 10s Video</span>
              </button>

              <button
                onClick={() => handleStartAd('COINS')}
                className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/80 border border-emerald-500/50 hover:border-emerald-400 transition flex flex-col items-center gap-2 group"
              >
                <Coins className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition" />
                <span className="text-xs font-black text-white">+100 Coins</span>
                <span className="text-[10px] text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">Watch 10s Video</span>
              </button>
            </div>
          </div>
        ) : isPlayingAd ? (
          <div className="space-y-4 py-6">
            <div className="w-20 h-20 rounded-full border-4 border-amber-500 border-t-transparent animate-spin mx-auto flex items-center justify-center font-black text-xl text-amber-400">
              {countdown}s
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-4 h-4 fill-current" />
                Sponsor Video Ad Playing
              </div>
              <p className="text-xs text-slate-300">
                Playing sponsor video ad... Reward will unlock automatically in <span className="text-amber-400 font-black">{countdown} seconds</span>.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">Reward Claimed!</h3>
              <p className="text-xs text-slate-300 mt-1">
                {rewardType === 'RESPIN' ? '+3 Re-spin Tokens added to your inventory!' : '+100 Coins added to your bank!'}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm shadow-lg hover:bg-emerald-400 transition"
            >
              Continue Playing
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
