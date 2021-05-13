<template>
  <teleport to="body">
    <transition :name="backdropTransitionName">
      <DBackdrop v-if="isShown" @click="closeHandler" />
    </transition>

    <div
      :class="{
        __shown: isShown,
        [`__${position}`]: position,
        [`${$attrs.class}`]: $attrs.clas
      }"
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
import DBackdrop from "../atoms/DBackdrop";

/**
 * Renders drawer. It's especially useful for navigation, but default slot may receive any content.
 *
 * @version 1.5.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DrawerBase",

  inheritAttrs: false,

  components: { DBackdrop, DButton, DIconClose },

  emits: ["close"],

  props: {
    /**
     * Show/hide drawer.
     */
    isShown: {
      type: Boolean,
      default: true
    },

    /**
     * Defines position of the component.
     */
    position: {
      // TODO: move to mixins ???
      type: String,
      default: "right",
      validate: val => ["top", "right", "bottom", "left"].includes(val)
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
    },

    /**
     * Name of the <b>DBackdrop</b> transition (animation).
     */
    backdropTransitionName: {
      type: String,
      default: "opacity-backdrop"
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
@import "../../assets/styles/transitions/opacity-backdrop";

.d-drawer {
  @include transition-medium;

  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  position: fixed;

  &.__top {
    top: -100vh;
    left: 0;

    .drawer-wrap {
      min-width: 100vw;
    }

    &.__shown {
      top: 0;
    }
  }

  &.__right {
    right: -100vw;
    top: 0;

    .drawer-wrap {
      min-height: 100vh;
    }

    &.__shown {
      right: 0;
    }
  }

  &.__bottom {
    bottom: -100vh;
    left: 0;

    .drawer-wrap {
      min-width: 100vw;
    }

    &.__shown {
      bottom: 0;
    }
  }

  &.__left {
    left: -100vw;
    top: 0;

    .drawer-wrap {
      min-height: 100vh;
    }

    &.__shown {
      left: 0;
    }
  }
}

.drawer-wrap {
  box-sizing: border-box;
  position: relative;
  background: var(--white);
  height: 100%;
  width: 100%;
  overflow-y: auto;
  z-index: 10;
}

.drawer-content {
  height: 100%;
}

.close-button {
  position: absolute;
}

@include sm-device-max {
  .close-button {
    top: 12px;
    right: 12px;
  }
}

@include md-device-min {
  .d-drawer {
    --drawer-width: 400px;
    --drawer-height: 400px;

    &.__top {
      &.__shown {
        top: 0; // calc(var(--drawer-height) - 100vh);
      }

      .drawer-wrap {
        height: var(--drawer-height);
      }
    }

    &.__right {
      &.__shown {
        right: calc(var(--drawer-width) - 100vw);
      }

      .drawer-wrap {
        width: var(--drawer-width);
      }
    }

    &.__bottom {
      &.__shown {
        bottom: 0; // calc(var(--drawer-height) - 100vh);
      }

      .drawer-wrap {
        height: var(--drawer-height);
        margin-top: auto;
      }
    }

    &.__left {
      &.__shown {
        left: calc(var(--drawer-width) - 100vw);
      }

      .drawer-wrap {
        width: var(--drawer-width);
        margin-left: auto;
      }
    }

    &.__shown {
      &:before {
        opacity: 0.2;
        background: var(--color-primary);
        pointer-events: all;
      }
    }
  }

  .drawer-wrap {
    padding: var(--gap-17x) var(--gap-6x);
  }

  .close-button {
    top: 15px;
    right: 15px;
  }
}
</style>
