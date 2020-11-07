<template>
  <svg
    :class="{ __disabled: disabled }"
    class="d-icon-radio-checked"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="3" width="10" height="10" rx="5" stroke-width="6" />
  </svg>
</template>

<script>
/**
 * Contains svg-code.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'IconRadioButtonChecked',

  props: {
    /**
     * Defines color of the component
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/tokens/colors';

.d-icon-radio-checked {
  rect {
    stroke: currentColor;
  }

  &.__disabled {
    cursor: not-allowed;

    rect {
      stroke: var(--separator);
    }
  }
}
</style>
