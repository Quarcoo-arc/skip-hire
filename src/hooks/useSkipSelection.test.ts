import { describe, it, expect, beforeEach } from "vitest";
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

    it("should return the selectSkip functions", () => {
      expect(typeof result.current.selectSkip).toBe("function");
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
});
