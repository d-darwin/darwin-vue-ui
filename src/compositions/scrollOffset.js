import { ref, onMounted, onUnmounted } from "vue";

/** utils **/
import throttle from "../utils/throttle";

export default function useScrollOffset() {
  let throttledOnScroll = null;

  const scrollOffset = ref(0);

  const onScroll = () => {
    scrollOffset.value = window?.scrollY;
  };

  onMounted(() => {
    if (process.browser) {
      // get current offset on mounted
      onScroll();
      // hold function pointer to remove event listener when the component will be unmounted
      throttledOnScroll = throttle(onScroll, 100);
      // watch on offset on scroll
      // TODO: why passive: true ???
      window.addEventListener("scroll", throttledOnScroll, { passive: true });
    }
  });

  onUnmounted(() => {
    if (process.browser) {
      // prevent memory leaks
      window.removeEventListener("scroll", throttledOnScroll);
    }
  });

  return {
    scrollOffset
  };
}
