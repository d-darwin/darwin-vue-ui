<template>
  <transition :name="transitionName">
    <div v-if="content" class="d-error">
      <DTypography
        v-bind="{
          size: 'small',
          ...$attrs,
          ...$props
        }"
      >
        <!-- @slot Pass your custom error HTML here -->
        <slot />
      </DTypography>
    </div>
  </transition>
</template>

<script>
/** components **/
import DTypography from "../containers/DTypography";

/**
 * Helper component to unify error output of the control components.
 *
 * @version 1.1.1
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
