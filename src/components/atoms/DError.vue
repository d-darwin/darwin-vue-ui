<template>
  <transition name="control-error">
    <DTypography v-if="text" :content="text" size="small" class="d-error" />
  </transition>
</template>

<script>
/** components **/
import DTypography from "../containers/DTypography";

/**
 * Helper component to unify error output of the control components.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DError",

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
</style>

<style scoped lang="scss">
@import "../../assets/styles/vue-transitions";

.d-error {
  margin-top: var(--gap-base);
  color: var(--color-danger);
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
