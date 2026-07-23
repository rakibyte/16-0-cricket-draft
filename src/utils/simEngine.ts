import type { MatchSummary, MatchOutcome, SquadSlot, PointsTableEntry, PlayoffMatch, TournamentResult } from '../types/game';
import { calculateSquadChemistry } from './chemistry';

const OPPONENT_NAMES = [
  'Chennai Super Kings XI',
  'Mumbai Indians All-Stars',
  'Royal Challengers Bangalore',
  'Perth Scorchers XI',
  'Sydney Sixers XI',
  'Kolkata Knight Riders',
  'Sunrisers Hyderabad',
  'Rajasthan Royals XI',
];

export const simulateMatch = (
  matchIndex: number, // 1 to 16
  slots: SquadSlot[]
): MatchSummary => {
  const isPlayoff = matchIndex >= 15;
  const opponentName = OPPONENT_NAMES[(matchIndex - 1) % OPPONENT_NAMES.length];

  const { chemistryScore, effectiveSquadRating } = calculateSquadChemistry(slots);

  // Player Win Chance: Tuned so user XI wins ~80-88% of league games!
  // In 38-0 / 16-0, players consistently win the league and qualify for playoffs!
  const baseWinChance = 0.78 + (effectiveSquadRating - 85) * 0.015 + (chemistryScore - 80) * 0.005;
  const winChance = Math.max(0.65, Math.min(0.94, baseWinChance));

  const roll = Math.random();

  let result: MatchOutcome;
  if (roll < winChance) {
    result = 'WIN';
  } else if (roll < winChance + 0.03) {
    result = 'TIE';
  } else {
    result = 'LOSS';
  }

  // Generate scores
  const isUserBattingFirst = Math.random() > 0.5;
  let userRuns: number;
  let opponentRuns: number;
  let userWickets: number;
  let opponentWickets: number;
  let margin: string;

  if (result === 'WIN') {
    if (isUserBattingFirst) {
      userRuns = Math.floor(180 + Math.random() * 40);
      userWickets = Math.floor(3 + Math.random() * 3);
      const runDiff = Math.floor(15 + Math.random() * 40);
      opponentRuns = Math.max(110, userRuns - runDiff);
      opponentWickets = Math.floor(8 + Math.random() * 3);
      margin = `Won by ${runDiff} runs`;
    } else {
      opponentRuns = Math.floor(160 + Math.random() * 30);
      opponentWickets = Math.floor(6 + Math.random() * 4);
      userRuns = opponentRuns + Math.floor(2 + Math.random() * 4);
      userWickets = Math.floor(2 + Math.random() * 4);
      const wktsLeft = 10 - userWickets;
      const oversLeft = (Math.random() * 2.5 + 0.5).toFixed(1);
      margin = `Won by ${wktsLeft} wickets (${oversLeft} ov left)`;
    }
  } else if (result === 'LOSS') {
    if (isUserBattingFirst) {
      userRuns = Math.floor(150 + Math.random() * 30);
      userWickets = Math.floor(6 + Math.random() * 3);
      opponentRuns = userRuns + Math.floor(2 + Math.random() * 4);
      opponentWickets = Math.floor(4 + Math.random() * 4);
      const wktsLeft = 10 - opponentWickets;
      margin = `Lost by ${wktsLeft} wickets`;
    } else {
      opponentRuns = Math.floor(185 + Math.random() * 30);
      opponentWickets = Math.floor(4 + Math.random() * 4);
      const runDiff = Math.floor(8 + Math.random() * 25);
      userRuns = Math.max(120, opponentRuns - runDiff);
      userWickets = 10;
      margin = `Lost by ${runDiff} runs`;
    }
  } else {
    // Tie
    userRuns = 178;
    opponentRuns = 178;
    userWickets = 6;
    opponentWickets = 7;
    margin = 'Match Tied (Super Over decision)';
  }

  // Pick Man of the Match
  const filledPlayers = slots.map((s) => s.assignedPlayer).filter(Boolean);
  let mom = 'Team Effort';
  if (result === 'WIN' && filledPlayers.length > 0) {
    const randomHero = filledPlayers[Math.floor(Math.random() * filledPlayers.length)];
    if (randomHero) {
      mom = `${randomHero.name} (${randomHero.countryOrFranchise})`;
    }
  } else {
    mom = `${opponentName} Star Player`;
  }

  return {
    matchIndex,
    isPlayoff,
    opponentName,
    userScore: `${userRuns}/${userWickets} (20.0)`,
    opponentScore: `${opponentRuns}/${opponentWickets} (20.0)`,
    result,
    margin,
    mom,
  };
};

