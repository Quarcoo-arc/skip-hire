import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UseStepReturnType } from "./useStep";
import { act, renderHook } from "@testing-library/react";
import useStep from "./useStep";

vi.mock("../constants", () => ({
  STEPS: [
    {
      id: "step-0",
      title: "Step 0",
      shortTitle: "0",
      description: "This is step 0",
    },
    {
      id: "step-1",
      title: "Step 1",
      shortTitle: "1",
      description: "This is step 1",
    },
    {
      id: "step-2",
      title: "Step 2",
      shortTitle: "2",
      description: "This is step 2",
    },
    {
      id: "step-3",
      title: "Step 3",
      shortTitle: "3",
      description: "This is step 3",
    },
    {
      id: "step-4",
      title: "Step 4",
      shortTitle: "4",
      description: "This is step 4",
    },
  ],
}));

describe("useStep", () => {
  let result: { current: UseStepReturnType };

  beforeEach(() => {
    const { result: hookResult } = renderHook(() => useStep());
    result = hookResult;
  });

  describe("initial state", () => {
    it("should initialize with currentStep as 2", () => {
      expect(result.current.currentStep).toBe(2);
    });

    it("should return all expected functions", () => {
      expect(typeof result.current.nextStep).toBe("function");
      expect(typeof result.current.prevStep).toBe("function");
      expect(typeof result.current.selectStep).toBe("function");
    });
  });

  describe("nextStep", () => {
    it("should increment currentStep by 1", () => {
      const initialStep = result.current.currentStep;

      act(() => {
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(initialStep + 1);
    });

    it("should not increment beyond maximum step of 5", () => {
      // Set step to 5 first
      act(() => {
        result.current.nextStep(); // 3
        result.current.nextStep(); // 4
        result.current.nextStep(); // 5
      });

      expect(result.current.currentStep).toBe(5);

      // Try to go beyond 5
      act(() => {
        result.current.nextStep();
      });

      expect(result.current.currentStep).toBe(5);
    });

    it("should handle multiple increments correctly", () => {
      act(() => {
        result.current.nextStep(); // 3
        result.current.nextStep(); // 4
      });

      expect(result.current.currentStep).toBe(4);
    });
  });

  describe("prevStep", () => {
    it("should decrement currentStep by 1", () => {
      const initialStep = result.current.currentStep;

      act(() => {
        result.current.prevStep();
      });

      expect(result.current.currentStep).toBe(initialStep - 1);
    });

    it("should not decrement below minimum step of 0", () => {
      // Set step to 0 first
      act(() => {
        result.current.prevStep(); // 1
        result.current.prevStep(); // 0
      });

      expect(result.current.currentStep).toBe(0);

      // Try to go below 0
      act(() => {
        result.current.prevStep();
      });

      expect(result.current.currentStep).toBe(0);
    });

    it("should handle multiple decrements correctly", () => {
      act(() => {
        result.current.prevStep(); // 1
        result.current.prevStep(); // 0
      });

      expect(result.current.currentStep).toBe(0);
    });
  });

  describe("selectStep", () => {
    it("should set currentStep to the index of the step with matching id", () => {
      // Start at step 2, try to go to step 1
      act(() => {
        result.current.selectStep("step-1");
      });

      expect(result.current.currentStep).toBe(1);
    });

    it("should set currentStep to 0 when selecting step-0", () => {
      act(() => {
        result.current.selectStep("step-0");
      });

      expect(result.current.currentStep).toBe(0);
    });

    it("should not change currentStep when selecting a step at or beyond current step", () => {
      // Current step is 2, try to select step 2 (same step)
      act(() => {
        result.current.selectStep("step-2");
      });

      expect(result.current.currentStep).toBe(2); // Should remain unchanged

      // Try to select step 3 (beyond current step)
      act(() => {
        result.current.selectStep("step-3");
      });

      expect(result.current.currentStep).toBe(2); // Should remain unchanged
    });

    it("should not change currentStep when selecting a step beyond current step", () => {
      // Move to step 3 first
      act(() => {
        result.current.nextStep(); // Goes to 3
      });

      expect(result.current.currentStep).toBe(3);

      // Try to select step 4 (beyond current step)
      act(() => {
        result.current.selectStep("step-4");
      });

      expect(result.current.currentStep).toBe(3); // Should remain unchanged

      // Try to select step 5 (beyond current step)
      act(() => {
        result.current.selectStep("step-5");
      });

      expect(result.current.currentStep).toBe(3); // Should remain unchanged
    });

    it("should not change currentStep when step id does not exist", () => {
      const initialStep = result.current.currentStep;

      act(() => {
        result.current.selectStep("non-existent-step");
      });

      expect(result.current.currentStep).toBe(initialStep);
    });

    it("should handle empty string id", () => {
      const initialStep = result.current.currentStep;

      act(() => {
        result.current.selectStep("");
      });

      expect(result.current.currentStep).toBe(initialStep);
    });

    it("should work correctly at boundary conditions", () => {
      // Test at step 0
      act(() => {
        result.current.selectStep("step-0"); // Sets to step 0
      });

      expect(result.current.currentStep).toBe(0);

      // Cannot select any step when at step 0 (all others are >= currentStep)
      act(() => {
        result.current.selectStep("step-1");
      });

      expect(result.current.currentStep).toBe(0);

      // Test at step 5
      act(() => {
        result.current.nextStep(); // 1
        result.current.nextStep(); // 2
        result.current.nextStep(); // 3
        result.current.nextStep(); // 4
        result.current.nextStep(); // 5
      });

      expect(result.current.currentStep).toBe(5);

      // Should be able to go back to any previous step
      act(() => {
        result.current.selectStep("step-3");
      });

      expect(result.current.currentStep).toBe(3);
    });
  });
});
