<template>
  <svg
    class="d-icon-radio-unchecked"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/**
 * Contains svg-code.
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default defineComponent({
  name: "DIconRadioUnchecked"
});
</script>

<style scoped lang="scss">
.d-icon-radio-unchecked {
  rect {
    stroke: currentColor;
  }
}
</style>
