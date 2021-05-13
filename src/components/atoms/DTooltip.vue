<template>
  <div class="d-tooltip">
    <slot />
    <DTypography :content="content" role="tooltip" />
  </div>
</template>

<script>
/** mixins **/
import typographyContentProp from "../../mixins/typographyContentProp";

/** components **/
import DTypography from "../containers/DTypography";

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
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/transitions";
@import "../../assets/styles/tokens/colors";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";

.d-tooltip {
  position: relative;
  cursor: help;
  display: flex;

  &:hover {
    .d-typography {
      opacity: 1;
    }
  }
}

.d-typography {
  opacity: 0;
  position: absolute;
  color: var(--white);
  background: var(--color-text);

  @include transition-short;
}
</style>
