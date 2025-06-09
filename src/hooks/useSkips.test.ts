import { renderHook, waitFor, act } from "@testing-library/react";
import useSkips from "./useSkips";
import { BASE_API } from "../constants";
import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";

// Mock fetch globally
global.fetch = vi.fn();

describe("useSkips", () => {
  const mockSkipsData = [
    { id: 1, location: "Test Location 1", capacity: "6 yard" },
    { id: 2, location: "Test Location 2", capacity: "8 yard" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should initialize with correct default state", () => {
    const { result } = renderHook(() => useSkips("SW1A 1AA", "Westminster"));

    expect(result.current.skips).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("should fetch skips successfully when postcode and area are provided", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSkipsData,
    } as Response);

    const { result } = renderHook(() => useSkips("SW1A 1AA", "Westminster"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_API}/api/skips/by-location?postcode=SW1A 1AA&area=Westminster`
    );
    expect(result.current.skips).toEqual(mockSkipsData);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it("should handle API error responses", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    const { result } = renderHook(() => useSkips("INVALID", "Invalid Area"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.skips).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch skips");
    expect(result.current.loading).toBe(false);
  });

  it("should handle network errors", async () => {
    const networkError = new Error("Network error");
    vi.mocked(fetch).mockRejectedValueOnce(networkError);

    const { result } = renderHook(() => useSkips("SW1A 1AA", "Westminster"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.skips).toEqual([]);
    expect(result.current.error).toBe("Network error");
    expect(result.current.loading).toBe(false);
  });

  it("should not fetch when postcode is missing", () => {
    renderHook(() => useSkips("", "Westminster"));

    expect(fetch).not.toHaveBeenCalled();
  });

  it("should not fetch when area is missing", () => {
    renderHook(() => useSkips("SW1A 1AA", ""));

    expect(fetch).not.toHaveBeenCalled();
  });

  it("should not fetch when both postcode and area are missing", () => {
    renderHook(() => useSkips("", ""));

    expect(fetch).not.toHaveBeenCalled();
  });

  it("should refetch when postcode changes", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockSkipsData,
    } as Response);

    const { result, rerender } = renderHook(
      ({ postcode, area }) => useSkips(postcode, area),
      {
        initialProps: { postcode: "SW1A 1AA", area: "Westminster" },
      }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    // Change postcode
    rerender({ postcode: "E1 6AN", area: "Westminster" });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    expect(fetch).toHaveBeenLastCalledWith(
      `${BASE_API}/api/skips/by-location?postcode=E1 6AN&area=Westminster`
    );
  });

  it("should refetch when area changes", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockSkipsData,
    } as Response);

    const { result, rerender } = renderHook(
      ({ postcode, area }) => useSkips(postcode, area),
      {
        initialProps: { postcode: "SW1A 1AA", area: "Westminster" },
      }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    // Change area
    rerender({ postcode: "SW1A 1AA", area: "Camden" });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    expect(fetch).toHaveBeenLastCalledWith(
      `${BASE_API}/api/skips/by-location?postcode=SW1A 1AA&area=Camden`
    );
  });

  it("should handle empty response data", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    const { result } = renderHook(() => useSkips("SW1A 1AA", "Westminster"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.skips).toEqual([]);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it("should set loading to true when refetching", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockSkipsData,
    } as Response);

    const { result, rerender } = renderHook(
      ({ postcode, area }) => useSkips(postcode, area),
      {
        initialProps: { postcode: "SW1A 1AA", area: "Westminster" },
      }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Trigger refetch by changing props
    act(() => {
      rerender({ postcode: "E1 6AN", area: "Westminster" });
    });

    // Should immediately set loading to true
    expect(result.current.loading).toBe(true);
  });

  it("should clear previous error when making new successful request", async () => {
    // First call fails
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
    } as Response);

    const { result, rerender } = renderHook(
      ({ postcode, area }) => useSkips(postcode, area),
      {
        initialProps: { postcode: "INVALID", area: "Westminster" },
      }
    );

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to fetch skips");
    });

    // Second call succeeds - clear the previous mock and set new one
    vi.mocked(fetch).mockClear();
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSkipsData,
    } as Response);

    act(() => {
      rerender({ postcode: "SW1A 1AA", area: "Westminster" });
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(null);
    expect(result.current.skips).toEqual(mockSkipsData);
  });
});
