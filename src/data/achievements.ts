import type { Achievement } from '../types/game';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_draft',
    title: 'First XI Drafted',
    description: 'Complete your very first 11-player squad draft.',
    rewardCoins: 150,
    badgeIcon: '🏏',
    isUnlocked: false,
  },
  {
    id: 'ovr_90',
    title: 'Superstar Squad',
    description: 'Build a squad with 90+ overall team rating.',
    rewardCoins: 250,
    badgeIcon: '⭐',
    isUnlocked: false,
  },
  {
    id: 'ovr_95',
    title: 'Legendary XI',
    description: 'Build an elite squad with 95+ overall team rating.',
    rewardCoins: 500,
    badgeIcon: '👑',
    isUnlocked: false,
  },
  {
    id: 'win_season',
    title: 'Campaign Winner',
    description: 'Win 10 or more games in a single 16-game campaign.',
    rewardCoins: 300,
    badgeIcon: '🏆',
    isUnlocked: false,
  },
  {
    id: 'flawless_16_0',
    title: 'Undefeated 16-0!',
    description: 'Go completely undefeated 16-0 in a single campaign.',
    rewardCoins: 1000,
    badgeIcon: '🔥',
    isUnlocked: false,
  },
  {
    id: 'synergy_master',
    title: 'Synergy Master',
    description: 'Draft 3 or more players from the exact same franchise.',
    rewardCoins: 200,
    badgeIcon: '🌀',
    isUnlocked: false,
  },
];
