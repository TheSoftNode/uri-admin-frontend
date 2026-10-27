export interface Point {
  x: number;
  y: number;
}

/** Maps a series to SVG coordinates within a width×height box (with vertical padding). */
export function toPoints(values: number[], width: number, height: number, padY = 0.12): Point[] {
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = values.length > 1 ? width / (values.length - 1) : 0;
  const top = height * padY;
  const usable = height * (1 - padY * 2);

  return values.map((value, index) => ({
    x: index * step,
    y: top + usable - ((value - min) / range) * usable,
  }));
}

/** Smooth path through points using a Catmull-Rom → cubic Bézier conversion. */
export function smoothPath(points: Point[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M${points[0].x},${points[0].y}`;

  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  return d;
}

export function areaPath(points: Point[], height: number): string {
  if (points.length === 0) return "";
  const last = points[points.length - 1];
  return `${smoothPath(points)} L${last.x},${height} L${points[0].x},${height} Z`;
}
