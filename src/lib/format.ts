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

const COMPACT_UNITS = [
  { threshold: 1e9, suffix: "B" },
  { threshold: 1e6, suffix: "M" },
  { threshold: 1e3, suffix: "K" },
] as const;

const CURRENCY_SYMBOL: Record<CurrencyCode, string> = { USD: "$", NGN: "₦" };

/**
 * Compact currency for dense surfaces, e.g. ₦19.6M or $42.2K.
 * Implemented by hand: `Intl` compact notation differs between Node's and the
 * browser's ICU data, which breaks hydration when the same value renders on both.
 */
export function formatCompactCurrency(value: number, currency: CurrencyCode = "USD"): string {
  const symbol = CURRENCY_SYMBOL[currency];
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  const unit = COMPACT_UNITS.find((u) => abs >= u.threshold);
  if (!unit) return `${sign}${symbol}${Math.round(abs)}`;
  const scaled = (abs / unit.threshold).toFixed(1).replace(/\.0$/, "");
  return `${sign}${symbol}${scaled}${unit.suffix}`;
}

export function getInitials(name: string): string {
  return name
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
