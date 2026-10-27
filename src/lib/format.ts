/**
 * Locale-aware formatters shared by every feature. Keeping them in one module
 * means number and currency presentation stays consistent across the console.
 */

const LOCALE = "en-NG";

export type CurrencyCode = "USD" | "NGN";

const integerFormatter = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 });

export function formatNumber(value: number): string {
  return integerFormatter.format(value);
}

export function formatDecimal(value: number, fractionDigits = 2): string {
  return value.toFixed(fractionDigits);
}

export function formatPercent(value: number, fractionDigits = 1): string {
  return `${value.toFixed(fractionDigits)}%`;
}

export function formatCurrency(value: number, currency: CurrencyCode = "USD"): string {
  return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Compact currency for dense surfaces, e.g. ₦19.6M or $42.2K. */
export function formatCompactCurrency(value: number, currency: CurrencyCode = "USD"): string {
  return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function getInitials(name: string): string {
  return name
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
