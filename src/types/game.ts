export type LeagueMode = 'IPL' | 'BBL' | 'WORLD_CRICKET' | 'ALL_TIME_XI';
export type DifficultyMode = 'EASY' | 'HARD';
export type AppView = 'HOME' | 'DRAFT';

export type PlayerRole = 
  | 'OPENER'
  | 'MIDDLE_ORDER'
  | 'WICKETKEEPER'
  | 'SPIN_ALLROUNDER'
  | 'PACE_ALLROUNDER'
  | 'FRONTLINE_SPINNER'
  | 'FAST_BOWLER';

export interface Player {
  id: string;
  name: string;
  primaryRole: PlayerRole;
  secondaryRole?: PlayerRole;
  battingRating: number;   // 30 - 99
  bowlingRating: number;   // 30 - 99
  fieldingRating: number;  // 30 - 99
  overallRating: number;   // 30 - 99
  stars: number;           // 1 - 5
  isLegend?: boolean;
  imageUrl?: string;
  countryOrFranchise: string;
}

export interface Team {
  id: string;
  leagueMode: LeagueMode;
  name: string;
  year: number;
  shortCode: string;
  era: string;
  primaryColor: string;
  secondaryColor: string;
  badgeSymbol: string;
  overallRating: number;
  roster: Player[];
}

export interface AllTimeFranchise {
  id: string;
  name: string;
  type: 'CLUB' | 'COUNTRY';
  shortCode: string;
  primaryColor: string;
  badgeSymbol: string;
  eraRange: string;
  description: string;
}

export interface SquadSlot {
  id: number;              // 1 to 11
  slotName: string;        // e.g., "Opener #1", "Wicketkeeper", "Fast Bowler #1"
  requiredRole: PlayerRole;
  assignedPlayer: Player | null;
  assignedFromTeam?: string;
}

export type MatchOutcome = 'WIN' | 'LOSS' | 'TIE';

export interface MatchSummary {
  matchIndex: number;      // 1 to 16
  isPlayoff: boolean;      // True for matches 15 and 16
  opponentName: string;
  userScore: string;       // e.g. "185/4 (20.0)"
  opponentScore: string;   // e.g. "162/9 (20.0)"
  result: MatchOutcome;
  margin: string;          // e.g. "Won by 23 runs"
  mom: string;             // Man of the Match
}

export interface PointsTableEntry {
  rank: number;
  teamName: string;
  p: number;
  w: number;
  l: number;
  t: number;
  nrr: number;
  pts: number;
  isUser: boolean;
}

export interface PlayoffMatch {
  stageName: 'Qualifier 1' | 'Eliminator' | 'Qualifier 2' | 'Grand Final';
  team1: string;
  team2: string;
  winner: string;
  scoreText: string;
  isUserMatch: boolean;
}

export interface TournamentResult {
  pointsTable: PointsTableEntry[];
  playoffMatches: PlayoffMatch[];
  userFinalRank: number;
  isChampion: boolean;
}

export interface SeasonState {
  currentMatchIndex: number; // 0 to 16 (14 league + 2 playoffs)
  matches: MatchSummary[];
  wins: number;
  losses: number;
  ties: number;
  isCompleted: boolean;
  isFlawless: boolean;       // 16-0 achieved!
  tournamentResult?: TournamentResult;
  hasSubmittedLeaderboard?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rewardCoins: number;
  badgeIcon: string;
  isUnlocked: boolean;
}

export interface RunHistoryEntry {
  id: string;
  date: string;
  leagueMode: LeagueMode;
  wins: number;
  losses: number;
  ties: number;
  squadOvr: number;
  chemistry: number;
  isChampion: boolean;
  isFlawless: boolean;
  squadNames: string[];
}

export interface UserStats {
  bestStreak: number;
  totalSeasonsPlayed: number;
  highestTeamOvr: number;
  totalWins: number;
  totalLosses: number;
  leagueTitlesWon: number;
}

export interface UserAccount {
  email: string | null;
  username: string;
  isRegistered: boolean;
  guestSeasonsPlayed: number;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  leagueMode: LeagueMode;
  wins: number;
  losses: number;
  squadOvr: number;
  chemistry: number;
  isChampion: boolean;
  score: number;
  draftedPlayers: string[]; // List of player names
  createdAt: string;
}

export interface MultiplayerPlayer {
  id: string;
  username: string;
  isHost: boolean;
  isReady: boolean;
  hasFinishedDraft: boolean;
  hasFinishedSim: boolean;
  wins?: number;
  squadOvr?: number;
  score?: number;
  rank?: number;
  isChampion?: boolean;
  draftedSquad?: string[];
}

export interface MultiplayerRoom {
  roomCode: string;
  hostUsername: string;
  leagueMode: LeagueMode;
  status: 'LOBBY' | 'DRAFTING' | 'SIMULATING' | 'REVEAL';
  timerSeconds: number; // 180s = 3 minutes
  maxPlayers: number;
  players: MultiplayerPlayer[];
}
