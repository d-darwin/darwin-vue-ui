import { ref, onMounted, onUnmounted } from "vue";

/** utils **/
import throttle from "../utils/throttle";

/** design tokens **/
import breakpointTokens from "../assets/styles/tokens/_breakpoints.scss";

/**
 * Watches for resize and change windowHeight, windowWidth and deviceWidth
 * if any breakpoint was crossed.
 *
 * @returns {{deviceWidth: number, windowHeight: number, windowWidth: string}}
 */
export default function useWindowSize() {
  const windowHeight = ref(null);
  const windowWidth = ref(null);
  const deviceWidth = ref(null);

  let throttledOnResize = null;

  const breakpointList = {
    sm: parseInt(breakpointTokens.sm),
    md: parseInt(breakpointTokens.md),
    lg: parseInt(breakpointTokens.lg),
    xl: parseInt(breakpointTokens.xl),
    xxl: parseInt(breakpointTokens.xxl)
  };

  function onResize() {
    if (process.browser) {
      windowHeight.value = document && document.documentElement.clientHeight;
      windowWidth.value = document && document.documentElement.clientWidth;

      if (windowWidth.value < breakpointList.sm) {
        // smallest
        deviceWidth.value = "xs";
      } else if (
        windowWidth.value >= breakpointList.sm &&
        windowWidth.value < breakpointList.md
      ) {
        deviceWidth.value = "sm";
      } else if (
        windowWidth.value >= breakpointList.md &&
        windowWidth.value < breakpointList.lg
      ) {
        deviceWidth.value = "md";
      } else if (
        windowWidth.value >= breakpointList.lg &&
        windowWidth.value < breakpointList.xl
      ) {
        deviceWidth.value = "lg";
      } else if (
        windowWidth.value >= breakpointList.xl &&
        windowWidth.value < breakpointList.xxl
      ) {
        deviceWidth.value = "xl";
      } else if (windowWidth.value >= breakpointList.xxl) {
        // biggest
        deviceWidth.value = "xxl";
      }
    }
  }

  onMounted(() => {
    if (process.browser) {
      // execute when mounted first time
      onResize();

      throttledOnResize = throttle(onResize, 100);
      window.addEventListener("resize", throttledOnResize);
    }
  });

  onUnmounted(() => {
    if (process.browser) {
      window.removeEventListener("resize", throttledOnResize);
    }
  });

  return { windowHeight, windowWidth, deviceWidth };
}
