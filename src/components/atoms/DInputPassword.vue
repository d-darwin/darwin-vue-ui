<template>
  <DInput
    :type="isVisible ? 'text' : 'password'"
    v-bind="$attrs"
    class="d-input-password"
  >
    <template #after>
      <transition :name="transitionName" @click="toggleVisibility">
        <span
          v-if="isVisible"
          :style="visibilityToggleStyle"
          class="visibility-toggle"
        >
          <DIconEyeOff v-if="!$slots['icon-visible']" />
          <!-- @slot You can replace default visible icon by passing your own here. -->
          <slot v-else name="icon-visible" />
        </span>
        <span v-else :style="visibilityToggleStyle" class="visibility-toggle">
          <DIconEye v-if="!$slots['icon-invisible']" />
          <!-- @slot You can replace default invisible icon by passing your own here. -->
          <slot v-else name="icon-invisible" />
        </span>
      </transition>
    </template>
  </DInput>
</template>

<script>
import DInput from "./DInput";
import DIconEye from "../icons/DIconEye";
import DIconEyeOff from "../icons/DIconEyeOff";

/**
 * The component renders <b>input</b> tag with password <b>type</b> and visibility toggle.<br>
 * It uses <b>DInput</b> component so you can pass any compatible props.<br>
 *
 * @version 1.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  // TODO: what about toggle a11y ???
  name: "DInputPassword",

  inheritAttrs: false,

  components: { DIconEyeOff, DIconEye, DInput },

  // TODO: there is no automatic pass to DInput
  // TODO: there is rerendering issue on update:visibility in Storybook
  emits: ["update:value", "submit", "update:visibility"],

  props: {
    // TODO: write all DInput props in plain style to document it in Storybook???

    /**
     * Pass any style object to <i>.visibility-toggle-style</i> if needed.
     */
    visibilityToggleStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Name of the component transition (animation).
     */
    transitionName: {
      type: String,
      default: "opacity"
    }
  },

  data() {
    return {
      isVisible: false
    };
  },

  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;

      /**
       * Visibility of the password changed.
       *
       * @event update:visibility
       * @type {Boolean}
       */
      this.$emit("update:visibility", this.isVisible);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/transitions/opacity";

.visibility-toggle {
  pointer-events: all;
  cursor: pointer;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
