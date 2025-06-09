import { useState } from "react";
import { STEPS } from "../constants";

const useStep = () => {
  const [currentStep, setCurrentStep] = useState(2);

  const nextStep = () => {
    setCurrentStep((p) => Math.min(p + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((p) => Math.max(0, p - 1));
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
    currentStep,
    selectStep,
    nextStep,
    prevStep,
  };
};

export default useStep;

export type UseStepReturnType = ReturnType<typeof useStep>;
