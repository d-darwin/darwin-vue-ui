<template>
  <div class="d-progress-bar">
    <div class="bar-wrap">
      <div :style="{ width }" :class="{ __full: value === 100 }" class="bar" />
    </div>

    <DTypography :content="`${value || 0}%`" size="small" />
  </div>
</template>

<script>
import DTypography from "../containers/DTypography";

/**
 * TODO
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DProgressBar",

  components: { DTypography },

  props: {
    /**
     * TODO
     */
    value: {
      type: Number,
      default: 0,
      validator: val => val >= 0 && val <= 100
    }
  },

  computed: {
    width() {
      return `${((160 - 8) * this.value) / 100}px`;
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
</style>

<style scoped lang="scss">
.d-progress-bar {
  display: flex;
  align-items: center;
  height: 12px;
}

.bar-wrap {
  width: 160px;
  min-width: 160px;
  height: 12px;
  border: 1px solid var(--color-text-alt);
  border-radius: 6px;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.bar {
  height: 4px;
  border-radius: 2px;
  margin-left: 3px;
  background: var(--color-primary-active);

  &:not(.__full) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
