<template>
  <div
    ref="tooltipContainer"
    :class="{
      [`__${verticalPosition}`]: verticalPosition,
      [`__${horizontalPosition}`]: horizontalPosition
    }"
    class="d-tooltip"
  >
    <slot />
    <!--    // TODO: custom one + props + styles;-->
    <DTypography
      ref="tooltip"
      :content="content"
      role="tooltip"
      class="tooltip"
    />
  </div>
</template>

<script>
/** core **/
import { ref, onMounted, watch, nextTick } from "vue";

/** utils **/
import getParsedPosition from "../../utils/getParsedPosition";
import getHTMLElementBoxModel from "../../utils/getHTMLElementBoxModel";
import getOppositePosition from "../../utils/getOppositePosition";

/** compositions **/
import useScrollOffset from "../../compositions/scrollOffset";
import useWindowSize from "../../compositions/windowSize";

/** mixins **/
import typographyContentProp from "../../mixins/typographyContentProp";
import positionFullProp from "../../mixins/positionFullProp";

/** components **/
import DTypography from "./DTypography";

/**
 * Adds tooltip to the child component.
 * @version 1.2.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DTooltip",

  mixins: [typographyContentProp, positionFullProp],

  components: { DTypography },

  props: {
    /**
     * Defines if position should be automatically adjusted
     * if there is no space for default positioning.
     */
    isPositionAdjustable: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    // we will be watching on this to adjust tooltip position
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

    // we should render the component before fill this
    let tooltipBoxModel = {};

    // TODO: move to compositions / utils ???
    function adjustPosition(
      tooltipContainer,
      windowWidth,
      windowHeight,
      horizontalPosition,
      verticalPosition,
      defaultHorizontalPosition,
      defaultVerticalPosition
    ) {
      const tooltipContainerClientRect =
        tooltipContainer.value &&
        tooltipContainer.value.getBoundingClientRect();

      if (tooltipContainerClientRect) {
        const tooltipContainerClientSpace = {
          top: tooltipContainerClientRect.top,
          right: windowWidth.value - tooltipContainerClientRect.right,
          bottom: windowHeight.value - tooltipContainerClientRect.bottom,
          left: tooltipContainerClientRect.left
        };

        const spaceForTooltip = {
          top: tooltipBoxModel.offsetHeight + tooltipBoxModel.marginBottom,
          right: tooltipBoxModel.offsetWidth + tooltipBoxModel.marginLeft,
          bottom: tooltipBoxModel.offsetHeight + tooltipBoxModel.marginTop,
          left: tooltipBoxModel.offsetWidth + tooltipBoxModel.marginRight
        };

        verticalPosition.value = getAdjustedAxePosition(
          tooltipContainerClientSpace,
          spaceForTooltip,
          defaultVerticalPosition
        );

        horizontalPosition.value = getAdjustedAxePosition(
          tooltipContainerClientSpace,
          spaceForTooltip,
          defaultHorizontalPosition
        );
      }
    }

    function getAdjustedAxePosition(
      tooltipContainerClientSpace,
      spaceForTooltip,
      axeDefaultPosition
    ) {
      if (axeDefaultPosition) {
        const oppositeAxePosition = getOppositePosition(axeDefaultPosition);

        console.log(tooltipContainerClientSpace, spaceForTooltip);

        if (
          tooltipContainerClientSpace[axeDefaultPosition] >
          spaceForTooltip[axeDefaultPosition]
        ) {
          // there is enough space in the default position (user defined)
          return axeDefaultPosition;
        } else if (
          tooltipContainerClientSpace[oppositeAxePosition] >
          spaceForTooltip[oppositeAxePosition]
        ) {
          // there is in the opposite position
          return oppositeAxePosition;
        }
      }

      // there in no space at all => remove axe positioning (center)
      return "";
    }

    onMounted(() => {
      if (props.isPositionAdjustable) {
        /* const mutationObserver = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            adjustPosition(
              tooltipContainer,
              windowWidth,
              windowHeight,
              horizontalPosition,
              verticalPosition,
              defaultHorizontalPosition,
              defaultVerticalPosition
            );
          });
        });
        mutationObserver.observe(tooltipContainer.value, {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true,
          attributeOldValue: true,
          characterDataOldValue: true
        }); */

        // hold size and margin of the tooltip
        // TODO: recalculate BoxModel when needed
        tooltipBoxModel = getHTMLElementBoxModel(
          tooltip.value && tooltip.value.$el
        );
        // TODO: mark tooltip as not shown
        // TODO: add animationNameProp and use v-if to animate
        adjustPosition(
          tooltipContainer,
          windowWidth,
          windowHeight,
          horizontalPosition,
          verticalPosition,
          defaultHorizontalPosition,
          defaultVerticalPosition
        );
      }
    });

    const watchableList = [
      scrollOffset,
      windowWidth,
      windowHeight,
      tooltipContainer,
      props
    ];
    watchableList.forEach(watchable =>
      watch(watchable, () => {
        if (props.isPositionAdjustable) {
          adjustPosition(
            tooltipContainer,
            windowWidth,
            windowHeight,
            horizontalPosition,
            verticalPosition,
            defaultHorizontalPosition,
            defaultVerticalPosition
          );
        }
      })
    );

    return {
      tooltipContainer,
      tooltip,
      horizontalPosition,
      verticalPosition
    };
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

.d-tooltip {
  position: relative;
  cursor: help;
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;

  &:hover {
    .tooltip {
      opacity: 1;
      transform: scale(1);
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

  &.__center {
    // Don't really need any styles
  }
}

.tooltip {
  @include transition-short;

  opacity: 0;
  transform: scale(0);
  position: absolute;
  width: fit-content;
  max-width: var(--control-min-width); // TODO: I'm not sure about this...
  color: var(--white);
  background: var(--color-text);
  padding: var(--gap-base) var(--gap-2x);
  margin: var(--gap-2x) var(--gap-3x);
  border-radius: var(--border-radius);
  word-break: break-all;

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
