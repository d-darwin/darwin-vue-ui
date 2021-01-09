/**
 * Helps add/remove .__blocked-scroll class to the body element.
 *
 * @returns {function}
 */
export default function useBlockBodyScroll() {
  const blockScroll = (block = true) => {
    const body = document.getElementsByTagName("body")[0];
    if (block) {
      body.classList.add("__blocked-scroll");
    } else {
      body.classList.remove("__blocked-scroll");
    }
  };

  return {
    blockScroll
  };
}
