<template>
  <svg
    :class="{ __disabled: disabled }"
    class="d-icon-checked"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM13.1085 5.41005C13.4679 4.99072 13.4193 4.35942 13 4C12.5807 3.64058 11.9494 3.68914 11.59 4.10847L6.94352 9.5293L5.41421 8C5.02369 7.60948 4.39052 7.60948 4 8C3.60948 8.39052 3.60947 9.02369 4 9.41421L7.05648 12.4707L13.1085 5.41005Z"
    />
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
  name: 'DIconChecked',

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

.d-icon-checked {
  path {
    fill: currentColor;
  }

  &.__disabled {
    path {
      fill: var(--separator);
    }
  }
}
</style>
