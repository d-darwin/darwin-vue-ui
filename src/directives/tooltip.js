/**
 * Simple directive to add tooltip to any component
 *
 */


/**
 * TODO: IN PROGRESS
 */
const HAS_WINDOWS = typeof window !== "undefined";

const beforeMount = function(el, binding) {
  const tooltip = document.createElement("div");
  tooltip.style.position = "absolute";

  tooltip.setAttribute("role", "tooltip");
  // tooltip.setAttribute("aria-hidden", "true");

  tooltip.textContent = binding.value;
  el.append(tooltip);
};

const directive = {
  beforeMount
};

export default HAS_WINDOWS ? directive : {};
