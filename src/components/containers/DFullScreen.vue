<template>
  <div :id="componentId" :class="$attrs.class" class="d-full-screen">
    <!-- @slot The component content -->
    <slot />

    <DLink
      ref="request-full-screen-link"
      href="#"
      preventDefault
      v-show="!isFullScreen"
      v-bind="{ ...linkProps, onClick: requestFullScreen }"
      :style="linkStyle"
    >
      <DIconMaximize v-if="!$slots['icon-maximize']" />
      <!-- @slot You can replace default maximize icon by passing your own here. -->
      <slot v-else name="icon-maximize" />

      <DTypography
        v-if="linkText"
        v-bind="{ content: linkText, ...typographyProps }"
        :style="typographyStyle"
      />
    </DLink>
  </div>
</template>

<script>
/** compositions **/
import useComponentId from "../../compositions/componentId";

/** components **/
import DIconMaximize from "../icons/DIconMaximize";
import DLink from "../atoms/DLink";
import DTypography from "../containers/DTypography";

/**
 * The component adds full screen mode to the default slot content.
 *
 * @version 1.1.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DFullScreen",

  inheritAttrs: false,

  components: { DTypography, DLink, DIconMaximize },

  emits: ["update:fullscreen"],

  props: {
    /**
     * Defines component id.
     */
    id: {
      type: [String, Number],
      default: ""
    },

    /**
     * Link text string.
     */
    linkText: {
      type: String,
      default: ""
    },

    /**
     * Pass any <b>DLink</b> props if needed.
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
     * Pass any <b>DTypography</b> props if needed.
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

  setup(props) {
    const { componentId } = useComponentId(props);
    return { componentId };
  },

  data() {
    return {
      isFullScreen: false,
      fullScreenEventListener: null
    };
  },

  mounted() {
    // hold pointer to the event listener to release it on unmount
    this.fullScreenEventListener = () => {
      this.isFullScreen = !!document.fullscreenElement;

      if (!this.isFullScreen) {
        // move focus to requestFullScreenLink
        const requestFullScreenLink =
          this.$refs["request-full-screen-link"] &&
          this.$refs["request-full-screen-link"].$el;
        if (requestFullScreenLink) {
          this.$nextTick(() => requestFullScreenLink.focus());
        }
      }
      /**
       * Emits current state of the component on change.
       *
       * @event update:fullscreen
       * @type { Boolean }
       */
      this.$emit("update:fullscreen", this.isFullScreen);
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
      document.getElementById(this.componentId).requestFullscreen();
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/gaps";
</style>

<style scoped lang="scss">
.d-full-screen {
  height: fit-content;
}

.d-link {
  margin-top: var(--gap-2x);

  // TODO: avoid using <any> selector
  > * + * {
    margin-left: var(--gap-2x);
  }
}
</style>
