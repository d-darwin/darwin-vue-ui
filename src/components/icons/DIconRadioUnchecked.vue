<template>
  <svg
    :class="{ __disabled: disabled }"
    class="icon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" />
  </svg>
</template>

<script>
/**
 * Компонент содержит svg-код.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'IconRadioButtonUnchecked',

  props: {
    /**
     * Определяет цвет компонента.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
@import './assets/styles/colors';

.icon {
  rect {
    stroke: $text-aux;
  }

  &.__disabled {
    cursor: not-allowed;

    rect {
      stroke: $separator;
    }
  }
}
</style>
