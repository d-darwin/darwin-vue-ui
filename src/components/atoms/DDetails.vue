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

    <div
      ref="details-content"
      :style="detailsContentStyle"
      :class="{ __expanded: isExpended }"
      class="details-content"
    >
      <DTypography v-if="!$slots.default" :content="content" />
      <!-- @slot You can use custom details content, not just a string -->
      <slot v-else name="default" />
    </div>
  </details>
</template>

<script>
/** design tokens **/
import transitionTokens from "../../assets/styles/tokens/_transitions.scss";

/** components **/
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

  inheritAttrs: false,

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
      isOpened: false,
      isExpended: false,
      transitionTime: parseInt(transitionTokens["transition-time-medium"])
    };
  },

  methods: {
    async summaryClickHandler() {
      if (this.isOpened) {
        this.isExpended = false;

        // browser will completely hide .details-content only after transition finishes
        setTimeout(() => {
          this.isOpened = false;
        }, this.transitionTime);
      } else {
        this.isOpened = true;

        setTimeout(() => {
          // use timeout to hack event loop
          this.isExpended = true;
        }, 0);
      }
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/outline";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/outline";

.summary {
  position: relative;
  display: flex;
  align-items: center;

  outline: none;

  &.focus-visible {
    &:before {
      @include outline;
    }
  }
}

.details-content {
  @include transition-medium;

  height: 0;
  overflow: hidden;
  background: red;

  &.__expanded {
    height: 64px;
  }
}
</style>
