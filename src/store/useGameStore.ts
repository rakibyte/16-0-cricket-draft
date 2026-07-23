import { create } from 'zustand';
import type { 
  LeagueMode, 
  DifficultyMode, 
  AppView,
  SquadSlot, 
  Team, 
  Player, 
  MatchSummary, 
  SeasonState, 
  UserStats, 
  Achievement, 
  LeaderboardEntry,
  RunHistoryEntry,
  UserAccount,
  MultiplayerRoom,
  MultiplayerPlayer
} from '../types/game';
import { INITIAL_SQUAD_SLOTS } from '../data/slotsConfig';
import { IPL_TEAMS, BBL_TEAMS, WORLD_CRICKET_TEAMS, ALL_TIME_TEAMS } from '../data/mockTeams';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { simulateMatch, generateTournamentStructure } from '../utils/simEngine';
import { calculateSquadChemistry } from '../utils/chemistry';

interface GameStore {
  // Config & View State
  currentView: AppView;
  leagueMode: LeagueMode;
  difficultyMode: DifficultyMode;
  selectedAllTimeFranchise: string | null;
  username: string;
  userAccount: UserAccount;
  slots: SquadSlot[];
  respinTokens: number;
  availableTeams: Team[];
  spunTeam: Team | null;
  activePickerSlotId: number | null;
  isAuthModalOpen: boolean;
  isAdModalOpen: boolean;
  isShareModalOpen: boolean;
  isTrophyModalOpen: boolean;
  isLeaderboardModalOpen: boolean;
  isProfileModalOpen: boolean;
  isMultiplayerModalOpen: boolean;
  activeMatchSummary: MatchSummary | null;
  seasonState: SeasonState;
  lastSubmittedLeaderboardId: string | null;
  multiplayerRoom: MultiplayerRoom | null;

  // Global Player Unique Constraint
  draftedPlayerNames: string[];

  // Meta & Economy
  coins: number;
  userStats: UserStats;
  achievements: Achievement[];
  leaderboardEntries: LeaderboardEntry[];
  runHistory: RunHistoryEntry[];

  // Actions
  setCurrentView: (view: AppView) => void;
  setLeagueMode: (mode: LeagueMode) => void;
  setSelectedAllTimeFranchise: (franchiseId: string | null) => void;
  setDifficultyMode: (mode: DifficultyMode) => void;
  setUsername: (name: string) => void;
  registerAccount: (email: string, username: string, password?: string) => void;
  loginAccount: (email: string, password?: string) => boolean;
  setSpunTeam: (team: Team | null) => void;
  openPlayerPicker: (slotId: number) => void;
  closePlayerPicker: () => void;
  assignPlayerToSlot: (slotId: number, player: Player, fromTeamName: string) => void;
  removePlayerFromSlot: (slotId: number) => void;
  resetDraft: () => void;
  useRespinToken: () => boolean;
  grantRespinTokens: (count: number) => void;
  addCoins: (amount: number) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsAdModalOpen: (open: boolean) => void;
  setIsShareModalOpen: (open: boolean) => void;
  setIsTrophyModalOpen: (open: boolean) => void;
  setIsLeaderboardModalOpen: (open: boolean) => void;
  setIsProfileModalOpen: (open: boolean) => void;
  setIsMultiplayerModalOpen: (open: boolean) => void;
  setActiveMatchSummary: (match: MatchSummary | null) => void;
  runNextMatch: () => MatchSummary | null;
  simulateFullSeason: () => void;
  restartSeason: () => void;
  claimAchievementReward: (id: string) => void;
  submitToLeaderboard: () => void;

  // Multiplayer Actions
  createMultiplayerRoom: (leagueMode: LeagueMode, maxPlayers: number, timerSeconds: number) => void;
  joinMultiplayerRoom: (roomCode: string) => void;
  leaveMultiplayerRoom: () => void;
  toggleMultiplayerReady: () => void;
  startMultiplayerDraft: () => void;
  syncMultiplayerSimResult: (wins: number, squadOvr: number, chemistry: number, isChamp: boolean) => void;
}

