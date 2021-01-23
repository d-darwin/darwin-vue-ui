<template>
  <teleport to="body">
    <div
      :class="{ [`${$attrs.class}`]: $attrs.class, __shown: isShown }"
      class="d-drawer"
      @click="closeHandler"
    >
      <div class="drawer-wrap" @click.stop="">
        <DButton
          v-bind="{
            id: closeButtonId,
            iconOnly: true,
            type: 'secondary',
            size: 'medium',
            class: 'close-button',
            ...closeButtonProps,
            onClick: closeHandler
          }"
          :style="closeButtonStyle"
        >
          <DIconClose v-if="!$slots['icon-close']" />
          <!-- @slot You can replace default close icon by passing your own here. -->
          <slot v-else name="icon-close" />
        </DButton>

        <div class="drawer-content" :style="drawerContentStyle">
          <!-- @slot Drawer content -->
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
/** compositions **/
import useClosable from "../../compositions/closable";

/** components **/
import DIconClose from "../icons/DIconClose";
import DButton from "../atoms/DButton";

/**
 * Renders drawer. It's especially useful for navigation, but default slot may receive any content.
 *
 * @version 1.2.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DrawerBase",

  inheritAttrs: false,

  components: { DButton, DIconClose },

  props: {
    /**
     * Show/hide drawer.
     */
    isShown: {
      type: Boolean,
      default: true
    },

    /**
     * Defines position of the component, left or right.
     */
    position: {
      type: String,
      default: "right",
      validate: val => ["left", "right"].includes(val)
    },

    /**
     * Pass any <b>DButton</b> props if needed.
     */
    closeButtonProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.close-button</i> if needed.
     */
    closeButtonStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.drawer-content</i> if needed.
     */
    drawerContentStyle: {
      type: Object,
      default: () => {}
    }
  },

  setup(props, { emit }) {
    const { closeButtonId, closeHandler } = useClosable(props, emit);

    return {
      closeHandler,
      closeButtonId
    };
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";

body {
  &.__blocked-scroll {
    overflow-y: hidden;
  }
}
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/breakpoints";

.d-drawer {
  @include transition-medium;

  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 100vw;

  &.__shown {
    left: 0;
  }

  &:before {
    @include transition-medium;

    opacity: 0;
    position: fixed;
    content: "";
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
}

.drawer-wrap {
  position: relative;
  background: var(--white);
  height: 100%;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  z-index: 10;
}

.close-button {
  position: absolute;
}

@include sm-device-max {
  .close-button {
    // TODO: use gaps ???
    top: 12px;
    right: 12px;
  }
}

@include md-device-min {
  // TODO: move to design tokens ???
  $drawer-width: 400px;

  .close-button {
    // TODO: use gaps ???
    top: 15px;
    right: 15px;
  }

  .d-drawer {
    left: unset;
    right: -100vw;

    &.__shown {
      left: unset;
      right: calc(#{$drawer-width} - 100vw);

      &:before {
        opacity: 0.2;
        background: var(--color-primary);
        pointer-events: all;
      }
    }
  }

  .drawer-wrap {
    width: $drawer-width;
    padding: var(--gap-17x) var(--gap-6x);
  }
}
</style>
