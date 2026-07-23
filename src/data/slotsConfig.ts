import type { SquadSlot } from '../types/game';

export const INITIAL_SQUAD_SLOTS: SquadSlot[] = [
  { id: 1, slotName: "Opener 1", requiredRole: "OPENER", assignedPlayer: null },
  { id: 2, slotName: "Opener 2", requiredRole: "OPENER", assignedPlayer: null },
  { id: 3, slotName: "No. 3 Batter", requiredRole: "MIDDLE_ORDER", assignedPlayer: null },
  { id: 4, slotName: "No. 4 Batter", requiredRole: "MIDDLE_ORDER", assignedPlayer: null },
  { id: 5, slotName: "Wicketkeeper", requiredRole: "WICKETKEEPER", assignedPlayer: null },
  { id: 6, slotName: "Spin All-Rounder", requiredRole: "SPIN_ALLROUNDER", assignedPlayer: null },
  { id: 7, slotName: "Pace All-Rounder", requiredRole: "PACE_ALLROUNDER", assignedPlayer: null },
  { id: 8, slotName: "Frontline Spinner", requiredRole: "FRONTLINE_SPINNER", assignedPlayer: null },
  { id: 9, slotName: "Fast Bowler 1", requiredRole: "FAST_BOWLER", assignedPlayer: null },
  { id: 10, slotName: "Fast Bowler 2", requiredRole: "FAST_BOWLER", assignedPlayer: null },
  { id: 11, slotName: "Fast Bowler 3", requiredRole: "FAST_BOWLER", assignedPlayer: null },
];

export const ROLE_LABELS: Record<string, string> = {
  OPENER: "Opener",
  MIDDLE_ORDER: "Middle Order Batter",
  WICKETKEEPER: "Wicketkeeper-Batter",
  SPIN_ALLROUNDER: "Spin All-Rounder",
  PACE_ALLROUNDER: "Pace All-Rounder",
  FRONTLINE_SPINNER: "Frontline Spinner",
  FAST_BOWLER: "Fast Bowler",
};

export const ROLE_ICONS: Record<string, string> = {
  OPENER: "⚡",
  MIDDLE_ORDER: "🏏",
  WICKETKEEPER: "🧤",
  SPIN_ALLROUNDER: "🌀",
  PACE_ALLROUNDER: "🔥",
  FRONTLINE_SPINNER: "🎯",
  FAST_BOWLER: "🚀",
};
