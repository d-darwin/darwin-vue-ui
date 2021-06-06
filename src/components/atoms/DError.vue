<template>
  <transition :name="transitionName">
    <div v-if="content || $slots.default" class="d-error">
      <DTypography
        v-bind="{
          size: 'small',
          content,
          ...$attrs
        }"
      >
        <!-- @slot Pass your custom error HTML here -->
        <slot />
      </DTypography>
    </div>
  </transition>
</template>

<script>
/** mixins **/
import typographyContentProp from "../../mixins/typographyContentProp";

/** components **/
import DTypography from "../containers/DTypography";

/**
 * Helper component to unify error output of the control components.
 *
 * @version 1.2.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DError",

  inheritAttrs: false,

  mixins: [typographyContentProp],

  components: {
    DTypography
  },

  props: {
    /**
     * Name of the component transition (animation).
     */
    transitionName: {
      type: String,
      default: "error"
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
@import "../../assets/styles/transitions/error";

.d-error {
  margin-top: var(--gap-base);
  color: var(--color-danger);
  text-overflow: ellipsis;
  overflow: hidden;
  width: fit-content;
}
</style>
