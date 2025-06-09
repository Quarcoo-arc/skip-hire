import type { SkipData } from "../types";

export const categorizeSkips = (skips: SkipData[]) => {
  return {
    small: skips.filter((skip) => skip.size <= 6),
    medium: skips.filter((skip) => skip.size > 6 && skip.size <= 12),
    large: skips.filter((skip) => skip.size > 12),
  };
};