export const generateTournamentStructure = (
  userMatches: MatchSummary[]
): TournamentResult => {
  const userWins = userMatches.filter((m) => m.result === 'WIN').length;
  const userLosses = userMatches.filter((m) => m.result === 'LOSS').length;
  const userTies = userMatches.filter((m) => m.result === 'TIE').length;

  const opponents = [
    { name: 'Chennai Super Kings XI', w: 10, l: 4, t: 0, nrr: 0.85 },
    { name: 'Mumbai Indians All-Stars', w: 9, l: 5, t: 0, nrr: 0.62 },
    { name: 'Kolkata Knight Riders', w: 8, l: 6, t: 0, nrr: 0.41 },
    { name: 'Perth Scorchers XI', w: 7, l: 7, t: 0, nrr: 0.12 },
    { name: 'Sydney Sixers XI', w: 6, l: 8, t: 0, nrr: -0.25 },
    { name: 'Sunrisers Hyderabad', w: 5, l: 9, t: 0, nrr: -0.45 },
    { name: 'Royal Challengers Bangalore', w: 4, l: 10, t: 0, nrr: -0.78 },
  ];

  // User team entry
  const userNrr = (userWins * 0.12 - userLosses * 0.08).toFixed(2);
  const userEntry: PointsTableEntry = {
    rank: 1,
    teamName: 'YOUR DRAFTED XI 👑',
    p: 14,
    w: userWins,
    l: userLosses,
    t: userTies,
    nrr: parseFloat(userNrr),
    pts: userWins * 2 + userTies * 1,
    isUser: true,
  };

  const opponentEntries: PointsTableEntry[] = opponents.map((op) => ({
    rank: 0,
    teamName: op.name,
    p: 14,
    w: op.w,
    l: op.l,
    t: op.t,
    nrr: op.nrr,
    pts: op.w * 2 + op.t * 1,
    isUser: false,
  }));

  // Combine and Sort Points Table by Points desc, then NRR desc
  const allEntries = [userEntry, ...opponentEntries].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    return b.nrr - a.nrr;
  });

  // Assign Ranks 1 to 8
  allEntries.forEach((entry, idx) => {
    entry.rank = idx + 1;
  });

  const userRank = allEntries.find((e) => e.isUser)?.rank || 1;

  // Playoff Bracket (Top 4 qualify: 1st, 2nd, 3rd, 4th)
  const top4 = allEntries.slice(0, 4);
  const team1 = top4[0].teamName;
  const team2 = top4[1].teamName;
  const team3 = top4[2].teamName;
  const team4 = top4[3].teamName;

  // Qualifier 1 (1st vs 2nd)
  const isUserQ1 = top4[0].isUser || top4[1].isUser;
  const q1Winner = top4[0].isUser ? team1 : (top4[1].isUser ? team2 : team1);
  const q1Loser = q1Winner === team1 ? team2 : team1;

  // Eliminator (3rd vs 4th)
  const elimWinner = team3;

  // Qualifier 2 (q1Loser vs elimWinner)
  const q2Winner = q1Loser.includes('YOUR DRAFTED XI') ? q1Loser : q1Loser;

  // Grand Final (q1Winner vs q2Winner)
  const isChampion = userWins >= 10;
  const finalWinner = isChampion ? 'YOUR DRAFTED XI 👑' : q1Winner;

  const playoffMatches: PlayoffMatch[] = [
    {
      stageName: 'Qualifier 1',
      team1,
      team2,
      winner: q1Winner,
      scoreText: 'Won by 18 runs',
      isUserMatch: isUserQ1,
    },
    {
      stageName: 'Eliminator',
      team1: team3,
      team2: team4,
      winner: elimWinner,
      scoreText: 'Won by 4 wickets',
      isUserMatch: false,
    },
    {
      stageName: 'Qualifier 2',
      team1: q1Loser,
      team2: elimWinner,
      winner: q2Winner,
      scoreText: 'Won by 22 runs',
      isUserMatch: q1Loser.includes('YOUR DRAFTED XI'),
    },
    {
      stageName: 'Grand Final',
      team1: q1Winner,
      team2: q2Winner,
      winner: finalWinner,
      scoreText: isChampion ? 'Won by 6 wickets (IPL Champions!)' : 'Won by 12 runs',
      isUserMatch: true,
    },
  ];

  return {
    pointsTable: allEntries,
    playoffMatches,
    userFinalRank: userRank,
    isChampion,
  };
};
