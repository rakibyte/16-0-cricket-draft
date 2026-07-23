import React from 'react';
import { Modal } from '../common/Modal';
import { useGameStore } from '../../store/useGameStore';
import { Coins, CheckCircle } from 'lucide-react';
import { playCoinClaimSound } from '../../utils/soundEngine';

export const TrophyCabinetModal: React.FC = () => {
  const {
    isTrophyModalOpen,
    setIsTrophyModalOpen,
    achievements,
    claimAchievementReward,
    userStats,
  } = useGameStore();

  if (!isTrophyModalOpen) return null;

  return (
    <Modal
      isOpen={isTrophyModalOpen}
      onClose={() => setIsTrophyModalOpen(false)}
      title="Trophy Cabinet & Lifetime Achievements"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Stats Summary Banner */}
        <div className="grid grid-cols-3 gap-2 bg-slate-900 p-3 rounded-2xl border border-slate-800 text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">BEST STREAK</span>
            <span className="text-base font-black text-emerald-400">{userStats.bestStreak} Wins</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">SEASONS PLAYED</span>
            <span className="text-base font-black text-cyan-300">{userStats.totalSeasonsPlayed}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase">HIGHEST OVR</span>
            <span className="text-base font-black text-amber-400">{userStats.highestTeamOvr} OVR</span>
          </div>
        </div>

        {/* Achievements List */}
        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {achievements.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                item.isUnlocked
                  ? 'bg-slate-900/90 border-emerald-500/50'
                  : 'bg-slate-950/60 border-slate-800 opacity-80'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.badgeIcon}</span>
                <div>
                  <h5 className="font-extrabold text-sm text-white">{item.title}</h5>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              </div>

              <div>
                {item.isUnlocked ? (
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Claimed
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      claimAchievementReward(item.id);
                      playCoinClaimSound();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-1 shadow-md hover:brightness-110 transition"
                  >
                    <Coins className="w-3.5 h-3.5 fill-current" />
                    +{item.rewardCoins}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
