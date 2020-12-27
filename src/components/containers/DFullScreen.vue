<template>
  <div :id="id" :class="$attrs.class" class="d-full-screen">
    <slot />

    <DLink
      v-show="!isFullScreen"
      v-bind="{ ...linkProps, onClick: requestFullScreen }"
      :style="linkStyle"
    >
      <DIconMaximize v-if="!$slots['icon-maximize']" />
      <!-- @slot You can replace default maximize icon by passing your own here. -->
      <slot v-else name="icon-maximize" />

      <DTypography
        v-if="typographyProps.content"
        v-bind="typographyProps"
        :style="typographyStyle"
      />
    </DLink>
  </div>
</template>

<script>
/** utils **/
import uuid from "../../utils/uuid";

/** components **/
import DIconMaximize from "../icons/DIconMaximize";
import DLink from "../atoms/DLink";
import DTypography from "../containers/DTypography";

/**
 * The component adds full screen mode to default slot content.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DFullScreen",

  inheritAttrs: false,

  components: { DTypography, DLink, DIconMaximize },

  props: {
    /**
     * Defines component id.
     */
    id: {
      type: String,
      default: `d_full_screen_${uuid()}`
    },

    /**
     * Pass any <b>DLink</b>. props if needed.
     */
    linkProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.d-link</i> if needed.
     */
    linkStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any <b>DTypography</b>. props if needed.
     */
    typographyProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.d-typography</i> if needed.
     */
    typographyStyle: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      isFullScreen: false,
      fullScreenEventListener: null
    };
  },

  mounted() {
    // hold pointer to the event listener to release it while unmount
    this.fullScreenEventListener = () => {
      this.isFullScreen = !!document.fullscreenElement;
    };

    window.addEventListener(
      "fullscreenchange",
      this.fullScreenEventListener,
      false
    );
    window.addEventListener(
      "webkitfullscreenchange",
      this.fullScreenEventListener,
      false
    );
    window.addEventListener(
      "mozfullscreenchange",
      this.fullScreenEventListener,
      false
    );
  },

  beforeUnmount() {
    // remove all added event listeners to avoid memory leaks
    window.removeEventListener("message", this.messageEventListener);
    window.removeEventListener(
      "fullscreenchange",
      this.fullScreenEventListener
    );
    window.removeEventListener(
      "webkitfullscreenchange",
      this.fullScreenEventListener
    );
    window.removeEventListener(
      "mozfullscreenchange",
      this.fullScreenEventListener
    );
  },

  methods: {
    requestFullScreen() {
      document.getElementById(this.id).requestFullscreen();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/tokens/gaps";

.d-link {
  > * + * {
    margin-left: var(--gap-base);
  }
}
</style>