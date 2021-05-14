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
    <DTypography ref="tooltip" :content="content" role="tooltip" />
  </div>
</template>

<script>
/** core **/
import { ref, onMounted, watch } from "vue";

/** utils **/
import isHTMLElement from "../../utils/isHTMLElement";

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
 * @version 1.0.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DTooltip",

  mixins: [typographyContentProp, positionFullProp],

  components: { DTypography },

  setup(props) {
    // TODO: do we really need this
    const { windowWidth, windowHeight } = useWindowSize();
    const { scrollOffset } = useScrollOffset();

    // to manipulate get getBoundingClientRect and adjust tooltip position in adjustPosition
    const tooltipContainer = ref(null);
    const tooltip = ref(null);

    // TODO: parse: semi-variants (top-right)
    const defaultHorizontalPosition = ["left", "right"].includes(props.position)
      ? props.position
      : null;
    const horizontalPosition = ref(defaultHorizontalPosition);

    const defaultVerticalPosition = ["top", "bottom"].includes(props.position)
      ? props.position
      : null;
    const verticalPosition = ref(defaultVerticalPosition);

    let tooltipBoxModel = {};

    /**
     * Return current sizes and margins of the tooltipElement.
     * @param tooltipElement
     * @returns {{
     *  offsetHeight: number,
        offsetWidth: number,
        marginTop: number,
        marginRight: number,
        marginBottom: number,
        marginLeft: number} || {}}
     */
    function getTooltipBoxModel(tooltipElement) {
      let tooltipBoxModel = {};
      if (isHTMLElement(tooltipElement)) {
        const {
          marginBottom,
          marginTop,
          marginLeft,
          marginRight
        } = getComputedStyle(tooltipElement);

        tooltipBoxModel = {
          offsetHeight: tooltipElement.offsetHeight,
          offsetWidth: tooltipElement.offsetWidth,
          marginTop: parseFloat(marginTop),
          marginRight: parseFloat(marginRight),
          marginBottom: parseFloat(marginBottom),
          marginLeft: parseFloat(marginLeft)
        };
      }

      return tooltipBoxModel;
    }

    function adjustPosition(scrollOffset) {
      console.log(scrollOffset, windowWidth, windowHeight);

      const tooltipContainerClientRect =
        tooltipContainer.value &&
        tooltipContainer.value.getBoundingClientRect();

      if (tooltipContainerClientRect) {
        // const tooltipContainerTop = tooltipContainerClientRect.top;
        // const tooltipContainerBottom = tooltipContainerClientRect.bottom;

        // tooltipMarginBottom = parseFloat(tooltipMarginBottom);
        // tooltipMarginTop = parseFloat(tooltipMarginTop);
        // tooltipMarginLeft = parseFloat(tooltipMarginLeft);
        // tooltipMarginRight = parseFloat(tooltipMarginRight);
        // console.log(tooltipContainerClientRect);
        const spaceForTooltipOnTop =
          tooltipBoxModel.offsetHeight + tooltipBoxModel.marginBottom;
        const spaceForTooltipOnBottom =
          tooltipBoxModel.offsetHeight + tooltipBoxModel.marginTop;
        const spaceForTooltipOnLeft =
          tooltipBoxModel.offsetWidth + tooltipBoxModel.marginRight;
        const spaceForTooltipOnRight =
          tooltipBoxModel.offsetWidth + tooltipBoxModel.marginLeft;

        // console.log(windowHeight.value, tooltipContainerBottom);

        // 1. если ушел за экран вверх, то флипаем вниз
        // TODO: а что, если влезает справа/лева ???
        if (tooltipContainerClientRect.top < spaceForTooltipOnTop) {
          // TODO: если нет места ни там, ни там, то по центру
          verticalPosition.value = "bottom";
        } else if (
          // TODO: если нет места ни там, ни там, то по центру
          windowHeight.value - tooltipContainerClientRect.bottom <
          spaceForTooltipOnBottom
        ) {
          verticalPosition.value = "top";
        } else {
          verticalPosition.value = defaultVerticalPosition;
        }
        // 2. если ушел за экран слева / справа - меняем на противоположный ???
        // TODO, a что если место есть сверху/снизу ???
        if (tooltipContainerClientRect.left < spaceForTooltipOnLeft) {
          horizontalPosition.value = "right";
        } else if (
          windowWidth.value - tooltipContainerClientRect.right <
          spaceForTooltipOnRight
        ) {
          horizontalPosition.value = "left";
        } else {
          horizontalPosition.value = defaultHorizontalPosition;
        }
      }
    }

    onMounted(() => {
      // hold size and margin of the tooltip
      // TODO: recalculate BoxModel when needed
      tooltipBoxModel = getTooltipBoxModel(tooltip.value && tooltip.value.$el);
      // TODO: mark tooltip as not shown
      // TODO: add animationNameProp and use v-if to animate
      adjustPosition(scrollOffset);
    });

    watch(scrollOffset, adjustPosition);
    watch(windowWidth, adjustPosition);
    watch(windowHeight, adjustPosition);

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
    .d-typography {
      opacity: 1;
      transform: scale(1);
    }
  }

  &.__top {
    .d-typography {
      bottom: 100%;
    }
  }

  &.__right {
    .d-typography {
      left: 100%;
    }
  }

  &.__bottom {
    .d-typography {
      top: 100%;
    }
  }

  &.__left {
    .d-typography {
      right: 100%;
    }
  }

  &.__center {
    // Don't really need any styles
  }
}

.d-typography {
  @include transition-short;

  opacity: 0;
  transform: scale(0);
  position: absolute;
  width: fit-content;
  max-width: var(--control-min-width); // TODO: I'm not sure about this...
  color: var(--white);
  background: var(--color-text);
  padding: var(--gap-base) var(--gap-2x);
  margin: var(--gap-base) var(--gap-2x);
  border-radius: var(--border-radius);
}
</style>
