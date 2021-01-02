/** utils **/
import throttle from "../utils/throttle";

/** design tokens **/
import breakpointTokens from "../assets/styles/tokens/_breakpoints.scss";

/**
 * Watches for resize and change deviceWidth if some breakpoint crossed
 */
export default {
  data() {
    return {
      deviceWidth: "lg",
      breakpointList: {
        sm: parseInt(breakpointTokens.sm),
        md: parseInt(breakpointTokens.md),
        lg: parseInt(breakpointTokens.lg),
        xl: parseInt(breakpointTokens.xl),
        xxl: parseInt(breakpointTokens.xxl)
      },
      throttledFunction: null
    };
  },

  mounted() {
    if (process.browser) {
      this.throttledFunction = throttle(this.handleResize, 100);
      window.addEventListener("resize", this.throttledFunction);
      this.handleResize();
    }
  },

  destroyed() {
    if (process.browser) {
      window.removeEventListener("resize", this.throttledFunction);
    }
  },

  methods: {
    handleResize() {
      if (process.browser) {
        // Safari handles window width different
        const deviceWidthPixels = !navigator.userAgent.includes("Safari")
          ? window.innerWidth
          : document.documentElement.clientWidth;

        if (deviceWidthPixels < this.breakpointList.sm) {
          // smallest
          this.deviceWidth = "xs";
        } else if (
          deviceWidthPixels >= this.breakpointList.sm &&
          deviceWidthPixels < this.breakpointList.md
        ) {
          this.deviceWidth = "sm";
        } else if (
          deviceWidthPixels >= this.breakpointList.md &&
          deviceWidthPixels < this.breakpointList.lg
        ) {
          this.deviceWidth = "md";
        } else if (
          deviceWidthPixels >= this.breakpointList.lg &&
          deviceWidthPixels < this.breakpointList.xl
        ) {
          this.deviceWidth = "lg";
        } else if (
          deviceWidthPixels >= this.breakpointList.xl &&
          deviceWidthPixels < this.breakpointList.xxl
        ) {
          this.deviceWidth = "xl";
        } else if (deviceWidthPixels >= this.breakpointList.xxl) {
          // biggest
          this.deviceWidth = "xxl";
        }
      }
    }
  }
};
