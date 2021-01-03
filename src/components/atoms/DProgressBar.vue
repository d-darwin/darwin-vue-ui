<template>
  <div :class="$attrs.class" class="d-progress-bar">
    <div class="bar-wrap" :style="barWrapStyle">
      <div
        :class="{ __full: value === 100 }"
        :style="{ width, ...barStyle }"
        class="bar"
      />
    </div>

    <DTypography
      v-bind="{
        content: `${value || 0}%`,
        size: 'small',
        ...typographyProps
      }"
      :style="typographyStyle"
    />
  </div>
</template>

<script>
import DTypography from "../containers/DTypography";

/**
 * Renders custom progress bar.
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DProgressBar",

  inheritAttrs: false,

  components: { DTypography },

  props: {
    /**
     * Percentage of progress.
     */
    value: {
      type: Number,
      default: 0,
      validator: val => val >= 0 && val <= 100
    },

    /**
     * Pass any style object to <i>.bar-wrap</i> if needed.
     */
    barWrapStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.bar</i> if needed.
     */
    barStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any <b>DTypography</b> props if needed.
     */
    typographyProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.d-typography</i> if needed.
     */
    typographyStyle: {
      type: Object,
      default: () => {}
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
