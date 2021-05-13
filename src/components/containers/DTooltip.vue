<template>
  <div :class="{ [`__${position}`]: position }" class="d-tooltip">
    <slot />
    <DTypography ref="tooltip" :content="content" role="tooltip" />
  </div>
</template>

<script>
/** mixins **/
import typographyContentProp from "../../mixins/typographyContentProp";

/** components **/
import DTypography from "./DTypography";

/**
 * @version 1.0.0
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
      validate: val => ["top", "right", "bottom", "left"].includes(val)
    }
  },

  mounted() {
    // TODO: add detection of window and flip top/bottom, right/left
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
