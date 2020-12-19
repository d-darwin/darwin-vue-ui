<template>
  <transition name="control-error">
    <DTypography
      v-if="text"
      :class="{ ...$attrs.class }"
      :content="text"
      size="small"
      class="d-error"
    />
  </transition>
</template>

<script>
/** components **/
import DTypography from "../containers/DTypography";

/**
 * Helper component to unify error output of the control components.
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DError",

  inheritAttrs: false,

  components: {
    DTypography
  },

  props: {
    /**
     * If not empty renders as an error string.
     */
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/typography";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";

.d-error {
  margin-top: var(--gap-base);
  color: var(--color-danger);
  text-overflow: ellipsis;
  overflow: hidden;
}

.control-error-enter-from,
.control-error-leave-to {
  opacity: 0;
  transform: translateY(-25%);
  max-height: 0;
  overflow: hidden;
}

.control-error-enter-to,
.control-error-leave-from {
  opacity: 1;
  transform: translateY(0);
  // error message shouldn't be too long
  max-height: calc(var(--small-line-height) * 3);
}

.control-error-enter-active,
.control-error-leave-active {
  @include transition-short;
}
</style>
