/**
 * Smoothly scrolls to the top of the page.
 */
// TODO: move to compositions ???
const scrollToTop = () => {
  // TODO: add element / offset to scroll to
  const c = document?.documentElement?.scrollTop || document?.body?.scrollTop;
  if (c > 0) {
    // TODO: finally, why requestAnimationFrame ???
    window.requestAnimationFrame(scrollToTop);
    // TODO: add props to hardcoded scroll speed (8)
    window.scrollTo(0, c - c / 8);
  }
};

export default scrollToTop;
