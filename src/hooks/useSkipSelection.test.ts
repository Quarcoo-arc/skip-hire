import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useSkipSelection, {
  type UseSkipSelectionReturnType,
} from "./useSkipSelection";
import type { SkipData } from "../types";

// Mock SkipData for testing
const mockSkipData1: SkipData = {
  id: 17934,
  size: 6,
  hire_period_days: 14,
  transport_cost: null,
  per_tonne_cost: null,
  price_before_vat: 305,
  vat: 20,
  postcode: "NR32",
  area: "",
  forbidden: false,
  created_at: "2025-04-03T13:51:46.897146",
  updated_at: "2025-04-07T13:16:52.992",
  allowed_on_road: true,
  allows_heavy_waste: true,
};

const mockSkipData2: SkipData = {
  id: 17935,
  size: 7,
  hire_period_days: 15,
  transport_cost: null,
  per_tonne_cost: null,
  price_before_vat: 302,
  vat: 20,
  postcode: "NR32",
  area: "",
  forbidden: false,
  created_at: "2025-04-03T13:51:46.897147",
  updated_at: "2025-04-07T13:16:52.993",
  allowed_on_road: true,
  allows_heavy_waste: false,
};

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

describe("useSkipSelection", () => {
  let result: { current: UseSkipSelectionReturnType };

  beforeEach(() => {
    const { result: hookResult } = renderHook(() => useSkipSelection());
    result = hookResult;
  });

  describe("initial state", () => {
    it("should initialize with null selectedSkip", () => {
      expect(result.current.selectedSkip).toBeNull();
    });

    it("should initialize with currentStep as 2", () => {
      expect(result.current.currentStep).toBe(2);
    });

    it("should return all expected functions", () => {
      expect(typeof result.current.selectSkip).toBe("function");
      expect(typeof result.current.nextStep).toBe("function");
      expect(typeof result.current.prevStep).toBe("function");
      expect(typeof result.current.resetSelection).toBe("function");
    });
  });

  describe("selectSkip", () => {
    it("should select a skip when none is selected", () => {
      act(() => {
        result.current.selectSkip(mockSkipData1);
      });

      expect(result.current.selectedSkip).toEqual(mockSkipData1);
    });

    it("should deselect skip when selecting the same skip again", () => {
      // First select a skip
      act(() => {
        result.current.selectSkip(mockSkipData1);
      });

      expect(result.current.selectedSkip).toEqual(mockSkipData1);

      // Select the same skip again to deselect
      act(() => {
        result.current.selectSkip(mockSkipData1);
      });

      expect(result.current.selectedSkip).toBeNull();
    });

    it("should switch selection when selecting a different skip", () => {
      // First select skip 1
      act(() => {
        result.current.selectSkip(mockSkipData1);
      });

      expect(result.current.selectedSkip).toEqual(mockSkipData1);

      // Then select skip 2
      act(() => {
        result.current.selectSkip(mockSkipData2);
      });

      expect(result.current.selectedSkip).toEqual(mockSkipData2);
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

  describe("resetSelection", () => {
    it("should reset selectedSkip to null and currentStep to 0", () => {
      // First set some values
      act(() => {
        result.current.selectSkip(mockSkipData1);
        result.current.nextStep();
        result.current.nextStep();
      });

      expect(result.current.selectedSkip).toEqual(mockSkipData1);
      expect(result.current.currentStep).toBe(4);

      // Reset
      act(() => {
        result.current.resetSelection();
      });

      expect(result.current.selectedSkip).toBeNull();
      expect(result.current.currentStep).toBe(0);
    });

    it("should work when called multiple times", () => {
      act(() => {
        result.current.resetSelection();
        result.current.resetSelection();
      });

      expect(result.current.selectedSkip).toBeNull();
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
        result.current.resetSelection(); // Sets to step 0
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

  describe("integration scenarios", () => {
    it("should handle complex state changes correctly", () => {
      // Select a skip
      act(() => {
        result.current.selectSkip(mockSkipData1);
      });

      // Move forward a few steps
      act(() => {
        result.current.nextStep(); // 3
        result.current.nextStep(); // 4
      });

      expect(result.current.selectedSkip).toEqual(mockSkipData1);
      expect(result.current.currentStep).toBe(4);

      // Change selection
      act(() => {
        result.current.selectSkip(mockSkipData2);
      });

      expect(result.current.selectedSkip).toEqual(mockSkipData2);
      expect(result.current.currentStep).toBe(4); // Step should remain unchanged

      // Move back
      act(() => {
        result.current.prevStep(); // 3
        result.current.prevStep(); // 2
      });

      expect(result.current.selectedSkip).toEqual(mockSkipData2);
      expect(result.current.currentStep).toBe(2);
    });

    it("should maintain state independence between selectedSkip and currentStep", () => {
      // Change step without affecting selection
      act(() => {
        result.current.nextStep();
      });

      expect(result.current.selectedSkip).toBeNull();
      expect(result.current.currentStep).toBe(3);

      // Change selection without affecting step
      act(() => {
        result.current.selectSkip(mockSkipData1);
      });

      expect(result.current.selectedSkip).toEqual(mockSkipData1);
      expect(result.current.currentStep).toBe(3);
    });
  });
});
