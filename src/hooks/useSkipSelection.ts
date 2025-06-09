import { useState } from "react";
import type { SkipData } from "../types";
import { STEPS } from "../constants";

const useSkipSelection = () => {
  const [selectedSkip, setSelectedSkip] = useState<SkipData | null>(null);
  const [currentStep, setCurrentStep] = useState(2);

  const selectSkip = (skip: SkipData) => {
    setSelectedSkip((p) => (p?.id === skip?.id ? null : skip));
  };

  const nextStep = () => {
    setCurrentStep((p) => Math.min(p + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((p) => Math.max(0, p - 1));
  };

  const resetSelection = () => {
    setSelectedSkip(null);
    setCurrentStep(0);
  };

  const selectStep = (id: string) => {
    let stepIndex;
    STEPS.forEach((step, idx) => {
      if (step.id === id) stepIndex = idx;
    });
    if ((!stepIndex && stepIndex !== 0) || stepIndex >= currentStep) return;
    setCurrentStep(stepIndex);
  };

  return {
    selectedSkip,
    currentStep,
    selectStep,
    selectSkip,
    nextStep,
    prevStep,
    resetSelection,
  };
};

export default useSkipSelection;

export type UseSkipSelectionReturnType = ReturnType<typeof useSkipSelection>;