export const getTeamsByMode = (mode: LeagueMode, selectedFranchiseId?: string | null): Team[] => {
  if (mode === 'ALL_TIME_XI') {
    if (selectedFranchiseId) {
      const allPool = [...IPL_TEAMS, ...BBL_TEAMS, ...WORLD_CRICKET_TEAMS, ...ALL_TIME_TEAMS];
      const matchKey = selectedFranchiseId.toLowerCase();
      
      const filtered = allPool.filter((t) => {
        const teamId = t.id.toLowerCase();
        const shortCode = t.shortCode.toLowerCase();
        const teamName = t.name.toLowerCase();

        return (
          teamId.includes(matchKey) ||
          shortCode.includes(matchKey) ||
          teamName.includes(matchKey)
        );
      });

      if (filtered.length > 0) return filtered;
    }
    return ALL_TIME_TEAMS;
  }

  switch (mode) {
    case 'IPL':
      return IPL_TEAMS;
    case 'BBL':
      return BBL_TEAMS;
    case 'WORLD_CRICKET':
      return WORLD_CRICKET_TEAMS;
    default:
      return IPL_TEAMS;
  }
};

const SAVED_COINS_KEY = '16_0_coins_bank';
const SAVED_STATS_KEY = '16_0_user_stats';
const SAVED_ACCOUNT_KEY = '16_0_user_account';
const SAVED_LEADERBOARD_KEY = '16_0_leaderboard';
const SAVED_RUN_HISTORY_KEY = '16_0_run_history';

const INITIAL_MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb-1',
    username: 'CricketKing99',
    leagueMode: 'IPL',
    wins: 16,
    losses: 0,
    squadOvr: 97,
    chemistry: 100,
    isChampion: true,
    score: 3570,
    draftedPlayers: ['MS Dhoni', 'Virat Kohli', 'Jasprit Bumrah', 'Sachin Tendulkar', 'AB de Villiers'],
    createdAt: '2026-07-20',
  },
  {
    id: 'lb-2',
    username: 'SpinWizard_AU',
    leagueMode: 'BBL',
    wins: 15,
    losses: 1,
    squadOvr: 94,
    chemistry: 95,
    isChampion: true,
    score: 3415,
    draftedPlayers: ['Shane Warne', 'Glenn Maxwell', 'Travis Head', 'Rashid Khan', 'Adam Gilchrist'],
    createdAt: '2026-07-21',
  },
  {
    id: 'lb-3',
    username: 'Hitman_45',
    leagueMode: 'IPL',
    wins: 14,
    losses: 2,
    squadOvr: 95,
    chemistry: 90,
    isChampion: true,
    score: 3300,
    draftedPlayers: ['Rohit Sharma', 'Hardik Pandya', 'Suryakumar Yadav', 'Sunil Narine', 'Kieron Pollard'],
    createdAt: '2026-07-22',
  },
];

const loadCoins = (): number => {
  if (typeof window === 'undefined') return 250;
  const saved = localStorage.getItem(SAVED_COINS_KEY);
  return saved ? parseInt(saved, 10) : 250;
};

const loadStats = (): UserStats => {
  if (typeof window === 'undefined') return { bestStreak: 0, totalSeasonsPlayed: 0, highestTeamOvr: 0, totalWins: 0, totalLosses: 0, leagueTitlesWon: 0 };
  const saved = localStorage.getItem(SAVED_STATS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback
    }
  }
  return { bestStreak: 0, totalSeasonsPlayed: 0, highestTeamOvr: 0, totalWins: 0, totalLosses: 0, leagueTitlesWon: 0 };
};

const loadAccount = (): UserAccount => {
  if (typeof window === 'undefined') return { email: null, username: 'CricketGamer', isRegistered: false, guestSeasonsPlayed: 0 };
  const saved = localStorage.getItem(SAVED_ACCOUNT_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback
    }
  }
  return { email: null, username: 'CricketGamer', isRegistered: false, guestSeasonsPlayed: 0 };
};

const loadLeaderboard = (): LeaderboardEntry[] => {
  if (typeof window === 'undefined') return INITIAL_MOCK_LEADERBOARD;
  const saved = localStorage.getItem(SAVED_LEADERBOARD_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback
    }
  }
  return INITIAL_MOCK_LEADERBOARD;
};

