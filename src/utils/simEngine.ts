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

  // Realistic Simulation Win Chance:
  // - Low/Average Squad (70-78 OVR, low chemistry): 35-50% win chance -> 5-7 wins out of 14 (5th-7th place).
  // - Good Squad (80-86 OVR, 80% chemistry): 55-65% win chance -> 8-9 wins (3rd-4th place).
  // - Top Elite Squad (90-95 OVR, 95% chemistry): 70-80% win chance -> 10-12 wins (1st-2nd place).
  // Achieving 16-0 is a rare, challenging achievement!
  const baseWinChance = 0.52 + (effectiveSquadRating - 80) * 0.012 + (chemistryScore - 80) * 0.004;
  const winChance = Math.max(0.35, Math.min(0.85, baseWinChance));

  const roll = Math.random();

  let result: MatchOutcome;
  if (roll < winChance) {
    result = 'WIN';
  } else if (roll < winChance + 0.04) {
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
      userRuns = Math.floor(170 + Math.random() * 40);
      userWickets = Math.floor(3 + Math.random() * 4);
      const runDiff = Math.floor(10 + Math.random() * 35);
      opponentRuns = Math.max(100, userRuns - runDiff);
      opponentWickets = Math.floor(7 + Math.random() * 4);
      margin = `Won by ${runDiff} runs`;
    } else {
      opponentRuns = Math.floor(155 + Math.random() * 30);
      opponentWickets = Math.floor(5 + Math.random() * 4);
      userRuns = opponentRuns + Math.floor(2 + Math.random() * 4);
      userWickets = Math.floor(3 + Math.random() * 4);
      const wktsLeft = 10 - userWickets;
      const oversLeft = (Math.random() * 2.0 + 0.2).toFixed(1);
      margin = `Won by ${wktsLeft} wickets (${oversLeft} ov left)`;
    }
  } else if (result === 'LOSS') {
    if (isUserBattingFirst) {
      userRuns = Math.floor(145 + Math.random() * 30);
      userWickets = Math.floor(6 + Math.random() * 4);
      opponentRuns = userRuns + Math.floor(2 + Math.random() * 4);
      opponentWickets = Math.floor(4 + Math.random() * 4);
      const wktsLeft = 10 - opponentWickets;
      margin = `Lost by ${wktsLeft} wickets`;
    } else {
      opponentRuns = Math.floor(175 + Math.random() * 35);
      opponentWickets = Math.floor(4 + Math.random() * 4);
      const runDiff = Math.floor(8 + Math.random() * 30);
      userRuns = Math.max(110, opponentRuns - runDiff);
      userWickets = 10;
      margin = `Lost by ${runDiff} runs`;
    }
  } else {
    // Tie
    userRuns = 172;
    opponentRuns = 172;
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

  // Dynamically generate AI opponent win/loss records around the user's score
  const opponentsPool = [
    { name: 'Mumbai Indians All-Stars', baseW: 10, nrr: 0.78 },
    { name: 'Chennai Super Kings XI', baseW: 9, nrr: 0.62 },
    { name: 'Kolkata Knight Riders', baseW: 8, nrr: 0.35 },
    { name: 'Perth Scorchers XI', baseW: 7, nrr: 0.15 },
    { name: 'Sydney Sixers XI', baseW: 6, nrr: -0.18 },
    { name: 'Sunrisers Hyderabad', baseW: 5, nrr: -0.42 },
    { name: 'Royal Challengers Bangalore', baseW: 4, nrr: -0.75 },
  ];

  // Randomize AI opponent wins slightly for replayability
  const opponentEntries: PointsTableEntry[] = opponentsPool.map((op) => {
    const randomOffset = Math.floor(Math.random() * 3) - 1;
    const w = Math.max(2, Math.min(12, op.baseW + randomOffset));
    const l = 14 - w;
    return {
      rank: 0,
      teamName: op.name,
      p: 14,
      w,
      l,
      t: 0,
      nrr: parseFloat((op.nrr + (Math.random() * 0.2 - 0.1)).toFixed(2)),
      pts: w * 2,
      isUser: false,
    };
  });

  // User entry
  const userNrr = (userWins * 0.15 - userLosses * 0.12).toFixed(2);
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

  // Simulate Qualifier 1 (1st vs 2nd)
  const q1UserIsTeam1 = top4[0].isUser;
  const q1UserIsTeam2 = top4[1].isUser;
  const q1UserInMatch = q1UserIsTeam1 || q1UserIsTeam2;

  const q1Winner = Math.random() < 0.65 ? team1 : team2;
  const q1Loser = q1Winner === team1 ? team2 : team1;

  // Simulate Eliminator (3rd vs 4th)
  const elimWinner = Math.random() < 0.60 ? team3 : team4;

  // Simulate Qualifier 2 (q1Loser vs elimWinner)
  const q2Winner = Math.random() < 0.55 ? q1Loser : elimWinner;

  // Simulate Grand Final (q1Winner vs q2Winner)
  const finalWinner = Math.random() < 0.60 ? q1Winner : q2Winner;

  const isChampion = finalWinner.includes('YOUR DRAFTED XI');

  const playoffMatches: PlayoffMatch[] = [
    {
      stageName: 'Qualifier 1',
      team1,
      team2,
      winner: q1Winner,
      scoreText: 'Won by 14 runs',
      isUserMatch: q1UserInMatch,
    },
    {
      stageName: 'Eliminator',
      team1: team3,
      team2: team4,
      winner: elimWinner,
      scoreText: 'Won by 4 wickets',
      isUserMatch: top4[2].isUser || top4[3].isUser,
    },
    {
      stageName: 'Qualifier 2',
      team1: q1Loser,
      team2: elimWinner,
      winner: q2Winner,
      scoreText: 'Won by 18 runs',
      isUserMatch: q1Loser.includes('YOUR DRAFTED XI') || elimWinner.includes('YOUR DRAFTED XI'),
    },
    {
      stageName: 'Grand Final',
      team1: q1Winner,
      team2: q2Winner,
      winner: finalWinner,
      scoreText: isChampion ? 'Won by 5 wickets (Champions! 🏆)' : 'Won by 15 runs',
      isUserMatch: q1Winner.includes('YOUR DRAFTED XI') || q2Winner.includes('YOUR DRAFTED XI'),
    },
  ];

  return {
    pointsTable: allEntries,
    playoffMatches,
    userFinalRank: userRank,
    isChampion,
  };
};
