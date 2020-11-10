<template>
  <svg
    class="d-icon-unchecked"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H14C14.5523 15 15 14.5523 15 14V2C15 1.44772 14.5523 1 14 1ZM2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2Z"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/**
 * Contains svg-code.
 *
 * @version 1.0.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default defineComponent({
  name: "DIconUnchecked"
});
</script>

<style scoped lang="scss">
.d-icon-unchecked {
  path {
    fill: currentColor;
  }
}
</style>
