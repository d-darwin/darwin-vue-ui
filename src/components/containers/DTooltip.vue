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

/** compositions **/
import useScrollOffset from "../../compositions/scrollOffset";
import useWindowSize from "../../compositions/windowSize";

/** mixins **/
import typographyContentProp from "../../mixins/typographyContentProp";

/** components **/
import DTypography from "./DTypography";

/**
 * Adds tooltip to the child component.
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DTooltip",

  mixins: [typographyContentProp],

  components: { DTypography },

  props: {
    /**
     * Defines position of the component.
     */
    position: {
      // TODO: move to mixins ???
      type: String,
      default: "right",
      validate: val =>
        [
          "top",
          "top-right",
          "right",
          "bottom",
          "bottom-right",
          "bottom-left",
          "left",
          "top-left"
        ].includes(val)
    }
  },

  setup(props) {
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
    const { windowWidth, windowHeight } = useWindowSize();
    const { scrollOffset } = useScrollOffset();

    function adjustPosition(scrollOffset) {
      console.log(scrollOffset, windowWidth, windowHeight);

      const tooltipContainerClientRect =
        tooltipContainer.value &&
        tooltipContainer.value.getBoundingClientRect();

      if (tooltipContainerClientRect) {
        // const tooltipContainerTop = tooltipContainerClientRect.top;
        // const tooltipContainerBottom = tooltipContainerClientRect.bottom;

        const tooltipOffsetHeight =
          tooltip.value && tooltip.value.$el.offsetHeight;
        const tooltipOffsetWidth =
          tooltip.value && tooltip.value.$el.offsetWidth;

        let {
          marginBottom: tooltipMarginBottom,
          marginTop: tooltipMarginTop,
          marginLeft: tooltipMarginLeft,
          marginRight: tooltipMarginRight
        } = tooltip.value && getComputedStyle(tooltip.value.$el);

        tooltipMarginBottom = parseFloat(tooltipMarginBottom);
        tooltipMarginTop = parseFloat(tooltipMarginTop);
        tooltipMarginLeft = parseFloat(tooltipMarginLeft);
        tooltipMarginRight = parseFloat(tooltipMarginRight);
        // console.log(tooltipContainerClientRect);
        const spaceForTooltipOnTop = tooltipOffsetHeight + tooltipMarginBottom;
        const spaceForTooltipOnBottom = tooltipOffsetHeight + tooltipMarginTop;
        const spaceForTooltipOnLeft = tooltipOffsetWidth + tooltipMarginRight;
        const spaceForTooltipOnRight = tooltipOffsetWidth + tooltipMarginLeft;

        // console.log(windowHeight.value, tooltipContainerBottom);

        // 1. если ушел за экран вверх, то флипаем вниз
        // TODO: а что, если влезает справа/лева ???
        if (tooltipContainerClientRect.top < spaceForTooltipOnTop) {
          verticalPosition.value = "bottom";
        } else if (
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
}

.d-typography {
  @include transition-short;

  opacity: 0;
  transform: scale(0);
  position: absolute;
  color: var(--white);
  background: var(--color-text);
  padding: var(--gap-base) var(--gap-2x);
  margin: var(--gap-base) var(--gap-2x);
  border-radius: var(--border-radius);
}
</style>
