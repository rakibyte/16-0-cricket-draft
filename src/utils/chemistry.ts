import type { Player, PlayerRole, SquadSlot } from '../types/game';

export interface SlotEfficiency {
  slotId: number;
  efficiencyMultiplier: number; // 0.35 to 1.0
  effectiveRating: number;
  isExactRole: boolean;
  isSecondaryRole: boolean;
  isSevereMismatch: boolean;
  reason: string;
}

export const calculateSlotEfficiency = (player: Player, requiredRole: PlayerRole): SlotEfficiency => {
  if (player.primaryRole === requiredRole) {
    return {
      slotId: 0,
      efficiencyMultiplier: 1.0,
      effectiveRating: player.overallRating,
      isExactRole: true,
      isSecondaryRole: false,
      isSevereMismatch: false,
      reason: 'Perfect fit for slot',
    };
  }

  if (player.secondaryRole === requiredRole) {
    return {
      slotId: 0,
      efficiencyMultiplier: 0.85,
      effectiveRating: Math.round(player.overallRating * 0.85),
      isExactRole: false,
      isSecondaryRole: true,
      isSevereMismatch: false,
      reason: 'Secondary role fit (-15% efficiency)',
    };
  }

  // Partial compatibility checks
  const isBatterInBattingSlot = 
    (player.primaryRole === 'OPENER' || player.primaryRole === 'MIDDLE_ORDER') && 
    (requiredRole === 'OPENER' || requiredRole === 'MIDDLE_ORDER' || requiredRole === 'WICKETKEEPER');

  const isBowlerInBowlingSlot = 
    (player.primaryRole === 'FAST_BOWLER' || player.primaryRole === 'FRONTLINE_SPINNER') && 
    (requiredRole === 'FAST_BOWLER' || requiredRole === 'FRONTLINE_SPINNER');

  const isAllRounderFlex = 
    player.primaryRole === 'PACE_ALLROUNDER' || player.primaryRole === 'SPIN_ALLROUNDER';

  if (isBatterInBattingSlot || isBowlerInBowlingSlot || isAllRounderFlex) {
    return {
      slotId: 0,
      efficiencyMultiplier: 0.70,
      effectiveRating: Math.round(player.overallRating * 0.70),
      isExactRole: false,
      isSecondaryRole: false,
      isSevereMismatch: false,
      reason: 'Partial role fit (-30% efficiency)',
    };
  }

  // Severe Out-of-Position Mismatch (e.g., Pure Batter in Fast Bowler slot)
  return {
    slotId: 0,
    efficiencyMultiplier: 0.35,
    effectiveRating: Math.round(player.overallRating * 0.35),
    isExactRole: false,
    isSecondaryRole: false,
    isSevereMismatch: true,
    reason: 'CRITICAL MISMATCH! Out of position (-65% efficiency)',
  };
};

export const calculateSquadChemistry = (slots: SquadSlot[]) => {
  const filledSlots = slots.filter((s) => s.assignedPlayer !== null);
  if (filledSlots.length === 0) {
    return { chemistryScore: 100, effectiveSquadRating: 0, outOfPositionCount: 0 };
  }

  let totalEfficiency = 0;
  let totalEffectiveRating = 0;
  let outOfPositionCount = 0;

  slots.forEach((slot) => {
    if (slot.assignedPlayer) {
      const eff = calculateSlotEfficiency(slot.assignedPlayer, slot.requiredRole);
      totalEfficiency += eff.efficiencyMultiplier;
      totalEffectiveRating += eff.effectiveRating;
      if (eff.isSevereMismatch) {
        outOfPositionCount++;
      }
    }
  });

  const averageEfficiency = totalEfficiency / filledSlots.length;
  const chemistryScore = Math.max(10, Math.round(averageEfficiency * 100));
  const effectiveSquadRating = Math.round(totalEffectiveRating / filledSlots.length);

  return {
    chemistryScore,
    effectiveSquadRating,
    outOfPositionCount,
  };
};
