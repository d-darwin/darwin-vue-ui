<template>
  <svg
    class="d-icon-copy"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.667 7.5h-7.5c-.92 0-1.667.746-1.667 1.667v7.5c0 .92.746 1.666 1.667 1.666h7.5c.92 0 1.666-.746 1.666-1.666v-7.5c0-.92-.746-1.667-1.666-1.667z"
      stroke="#282828"
      stroke-width="1.667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.167 12.5h-.834a1.667 1.667 0 01-1.667-1.667v-7.5a1.667 1.667 0 011.667-1.666h7.5A1.667 1.667 0 0112.5 3.333v.834"
      stroke-width="1.667"
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
  name: "DIconCopy"
};
</script>

<style scoped lang="scss">
.d-icon-copy {
  path {
    stroke: currentColor;
  }
}
</style>
