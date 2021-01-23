<template>
  <svg
    class="d-icon-arrow"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 19V5"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5 12L12 5L19 12"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
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
  name: "DIconArrow"
};
</script>

<style scoped lang="scss">
.d-icon-arrow {
  path {
    stroke: currentColor;
  }
}
</style>
