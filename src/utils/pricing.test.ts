// src/utils/price.test.ts
import { describe, it, expect } from "vitest";
import { calculateTotalPrice, formatPrice } from "./pricing";
import type { SkipData } from "../types";

describe("calculateTotalPrice", () => {
  it("should calculate total price with VAT and transport cost", () => {
    const skip: SkipData = {
      id: 1,
      size: 6,
      hire_period_days: 14,
      transport_cost: 10,
      per_tonne_cost: null,
      price_before_vat: 100,
      vat: 20,
      postcode: "NR32",
      area: "",
      forbidden: false,
      created_at: "2025-04-03T13:51:46.897146",
      updated_at: "2025-04-07T13:16:52.992",
      allowed_on_road: true,
      allows_heavy_waste: true,
    };

    const result = calculateTotalPrice(skip);

    expect(result.basePrice).toBe(100);
    expect(result.vatAmount).toBe(20);
    expect(result.transportCost).toBe(10);
    expect(result.totalPrice).toBe(130);
  });

  it("should default transport cost to 0 if not provided", () => {
    const skip: SkipData = {
      id: 3,
      size: 6,
      hire_period_days: 14,
      transport_cost: null,
      per_tonne_cost: null,
      price_before_vat: 50,
      vat: 10,
      postcode: "NR32",
      area: "",
      forbidden: false,
      created_at: "2025-04-03T13:51:46.897146",
      updated_at: "2025-04-07T13:16:52.992",
      allowed_on_road: true,
      allows_heavy_waste: true,
    };

    const result = calculateTotalPrice(skip);

    expect(result.basePrice).toBe(50);
    expect(result.vatAmount).toBe(5); // 10% of 50
    expect(result.transportCost).toBe(0);
    expect(result.totalPrice).toBe(55); // 50 + 5 + 0
  });
});

describe("formatPrice", () => {
  it("should format price as GBP currency", () => {
    const price = 1234.56;
    const formatted = formatPrice(price);

    expect(formatted).toBe("£1,234.56");
  });

  it("should format 0 correctly", () => {
    const price = 0;
    const formatted = formatPrice(price);

    expect(formatted).toBe("£0.00");
  });
});
