<template>
  <transition :name="transitionName">
    <DTypography
      v-if="content"
      :class="$attrs.class"
      :content="content"
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
 * @version 1.0.3
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
     * If not empty renders as an error HTML string.
     */
    content: {
      type: [String, Number],
      default: ""
    },

    /**
     * Name of the component transition (animation).
     */
    transitionName: {
      type: String,
      default: "error"
    }

    // TODO: allow to pass other DTypography props
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";
</style>

<style scoped lang="scss">
@import "../../assets/styles/transitions/error";

.d-error {
  margin-top: var(--gap-base);
  color: var(--color-danger);
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
