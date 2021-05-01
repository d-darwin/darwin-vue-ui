<template>
  <teleport to="body">
    <transition :name="transitionName">
      <div
        v-if="shown && content"
        :class="{
          [`__${position}`]: position,
          [`${$attrs.class}`]: $attrs.class
        }"
        class="d-notification"
      >
        <!--TODO: use DTypography slot as an alternative-->
        <DTypography
          :content="content"
          v-bind="typographyProps"
          :style="typographyStyle"
        />
      </div>
    </transition>
  </teleport>
</template>

<script>
import DTypography from "../containers/DTypography";

/**
 * The component renders text notification for a given duration.
 *
 * @version 1.1.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DNotification",

  inheritAttrs: false,

  components: { DTypography },

  props: {
    /**
     * Simple string or any HTML.
     */
    content: {
      type: String,
      default: ""
    },

    /**
     * Defines how long the notification will be displayed.
     */
    displayDuration: {
      type: Number,
      default: 5
    },

    /**
     * Positions on the window.
     * Takes values: 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'.
     */
    position: {
      type: String,
      default: "bottom",
      validator: val =>
        [
          "top",
          "top-right",
          "right",
          "bottom-right",
          "bottom",
          "bottom-left",
          "left",
          "top-left"
        ].includes(val)
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
    },

    /**
     * Name of the component transition (animation).
     */
    transitionName: {
      type: String,
      default: "opacity"
    }
  },

  data() {
    return {
      shown: false,
      timeoutHandler: null
    };
  },

  watch: {
    // TODO: move to setup() ???
    content(value) {
      if (value) {
        this.showNotification();
      }
    }
  },

  mounted() {
    this.showNotification();
  },

  beforeUnmount() {
    clearTimeout(this.timeoutHandler);
  },

  methods: {
    showNotification() {
      this.shown = true;

      clearTimeout(this.timeoutHandler);

      this.timeoutHandler = setTimeout(() => {
        this.shown = false;
      }, this.displayDuration * 1000);
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/controls";
// TODO: how not to use it here
@import "../../assets/styles/tokens/shadows";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/shadows";
@import "../../assets/styles/transitions/opacity";

.d-notification {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  z-index: 100;
  pointer-events: none;

  padding: var(--gap-6x) var(--gap-3x);

  &.__top {
    justify-content: center;
  }

  &.__top-right {
    justify-content: flex-end;
  }

  &.__right {
    align-items: center;
    justify-content: flex-end;
  }

  &.__bottom-right {
    align-items: flex-end;
    justify-content: flex-end;
  }

  &.__bottom {
    align-items: flex-end;
    justify-content: center;
  }

  &.__bottom-left {
    align-items: flex-end;
  }

  &.__left {
    align-items: center;
  }

  /*&.__top-left {
  }*/
}

.d-typography {
  @include shadow-medium;

  height: fit-content;
  background: var(--color-text);
  color: var(--white);
  padding: var(--gap-2x) var(--gap-5x);
}
</style>
