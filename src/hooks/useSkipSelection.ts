import { useState } from "react";
import type { SkipData } from "../types";

const useSkipSelection = () => {
  const [selectedSkip, setSelectedSkip] = useState<SkipData | null>(null);

  const selectSkip = (skip: SkipData) => {
    setSelectedSkip((p) => (p?.id === skip?.id ? null : skip));
  };

  return {
    selectedSkip,
    selectSkip,
  };
};

export default useSkipSelection;

export type UseSkipSelectionReturnType = ReturnType<typeof useSkipSelection>;
