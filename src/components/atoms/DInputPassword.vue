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
        <DIconEyeOff v-if="isVisible" />
        <DIconEye v-else />
      </transition>
    </template>
  </DInput>
</template>

<script>
import DInput from "./DInput";
import DIconEye from "../icons/DIconEye";
import DIconEyeOff from "../icons/DIconEyeOff";

/**
 * TODO
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
    },
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
}
</style>
