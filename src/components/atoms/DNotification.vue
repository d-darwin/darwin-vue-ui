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
        <!--TODO: add default slot-->
      </div>
    </transition>
  </teleport>
</template>

<script>
/** mixins **/
import typographyContentProp from "../../mixins/typographyContentProp";
import positionFullProp from "../../mixins/positionFullProp";

/** components **/
import DTypography from "../containers/DTypography";

/**
 * The component renders text notification for a given duration.
 *
 * @version 1.2.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DNotification",

  inheritAttrs: false,

  mixins: [typographyContentProp, positionFullProp],

  components: { DTypography },

  emits: ["update:visibility"],

  props: {
    // TODO: add notification type, may be 'primary', 'secondary'... or 'notification', 'warning'...

    /**
     * Defines how long the notification will be displayed.
     */
    displayDuration: {
      type: Number,
      default: 5
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
        this.$emit;
        this.showNotification();
      }
    },
    shown(value) {
      /**
       * Visibility of the component changed.
       *
       * @event update:visibility
       * @type {Boolean}
       */
      this.$emit("update:visibility", value);
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
  box-sizing: border-box; // TODO: or turn it on by default for all components???
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  z-index: 100;
  pointer-events: none;

  padding: var(--gap-6x) var(--gap-3x);

  // TODO: try to avoid complex top-right and just reuse __top + __right
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

  &.__top-left {
    // Don't really need any styles
  }

  &.__center {
    align-items: center;
    justify-content: center;
  }
}

.d-typography {
  @include shadow-medium;

  height: fit-content;
  background: var(--color-text);
  color: var(--white);
  padding: var(--gap-2x) var(--gap-5x);
}
</style>
