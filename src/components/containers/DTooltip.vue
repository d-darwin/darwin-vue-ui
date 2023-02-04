<template>
  <div
    ref="tooltipContainer"
    :class="{
      [`__${verticalPosition}`]: verticalPosition,
      [`__${horizontalPosition}`]: horizontalPosition
    }"
    :aria-describedby="componentId"
    :tabindex="$attrs.tabindex || 0"
    class="d-tooltip"
    @mouseenter="updateShown()"
    @focus="updateShown()"
    @mouseleave="updateShown(false)"
    @blur="updateShown(false)"
  >
    <!-- @slot Tooltip will be added to the content of this slot -->
    <slot />

    <!-- TODO: try to use named transitions instead of css animation-->
    <DTypography
      ref="tooltip"
      :id="componentId"
      :content="!$slots.tooltip ? content : ''"
      :aria-hidden="!isShown"
      v-bind="typographyProps"
      :style="typographyStyle"
      class="tooltip"
    >
      <!-- @slot Replace default tooltip with your own implementation. Slot should have .tooltip class-->
      <slot
        name="tooltip"
        v-bind="{
          componentId,
          isShown,
          content,
          verticalPosition,
          horizontalPosition
        }"
      />
    </DTypography>
  </div>
</template>

<script>
/** core **/
import { ref, onMounted, watch, nextTick } from "vue";

/** utils **/
import getParsedPosition from "../../utils/getParsedPosition";
import getAdjustedPosition from "../../utils/getAdjustedPosition";

/** compositions **/
import useComponentId from "../../compositions/componentId";
import useScrollOffset from "../../compositions/scrollOffset";
import useWindowSize from "../../compositions/windowSize";

/** mixins **/
import typographyContentProp from "../../mixins/typographyContentProp";
import positionFullProp from "../../mixins/positionFullProp";

/** components **/
import DTypography from "./DTypography";

/**
 * Adds tooltip to the child component. Adjusts tooltip position
 * if  there is no space on the window for default positioning.
 *
 * @version 1.3.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DTooltip",

  mixins: [typographyContentProp, positionFullProp],

  components: { DTypography },

  emits: ["update:show"],

  props: {
    /**
     * Defines if position should be automatically adjusted
     * if there is no space on the window for default positioning.
     */
    isPositionAdjustable: {
      type: Boolean,
      default: true
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
    const isShown = ref(false);

    // we will be watching on this to adjust tooltip position
    const { componentId } = useComponentId();
    const { scrollOffset } = useScrollOffset();
    const { windowWidth, windowHeight } = useWindowSize();

    // to manipulate get getBoundingClientRect and adjust tooltip position
    const tooltipContainer = ref(null);
    const tooltip = ref(null);

    const {
      horizontal: defaultHorizontalPosition,
      vertical: defaultVerticalPosition
    } = getParsedPosition(props.position);

    const horizontalPosition = ref(defaultHorizontalPosition);
    const verticalPosition = ref(defaultVerticalPosition);

    onMounted(() => {
      nextTick(() => {
        // We need to wait until children components will be mounted (if there are)
        if (props.isPositionAdjustable) {
          const adjustedPosition = getAdjustedPosition(
            tooltipContainer,
            tooltip,
            windowWidth,
            windowHeight,
            defaultHorizontalPosition,
            defaultVerticalPosition
          );

          horizontalPosition.value = adjustedPosition.horizontal;
          verticalPosition.value = adjustedPosition.vertical;
        }
      });
    });

    // adjust position when something changes
    const watchableList = [scrollOffset, windowWidth, windowHeight, props];
    watchableList.forEach(watchable =>
      watch(watchable, () => {
        if (props.isPositionAdjustable) {
          const adjustedPosition = getAdjustedPosition(
            tooltipContainer,
            tooltip,
            windowWidth,
            windowHeight,
            defaultHorizontalPosition,
            defaultVerticalPosition
          );

          horizontalPosition.value = adjustedPosition.horizontal;
          verticalPosition.value = adjustedPosition.vertical;
        }
      })
    );

    return {
      componentId,
      isShown,
      tooltipContainer,
      tooltip,
      horizontalPosition,
      verticalPosition
    };
  },

  methods: {
    updateShown(show = true) {
      this.isShown = show;

      /**
       * Emits current tooltip state.
       *
       * @event update:show
       * @type {boolean}
       */
      this.$emit("update:show", show);
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/transitions";
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/controls";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/outline";

.d-tooltip {
  position: relative;
  cursor: help;
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;

  &:hover,
  &:focus {
    .tooltip {
      opacity: 1;
      transform: scale(1);
      // visibility: visible;
    }
  }

  &.__top {
    .tooltip {
      bottom: 100%;

      &::after {
        border-bottom: 0;
        border-top-color: var(--color-text);
        bottom: calc(var(--gap-base) * -1);
      }
    }
  }

  &.__top.__right {
    .tooltip {
      border-bottom-left-radius: 0;

      &::after {
        display: none;
      }
    }
  }

  &.__right {
    .tooltip {
      left: 100%;

      &::after {
        border-left: 0;
        border-right-color: var(--color-text);
        left: calc(var(--gap-base) * -1);
      }
    }
  }

  &.__bottom {
    .tooltip {
      top: 100%;

      &::after {
        border-top: 0;
        border-bottom-color: var(--color-text);
        top: calc(var(--gap-base) * -1);
      }
    }
  }

  &.__bottom.__right {
    .tooltip {
      border-top-left-radius: 0;

      &::after {
        display: none;
      }
    }
  }

  &.__bottom.__left {
    .tooltip {
      border-top-right-radius: 0;

      &::after {
        display: none;
      }
    }
  }

  &.__left {
    .tooltip {
      right: 100%;

      &::after {
        border-right: 0;
        border-left-color: var(--color-text);
        right: calc(var(--gap-base) * -1);
      }
    }
  }

  &.__top.__left {
    .tooltip {
      border-bottom-right-radius: 0;

      &::after {
        display: none;
      }
    }
  }

  outline: none;

  &.focus-visible::before {
    @include outline;
  }
}

.tooltip {
  @include transition-short;

  opacity: 0;
  transform: scale(0);
  // visibility: hidden;
  position: absolute;
  width: fit-content;
  max-width: var(--control-min-width); // TODO: I'm not sure about this...
  color: var(--white);
  background: var(--color-text);
  padding: var(--gap-base) var(--gap-2x);
  margin: var(--gap-2x) var(--gap-3x);
  border-radius: var(--border-radius);

  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    position: absolute;
    content: "";
    border: var(--gap-base) solid transparent;
  }
}
</style>
