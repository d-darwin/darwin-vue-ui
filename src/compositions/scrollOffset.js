import { ref, onMounted, onUnmounted } from "vue";

/** utils **/
import throttle from "../utils/throttle";

/**
 * Watches on current scroll offset.
 * @returns {{scrollOffset: Ref<UnwrapRef<number>>}}
 */
export default function useScrollOffset() {
  let throttledOnScroll = null;

  const scrollOffset = ref(0);

  const onScroll = () => {
    scrollOffset.value = window && window.scrollY;
  };

  onMounted(() => {
    if (process.browser) {
      // get current offset on mounted
      onScroll();
      // hold function pointer to remove event listener when the component will be unmounted
      throttledOnScroll = throttle(onScroll, 100);
      // watch on offset on scroll
      // use passive mode to notify browser that it can perform default action immediately
      window.addEventListener("scroll", throttledOnScroll, { passive: true });
    }
  });

  onUnmounted(() => {
    if (process.browser) {
      // prevent memory leaks
      window.removeEventListener("scroll", throttledOnScroll);
    }
  });

  // TODO: move to scrollOffsetY, scrollOffsetX
  return {
    scrollOffset
  };
}
