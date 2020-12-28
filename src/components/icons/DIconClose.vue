<template>
  <svg
    class="d-icon-close"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 1L15 0L0 15L1 16L16 1Z" />
    <path d="M0 1L1 0L16 15L15 16L0 1Z" />
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
  name: "DIconClose"
};
</script>

<style scoped lang="scss">
.d-icon-close {
  path {
    fill: currentColor;
  }
}
</style>
