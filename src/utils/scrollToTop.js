/**
 * Smoothly scroll to the top of the page
 */
const scrollToTop = () => {
  // TODO: add element to scroll to
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    // TODO: add props to hardcoded scroll speed (8)
    window.scrollTo(0, c - c / 8);
  }
};

export default scrollToTop;
