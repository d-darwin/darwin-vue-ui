<template>
  <DInput
    :type="isVisible ? 'text' : 'password'"
    :class="$attrs.class"
    v-bind="{ ...$props, ...$attrs }"
    class="d-input-password"
  >
    <template #after>
      <transition
        name="opacity"
        :style="visibilityToggleStyle"
        class="visibility-toggle"
        @click="toggleVisibility"
      >
        <span v-if="isVisible">
          <DIconEyeOff v-if="!$slots['icon-visible']" />
          <!-- @slot You can replace default visible icon by passing your own here. -->
          <slot v-else name="icon-visible" />
        </span>
        <span v-else>
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
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DInputPassword",

  inheritAttrs: false,

  components: { DIconEyeOff, DIconEye, DInput },

  props: {
    /**
     * Pass any style object to <i>.visibility-toggle-style</i> if needed.
     */
    visibilityToggleStyle: {
      type: Object,
      default: () => {}
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
