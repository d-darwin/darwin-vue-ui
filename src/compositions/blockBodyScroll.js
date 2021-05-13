/**
 * Helps add/remove .__blocked-scroll class to the body element.
 * See example usage in '@dariwn-studio/ui-vue/components/organisms/DModal.vue'.
 *
 * @returns {function}
 */
export default function useBlockBodyScroll() {
  const blockScroll = (block = true) => {
    const body = document.getElementsByTagName("body")[0];
    if (block) {
      body.classList.add("__blocked-scroll");
      /*TODO: overcome step body widening*/
    } else {
      body.classList.remove("__blocked-scroll");
    }
  };

  return {
    blockScroll
  };
}
