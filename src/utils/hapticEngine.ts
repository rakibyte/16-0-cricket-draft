/**
 * Web Haptics Engine wrapper for native feel
 */
export const triggerHapticTick = () => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(8);
    } catch {
      // Ignore fallback
    }
  }
};

export const triggerHapticLock = () => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([25, 40, 25]);
    } catch {
      // Ignore fallback
    }
  }
};

export const triggerHapticSuccess = () => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([40, 60, 40, 60, 80]);
    } catch {
      // Ignore fallback
    }
  }
};

export const triggerHapticFailure = () => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([100, 50, 100]);
    } catch {
      // Ignore fallback
    }
  }
};
