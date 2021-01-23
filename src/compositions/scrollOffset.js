import { ref, onMounted, onUnmounted } from "vue";

/** utils **/
import throttle from "../utils/throttle";

export default function useScrollOffset() {
  let throttledOnScroll = null;

  const scrollOffset = ref(0);

  const onScroll = () => {
    scrollOffset.value = window.scrollY;
  };

  onMounted(() => {
    if (process.browser) {
      // execute when mounted first time
      onScroll();
      throttledOnScroll = throttle(onScroll, 100);
      window.addEventListener("scroll", throttledOnScroll, { passive: true });
    }
  });

  onUnmounted(() => {
    if (process.browser) {
      window.removeEventListener("scroll", throttledOnScroll);
    }
  });

  return {
    scrollOffset
  };
}
