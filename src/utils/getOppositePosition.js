/**
 * Returns opposite position.
 *
 * @param position: Position
 * @returns {position: Position}
 */
export default function(position) {
  switch (position) {
    case "top":
      return "bottom";
    case "right":
      return "left";
    case "bottom":
      return "top";
    case "left":
      return "right";
    default:
      return "";
  }
}
