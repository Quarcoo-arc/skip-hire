import { useEffect, useState } from "react";
import type { SkipData } from "../types";
import { BASE_API } from "../constants";

const useSkips = (postcode: string, area: string) => {
  const [skips, setSkips] = useState<SkipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_API}/api/skips/by-location?postcode=${postcode}&area=${area}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch skips");
        }

        const data: SkipData[] = await response.json();
        setSkips(data);
      } catch (error) {
        const err = error as Error;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postcode && area) {
      fetchSkips();
    }
  }, [area, postcode]);

  return { skips, loading, error };
};

export default useSkips;
