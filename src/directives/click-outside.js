/**
 * Simple directive to detect click outside of the component.
 *
 */

const HAS_WINDOWS = typeof window !== "undefined";

// This variable will hold the reference to document's click handler to remove it on unmount
let outsideClickHandler;

const beforeMount = function(el, binding) {
  // We will skip first click if directive arg is set to true
  let isFirstClick = true;
  outsideClickHandler = e => {
    e.stopPropagation();
    // Get the handler method name and the exclude array
    // from the object used in v-closable
    const handler = binding.value;
    const skipFirstClick = binding.arg;

    // We check to see if the clicked element is not
    // the dialog element and not excluded
    if (
      !el.contains(e.target) &&
      el !== e.target &&
      (!skipFirstClick || !isFirstClick)
    ) {
      // If the clicked element is outside the dialog
      // and not the button, then call the outside-click handler
      // from the same component this directive is used in
      handler();
    }

    isFirstClick = false;
  };
  // Register click/touchstart event listeners on the whole page
  document.addEventListener("click", outsideClickHandler);
  document.addEventListener("touchstart", outsideClickHandler);
};

const unmounted = function() {
  // If the element that has v-closable is removed, then
  // unbind click/touchstart listeners from the whole page
  document.removeEventListener("click", outsideClickHandler);
  document.removeEventListener("touchstart", outsideClickHandler);
};

const updated = function(el, binding) {
  const value = binding.value,
    oldValue = binding.oldValue;
  if (JSON.stringify(value) === JSON.stringify(oldValue)) {
    return;
  }
  unmounted(el);
  beforeMount(el, { value: value });
};

const directive = {
  beforeMount,
  updated,
  unmounted
};

export default HAS_WINDOWS ? directive : {};
