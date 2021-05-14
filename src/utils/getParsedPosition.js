/**
 * Return parsed position
 * @param position - position string (e.g. "top-right")
 * @return {{horizontal: string | null, vertical: string | null}}
 */
export default function(position) {
  const splitPosition = position && position.split("-");
  const horizontal = ["left", "right"].includes(
    // if position is hybrid, left/right should be the second
    splitPosition[1] || splitPosition[0]
  )
    ? splitPosition[1] || splitPosition[0]
    : null;

  const vertical = ["top", "bottom"].includes(
    // if position is hybrid, top/bottom should be the first
    splitPosition[0] || splitPosition[1]
  )
    ? splitPosition[0] || splitPosition[1]
    : null;

  return { horizontal, vertical };
}
