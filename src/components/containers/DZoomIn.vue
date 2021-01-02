<template>
  <div
    ref="content_zoom_container"
    :class="{ ...$attrs.class }"
    class="d-zoom-in"
  >
    <DLink
      v-show="!isZoomed"
      ref="zoom-in-link"
      href="#"
      class="content-wrap"
      @click="zoomInHandler"
    >
      <slot />
    </DLink>

    <transition name="opacity">
      <DButton
        ref="close-button"
        v-show="isZoomed"
        v-bind="{
          iconOnly: true,
          type: 'alternative',
          size: 'medium',
          ...closeButtonProps
        }"
        class="close-button"
        @click="zoomOutHandler"
      >
        <DIconClose class="close-icon" />
      </DButton>
    </transition>

    <transition name="opacity">
      <div
        v-show="isZoomed"
        :style="contentZoomWrapStyle"
        class="content-zoom-wrap"
      >
        <transition name="scale">
          <template v-if="isZoomed">
            <slot v-if="$slots.zoomed" name="zoomed" />
            <slot v-else />
          </template>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
/** components **/
import DIconClose from "../icons/DIconClose";
import DButton from "../atoms/DButton";
import DLink from "../atoms/DLink";

/**
 * The component allows zoom in slot content to cover all browser viewport.</br>
 * You can pass other content for zoomed contend via slot:zoomed.
 *
 * @version 1.0.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DZoomIn",

  inheritAttrs: false,

  components: { DLink, DIconClose, DButton },

  props: {
    /**
     * Pass any <b>DButton</b> props if needed.
     */
    closeButtonProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.content-zoom-wrap</i> if needed.
     */
    contentZoomWrapStyle: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      isZoomed: false
    };
  },

  methods: {
    zoomInHandler() {
      this.isZoomed = true;

      const body = document.getElementsByTagName("body")[0];
      body.classList.add("__blocked-scroll");

      const closeButton = this.$refs["close-button"].$el.children[0];
      this.$nextTick(() => closeButton.focus());
    },

    zoomOutHandler() {
      this.isZoomed = false;

      const body = document.getElementsByTagName("body")[0];
      body.classList.remove("__blocked-scroll");

      const zoomInLink = this.$refs["zoom-in-link"].$el;
      this.$nextTick(() => zoomInLink.focus());
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";

body {
  &.__blocked-scroll {
    overflow-y: hidden;
  }
}
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/breakpoints";
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/vue-transition-opacity";
@import "../../assets/styles/vue-transition-scale";

.d-zoom-in {
  // @include transition-long;

  .content-wrap {
    cursor: zoom-in;
  }

  .content-zoom-wrap {
    display: flex;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    background: var(--white);

    &.__dark {
      background: var(--black);

      .close-button {
        color: var(--black);
      }
    }
  }

  .close-button {
    display: block;
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 1001;
    cursor: zoom-out; // TODO
  }
}

@include sm-device-max {
  .d-zoom-in {
    .content-zoom-wrap {
      padding: 0;
    }
  }
}

@include md-device-min {
  .d-zoom-in {
    .content-zoom-wrap {
      padding: 20vh 10vw;
    }
  }

  /* .content-zoom-wrap {
    position: relative;
  } */
}

@include lg-device-min {
  .d-zoom-in {
    .content-zoom-wrap {
      padding: 10vh 20vw;
    }
  }
}
</style>
