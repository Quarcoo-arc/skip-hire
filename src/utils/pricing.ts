import type { SkipData } from "../types";

export const calculateTotalPrice = (skip: SkipData) => {
  const basePrice = skip.price_before_vat;
  const vatAmount = (basePrice * skip.vat) / 100;
  const transportCost = skip.transport_cost || 0;

  return {
    basePrice,
    vatAmount,
    transportCost,
    totalPrice: basePrice + vatAmount + transportCost,
  };
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
};
