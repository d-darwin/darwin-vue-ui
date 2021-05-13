/**
 * Exposes scroll to the top function.
 * @returns {{scrollToTop: scrollToTop}}
 */
export default function useScrollToTop() {
  const scrollToTop = () => {
    // TODO: add element / offset to scroll to
    const c =
      document &&
      (document.documentElement.scrollTop || document.body.scrollTop);
    if (c > 0) {
      // TODO: finally, why requestAnimationFrame ???
      window.requestAnimationFrame(scrollToTop);
      // TODO: add props to hardcoded scroll speed (8)
      window.scrollTo(0, c - c / 8);
    }
  };

  return {
    scrollToTop
  };
}
