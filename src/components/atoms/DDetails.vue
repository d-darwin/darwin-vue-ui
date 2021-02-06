<template>
  <details :open="isOpened" class="d-details">
    <summary
      :style="summaryStyle"
      class="summary"
      @click.prevent="summaryClickHandler"
    >
      <DTypography v-if="!$slots.summary" :content="summary" />
      <!-- @slot You can use custom summary content, not just a string -->
      <slot v-else name="summary" />
    </summary>

    <div :style="detailsContentStyle" class="details-content">
      <DTypography v-if="!$slots.default" :content="content" />
      <!-- @slot You can use custom details content, not just a string -->
      <slot v-else name="default" />
    </div>
  </details>
</template>

<script>
import DTypography from "../containers/DTypography";

/**
 * // TODO
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DDetails",

  components: { DTypography },

  props: {
    // TODO
    summary: {
      type: [String, Number],
      default: ""
    },

    // TODO
    content: {
      type: [String, Number],
      default: ""
    },

    /**
     * Pass any style object to <i>.summary</i> if needed.
     */
    summaryStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.details-content</i> if needed.
     */
    detailsContentStyle: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      isOpened: false
    };
  },

  methods: {
    summaryClickHandler() {
      console.log("summaryClickHandler: TODO animation");
      this.isOpened = !this.isOpened;
    }
  }
};
</script>

<style scoped lang="scss">
// @import './assets/styles/colors';

.summary {
  display: flex;
  align-items: center;
}
</style>