const loadRunHistory = (): RunHistoryEntry[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(SAVED_RUN_HISTORY_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback
    }
  }
  return [];
};

export const useGameStore = create<GameStore>((set, get) => {
  const initialAccount = loadAccount();

  return {
    currentView: 'HOME',
    leagueMode: 'IPL',
    difficultyMode: 'EASY',
    selectedAllTimeFranchise: null,
    username: initialAccount.username,
    userAccount: initialAccount,
    slots: INITIAL_SQUAD_SLOTS,
    respinTokens: 3,
    availableTeams: IPL_TEAMS,
    spunTeam: null,
    activePickerSlotId: null,
    isAuthModalOpen: false,
    isAdModalOpen: false,
    isShareModalOpen: false,
    isTrophyModalOpen: false,
    isLeaderboardModalOpen: false,
    isProfileModalOpen: false,
    isMultiplayerModalOpen: false,
    activeMatchSummary: null,
    lastSubmittedLeaderboardId: null,
    multiplayerRoom: null,
    draftedPlayerNames: [],
    coins: loadCoins(),
    userStats: loadStats(),
    achievements: INITIAL_ACHIEVEMENTS,
    leaderboardEntries: loadLeaderboard(),
    runHistory: loadRunHistory(),

    seasonState: {
      currentMatchIndex: 0,
      matches: [],
      wins: 0,
      losses: 0,
      ties: 0,
      isCompleted: false,
      isFlawless: false,
      hasSubmittedLeaderboard: false,
    },

    setCurrentView: (view) => set({ currentView: view }),

    setLeagueMode: (mode) => {
      const teams = getTeamsByMode(mode, null);
      set({
        leagueMode: mode,
        selectedAllTimeFranchise: null,
        availableTeams: teams,
        spunTeam: null,
        slots: INITIAL_SQUAD_SLOTS,
        draftedPlayerNames: [],
        seasonState: {
          currentMatchIndex: 0,
          matches: [],
          wins: 0,
          losses: 0,
          ties: 0,
          isCompleted: false,
          isFlawless: false,
          hasSubmittedLeaderboard: false,
        }
      });
    },

    setSelectedAllTimeFranchise: (franchiseId) => {
      const { leagueMode } = get();
      const teams = getTeamsByMode(leagueMode, franchiseId);
      set({
        selectedAllTimeFranchise: franchiseId,
        availableTeams: teams,
        spunTeam: null,
      });
    },

    setDifficultyMode: (mode) => set({ difficultyMode: mode }),

    setUsername: (name) => {
      const { userAccount } = get();
      const updated = { ...userAccount, username: name };
      localStorage.setItem(SAVED_ACCOUNT_KEY, JSON.stringify(updated));
      set({ username: name, userAccount: updated });
    },

    registerAccount: (email, username, _password) => {
      const { userAccount } = get();
      const updatedAccount: UserAccount = {
        ...userAccount,
        email,
        username,
        isRegistered: true,
      };
      localStorage.setItem(SAVED_ACCOUNT_KEY, JSON.stringify(updatedAccount));
      set({ userAccount: updatedAccount, username });
    },

    loginAccount: (email, _password) => {
      const { userAccount } = get();
      const updatedAccount: UserAccount = {
        ...userAccount,
        email,
        username: email.split('@')[0] || userAccount.username,
        isRegistered: true,
      };
      localStorage.setItem(SAVED_ACCOUNT_KEY, JSON.stringify(updatedAccount));
      set({ userAccount: updatedAccount, username: updatedAccount.username });
      return true;
    },

    setSpunTeam: (team) => {
      const { slots, openPlayerPicker } = get();
      set({ spunTeam: team });

      if (team) {
        const firstEmptySlot = slots.find((s) => s.assignedPlayer === null);
        if (firstEmptySlot) {
          openPlayerPicker(firstEmptySlot.id);
        }
      }
    },

    openPlayerPicker: (slotId) => set({ activePickerSlotId: slotId }),
    closePlayerPicker: () => set({ activePickerSlotId: null }),

    assignPlayerToSlot: (slotId, player, fromTeamName) => {
      const { draftedPlayerNames, slots, userStats } = get();
      const normName = player.name.toLowerCase().trim();
      
      const updatedDrafted = [...draftedPlayerNames, normName];

      const nextSlots = slots.map((s) =>
        s.id === slotId ? { ...s, assignedPlayer: player, assignedFromTeam: fromTeamName } : s
      );

      const { effectiveSquadRating } = calculateSquadChemistry(nextSlots);
      const newHighestOvr = Math.max(userStats.highestTeamOvr, effectiveSquadRating);

      const updatedStats = { ...userStats, highestTeamOvr: newHighestOvr };
      localStorage.setItem(SAVED_STATS_KEY, JSON.stringify(updatedStats));

      set({
        slots: nextSlots,
        draftedPlayerNames: updatedDrafted,
        spunTeam: null,
        activePickerSlotId: null,
        userStats: updatedStats,
      });
    },

    removePlayerFromSlot: (slotId) => {
      const { slots, draftedPlayerNames } = get();
      const slotToRemove = slots.find((s) => s.id === slotId);
      const playerToRemove = slotToRemove?.assignedPlayer;

      const normName = playerToRemove?.name.toLowerCase().trim();

      const nextDrafted = normName
        ? draftedPlayerNames.filter((n) => n !== normName)
        : draftedPlayerNames;

      set({
        slots: slots.map((s) =>
          s.id === slotId ? { ...s, assignedPlayer: null, assignedFromTeam: undefined } : s
        ),
        draftedPlayerNames: nextDrafted,
      });
    },

    resetDraft: () => {
      const { userAccount, setIsAuthModalOpen } = get();
      
      if (!userAccount.isRegistered && userAccount.guestSeasonsPlayed >= 2) {
        setIsAuthModalOpen(true);
        return;
      }

      set({
        slots: INITIAL_SQUAD_SLOTS,
        spunTeam: null,
        draftedPlayerNames: [],
        seasonState: {
          currentMatchIndex: 0,
          matches: [],
          wins: 0,
          losses: 0,
          ties: 0,
          isCompleted: false,
          isFlawless: false,
          hasSubmittedLeaderboard: false,
        }
      });
    },

    useRespinToken: () => {
      const { respinTokens } = get();
      if (respinTokens <= 0) return false;
      set({ respinTokens: respinTokens - 1 });
      return true;
    },

    grantRespinTokens: (count) => {
      set((state) => ({ respinTokens: state.respinTokens + count }));
    },

    addCoins: (amount) => {
      const { coins } = get();
      const nextCoins = coins + amount;
      localStorage.setItem(SAVED_COINS_KEY, nextCoins.toString());
      set({ coins: nextCoins });
    },

    setIsAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
    setIsAdModalOpen: (open) => set({ isAdModalOpen: open }),
    setIsShareModalOpen: (open) => set({ isShareModalOpen: open }),
    setIsTrophyModalOpen: (open) => set({ isTrophyModalOpen: open }),
    setIsLeaderboardModalOpen: (open) => set({ isLeaderboardModalOpen: open }),
    setIsProfileModalOpen: (open) => set({ isProfileModalOpen: open }),
    setIsMultiplayerModalOpen: (open) => set({ isMultiplayerModalOpen: open }),
    setActiveMatchSummary: (match) => set({ activeMatchSummary: match }),

    syncMultiplayerSimResult: (wins, squadOvr, chemistry, isChamp) => {
      const { multiplayerRoom, username } = get();
      if (!multiplayerRoom) return;

      const userScore = wins * 100 + squadOvr * 10 + chemistry * 5 + (isChamp ? 500 : 0);

      const updatedPlayers = multiplayerRoom.players.map((p) => {
        if (p.username === username) {
          return {
            ...p,
            hasFinishedSim: true,
            hasFinishedDraft: true,
            wins,
            squadOvr,
            score: userScore,
            isChampion: isChamp,
          };
        }
        return p;
      });

      set({
        multiplayerRoom: {
          ...multiplayerRoom,
          status: 'REVEAL',
          players: updatedPlayers,
        },
      });
    },

    runNextMatch: () => {
      const { seasonState, slots, userStats, addCoins, leagueMode, runHistory, userAccount, setIsAuthModalOpen, syncMultiplayerSimResult } = get();
      if (seasonState.currentMatchIndex >= 16 || seasonState.isCompleted) return null;

      const matchIndex = seasonState.currentMatchIndex + 1;
      const match = simulateMatch(matchIndex, slots);

      const newWins = seasonState.wins + (match.result === 'WIN' ? 1 : 0);
      const newLosses = seasonState.losses + (match.result === 'LOSS' ? 1 : 0);
      const newTies = seasonState.ties + (match.result === 'TIE' ? 1 : 0);
      const isCompleted = matchIndex === 16;
      const isFlawless = isCompleted && newWins === 16;

      if (match.result === 'WIN') {
        addCoins(25);
      }

      let tournamentResult = seasonState.tournamentResult;

      if (isCompleted) {
        const allMatches = [...seasonState.matches, match];
        tournamentResult = generateTournamentStructure(allMatches);

        const bonus = isFlawless ? 500 : newWins * 20;
        addCoins(bonus);

        const newBestStreak = Math.max(userStats.bestStreak, newWins);
        const newStats: UserStats = {
          ...userStats,
          bestStreak: newBestStreak,
          totalSeasonsPlayed: userStats.totalSeasonsPlayed + 1,
          totalWins: userStats.totalWins + newWins,
          totalLosses: userStats.totalLosses + newLosses,
          leagueTitlesWon: userStats.leagueTitlesWon + (tournamentResult.isChampion ? 1 : 0),
        };
        localStorage.setItem(SAVED_STATS_KEY, JSON.stringify(newStats));

        const nextGuestCount = userAccount.guestSeasonsPlayed + 1;
        const updatedAccount = { ...userAccount, guestSeasonsPlayed: nextGuestCount };
        localStorage.setItem(SAVED_ACCOUNT_KEY, JSON.stringify(updatedAccount));

        const { chemistryScore, effectiveSquadRating } = calculateSquadChemistry(slots);
        const runEntry: RunHistoryEntry = {
          id: `run-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          leagueMode,
          wins: newWins,
          losses: newLosses,
          ties: newTies,
          squadOvr: effectiveSquadRating,
          chemistry: chemistryScore,
          isChampion: tournamentResult.isChampion,
          isFlawless,
          squadNames: slots.map((s) => s.assignedPlayer?.name || 'Empty'),
        };

        const updatedHistory = [runEntry, ...runHistory];
        localStorage.setItem(SAVED_RUN_HISTORY_KEY, JSON.stringify(updatedHistory));

        set({ userStats: newStats, userAccount: updatedAccount, runHistory: updatedHistory });

        syncMultiplayerSimResult(newWins, effectiveSquadRating, chemistryScore, tournamentResult.isChampion);

        if (!userAccount.isRegistered && nextGuestCount >= 2) {
          setIsAuthModalOpen(true);
        }
      }

      const nextState: SeasonState = {
        ...seasonState,
        currentMatchIndex: matchIndex,
        matches: [...seasonState.matches, match],
        wins: newWins,
        losses: newLosses,
        ties: newTies,
        isCompleted,
        isFlawless,
        tournamentResult,
      };

      set({
        seasonState: nextState,
        activeMatchSummary: match,
      });

      return match;
    },

    simulateFullSeason: () => {
      const { slots, userStats, addCoins, leagueMode, runHistory, userAccount, setIsAuthModalOpen, syncMultiplayerSimResult } = get();
      let wins = 0;
      let losses = 0;
      let ties = 0;
      const matches: MatchSummary[] = [];

      for (let i = 1; i <= 16; i++) {
        const match = simulateMatch(i, slots);
        matches.push(match);
        if (match.result === 'WIN') wins++;
        else if (match.result === 'LOSS') losses++;
        else ties++;
      }

      const isFlawless = wins === 16;
      const tournamentResult = generateTournamentStructure(matches);

      const earnedCoins = wins * 25 + (isFlawless ? 500 : wins * 15);
      addCoins(earnedCoins);

      const newBestStreak = Math.max(userStats.bestStreak, wins);
      const newStats: UserStats = {
        ...userStats,
        bestStreak: newBestStreak,
        totalSeasonsPlayed: userStats.totalSeasonsPlayed + 1,
        totalWins: userStats.totalWins + wins,
        totalLosses: userStats.totalLosses + losses,
        leagueTitlesWon: userStats.leagueTitlesWon + (tournamentResult.isChampion ? 1 : 0),
      };
      localStorage.setItem(SAVED_STATS_KEY, JSON.stringify(newStats));

      const nextGuestCount = userAccount.guestSeasonsPlayed + 1;
      const updatedAccount = { ...userAccount, guestSeasonsPlayed: nextGuestCount };
      localStorage.setItem(SAVED_ACCOUNT_KEY, JSON.stringify(updatedAccount));

      const { chemistryScore, effectiveSquadRating } = calculateSquadChemistry(slots);
      const runEntry: RunHistoryEntry = {
        id: `run-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        leagueMode,
        wins,
        losses,
        ties,
        squadOvr: effectiveSquadRating,
        chemistry: chemistryScore,
        isChampion: tournamentResult.isChampion,
        isFlawless,
        squadNames: slots.map((s) => s.assignedPlayer?.name || 'Empty'),
      };

      const updatedHistory = [runEntry, ...runHistory];
      localStorage.setItem(SAVED_RUN_HISTORY_KEY, JSON.stringify(updatedHistory));

      set({
        seasonState: {
          currentMatchIndex: 16,
          matches,
          wins,
          losses,
          ties,
          isCompleted: true,
          isFlawless,
          tournamentResult,
          hasSubmittedLeaderboard: false,
        },
        userStats: newStats,
        userAccount: updatedAccount,
        runHistory: updatedHistory,
        isShareModalOpen: true,
      });

      syncMultiplayerSimResult(wins, effectiveSquadRating, chemistryScore, tournamentResult.isChampion);

      if (!userAccount.isRegistered && nextGuestCount >= 2) {
        setIsAuthModalOpen(true);
      }
    },

    restartSeason: () => set({
      slots: INITIAL_SQUAD_SLOTS,
      spunTeam: null,
      draftedPlayerNames: [],
      seasonState: {
        currentMatchIndex: 0,
        matches: [],
        wins: 0,
        losses: 0,
        ties: 0,
        isCompleted: false,
        isFlawless: false,
        hasSubmittedLeaderboard: false,
      }
    }),

    claimAchievementReward: (id) => {
      const { achievements, addCoins } = get();
      const target = achievements.find((a) => a.id === id);
      if (target && !target.isUnlocked) {
        addCoins(target.rewardCoins);
        set({
          achievements: achievements.map((a) => (a.id === id ? { ...a, isUnlocked: true } : a)),
        });
      }
    },

    submitToLeaderboard: () => {
      const { username, seasonState, slots, leagueMode, leaderboardEntries, lastSubmittedLeaderboardId, multiplayerRoom } = get();
      
      if (seasonState.hasSubmittedLeaderboard && lastSubmittedLeaderboardId) {
        set({ isLeaderboardModalOpen: true });
        return;
      }

      const { chemistryScore, effectiveSquadRating } = calculateSquadChemistry(slots);

      const playerNames = slots.map((s) => s.assignedPlayer?.name || 'Empty Slot');
      const isChamp = seasonState.tournamentResult?.isChampion || false;

      const score = seasonState.wins * 100 + effectiveSquadRating * 10 + chemistryScore * 5 + (isChamp ? 500 : 0);
      const entryId = `lb-${Date.now()}`;

      const newEntry: LeaderboardEntry = {
        id: entryId,
        username: username || 'CricketFan',
        leagueMode,
        wins: seasonState.wins,
        losses: seasonState.losses,
        squadOvr: effectiveSquadRating,
        chemistry: chemistryScore,
        isChampion: isChamp,
        score,
        draftedPlayers: playerNames,
        createdAt: new Date().toISOString().split('T')[0],
      };

      const updatedList = [...leaderboardEntries, newEntry].sort((a, b) => b.score - a.score);
      localStorage.setItem(SAVED_LEADERBOARD_KEY, JSON.stringify(updatedList));

      let updatedRoom = multiplayerRoom;
      if (multiplayerRoom) {
        const updatedPlayers = multiplayerRoom.players.map((p) => {
          if (p.username === username) {
            return {
              ...p,
              hasFinishedSim: true,
              wins: seasonState.wins,
              squadOvr: effectiveSquadRating,
              score,
              isChampion: isChamp,
            };
          }
          return p;
        });

        updatedRoom = {
          ...multiplayerRoom,
          status: 'REVEAL',
          players: updatedPlayers,
        };
      }

      set({ 
        leaderboardEntries: updatedList,
        lastSubmittedLeaderboardId: entryId,
        multiplayerRoom: updatedRoom,
        isLeaderboardModalOpen: true,
        seasonState: {
          ...seasonState,
          hasSubmittedLeaderboard: true,
        }
      });
    },

    createMultiplayerRoom: (mode, maxPlayers, timerSeconds) => {
      const { username } = get();
      const code = `CRIC-${Math.floor(1000 + Math.random() * 9000)}`;

      const hostPlayer: MultiplayerPlayer = {
        id: `mp-${Date.now()}`,
        username,
        isHost: true,
        isReady: true,
        hasFinishedDraft: false,
        hasFinishedSim: false,
      };

      const aiRivals: MultiplayerPlayer[] = [
        { id: 'mp-ai-1', username: 'Hitman_45', isHost: false, isReady: true, hasFinishedDraft: false, hasFinishedSim: true, wins: 14, squadOvr: 91, score: 3100 },
        { id: 'mp-ai-2', username: 'SpinWizard_AU', isHost: false, isReady: true, hasFinishedDraft: false, hasFinishedSim: true, wins: 12, squadOvr: 89, score: 2850 },
      ].slice(0, maxPlayers - 1);

      const room: MultiplayerRoom = {
        roomCode: code,
        hostUsername: username,
        leagueMode: mode,
        status: 'LOBBY',
        timerSeconds,
        maxPlayers,
        players: [hostPlayer, ...aiRivals],
      };

      set({ multiplayerRoom: room, leagueMode: mode });
    },

    joinMultiplayerRoom: (roomCode) => {
      const { username } = get();
      const player: MultiplayerPlayer = {
        id: `mp-${Date.now()}`,
        username,
        isHost: false,
        isReady: true,
        hasFinishedDraft: false,
        hasFinishedSim: false,
      };

      const room: MultiplayerRoom = {
        roomCode,
        hostUsername: 'LobbyHost_XI',
        leagueMode: 'IPL',
        status: 'LOBBY',
        timerSeconds: 180,
        maxPlayers: 4,
        players: [
          { id: 'mp-host', username: 'LobbyHost_XI', isHost: true, isReady: true, hasFinishedDraft: true, hasFinishedSim: true, wins: 13, squadOvr: 90, score: 2950 },
          player,
          { id: 'mp-ai-3', username: 'CricketPro_99', isHost: false, isReady: true, hasFinishedDraft: true, hasFinishedSim: true, wins: 11, squadOvr: 87, score: 2600 },
        ],
      };

      set({ multiplayerRoom: room });
    },

    leaveMultiplayerRoom: () => set({ multiplayerRoom: null }),

    toggleMultiplayerReady: () => {
      const { multiplayerRoom, username } = get();
      if (!multiplayerRoom) return;

      const updated = multiplayerRoom.players.map((p) =>
        p.username === username ? { ...p, isReady: !p.isReady } : p
      );

      set({
        multiplayerRoom: { ...multiplayerRoom, players: updated },
      });
    },

    startMultiplayerDraft: () => {
      const { multiplayerRoom, setLeagueMode } = get();
      if (!multiplayerRoom) return;

      setLeagueMode(multiplayerRoom.leagueMode);

      set({
        multiplayerRoom: {
          ...multiplayerRoom,
          status: 'DRAFTING',
        },
      });
    },
  };
});
