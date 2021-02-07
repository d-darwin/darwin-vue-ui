<template>
  <details
    :open="isOpened"
    :class="{
      [`${$attrs.class}`]: $attrs.class,
      [`__${size}`]: size,
      [`__${roundness}`]: roundness
    }"
    class="d-details"
  >
    <summary
      :style="summaryStyle"
      class="summary"
      @click.prevent="summaryClickHandler"
    >
      <template v-if="!$slots.summary">
        <!-- @slot You can use custom icon before summary -->
        <slot v-if="$slots['icon-before']" name="icon-before" />

        <DTypography
          v-bind="{
            content: summary,
            ...summaryTypographyProps
          }"
          :style="summaryTypographyStyle"
        />

        <DIconDirection
          v-if="!$slots['icon-after']"
          :type="isExpended ? 'up' : 'down'"
        />
        <!-- @slot You can use custom icon after summary -->
        <slot v-else name="icon-after" />
      </template>
      <!-- @slot You can use custom summary content, not just a string -->
      <slot v-else name="summary" />
    </summary>

    <div
      ref="details-content"
      :style="{
        ...detailsContentStyle,
        height: resetHeight ? 'auto' : isExpended ? contentHeight + 'px' : '0'
      }"
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
import DIconDirection from "../icons/DIconDirection";

/**
 * Renders <b>details</b> tag with summary, custom focus-visible and icon.<br>
 * May be in various sizes and have different corner roundness.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DDetails",

  components: { DIconDirection, DTypography },

  inheritAttrs: false,

  props: {
    /**
     * Content of the <b>summary</b> tag. It uses <b>DTypography</b> so any HTML string may be passed.
     */
    summary: {
      type: [String, Number],
      default: ""
    },

    /**
     * Content of the <b>details</b> tag. It uses <b>DTypography</b> so any HTML string may be passed.
     */
    content: {
      type: [String, Number],
      default: ""
    },

    /**
     * Defines vertical size of the component summary.<br>
     * Takes values: 'large', 'medium', 'small'.
     */
    size: {
      type: String,
      default: "large",
      validator: val => ["large", "medium", "small"].includes(val)
    },

    /**
     * Defines corner's roundness of the component.<br>
     * Takes values: 'smooth', 'rounded', 'boxed'.
     */
    roundness: {
      type: String,
      default: "rounded",
      validator: val => ["smooth", "rounded", "boxed"].includes(val)
    },

    /**
     * Pass any style object to <i>.summary</i> if needed.
     */
    summaryStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any <b>DTypography</b> props if needed.
     */
    summaryTypographyProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.summary</i> if needed.
     */
    summaryTypographyStyle: {
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
      isOpened: true, // to be able to measure height onMounted
      isExpended: true,
      resetHeight: true,
      contentHeight: 0,
      transitionTime: parseInt(transitionTokens["transition-time-medium"])
    };
  },

  mounted() {
    this.contentHeight = this.$refs["details-content"].offsetHeight;

    this.$nextTick(() => {
      this.isOpened = false;
      this.isExpended = false;
      this.resetHeight = false;
    });
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
        this.resetHeight = false;

        setTimeout(async () => {
          await this.$nextTick(() => {
            // use timeout and nextTick to hack event loop
            this.isExpended = true;
          });
        }, 24); // experimental value
      }

      // TODO: emit open change
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/outline";
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/controls";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/outline";

.d-details {
  background: var(--color-background);
  height: fit-content;
  position: relative;

  &.__large {
    &.__smooth {
      border-radius: calc(var(--large-control-height) / 2);

      .summary:before {
        border-radius: calc(
          (var(--large-control-height) + 2 * var(--outline-width)) / 2
        );
      }
    }

    &.__rounded {
      border-radius: var(--border-radius);

      .summary:before {
        border-radius: calc(var(--border-radius) + 2 * var(--outline-width));
      }
    }

    .summary {
      min-height: var(--large-control-height);
    }
  }

  &.__medium {
    &.__smooth {
      border-radius: calc(var(--medium-control-height) / 2);

      .summary:before {
        border-radius: calc(
          (var(--medium-control-height) + 2 * var(--outline-width)) / 2
        );
      }
    }

    &.__rounded {
      border-radius: var(--border-radius);

      .summary:before {
        border-radius: calc(var(--border-radius) + 2 * var(--outline-width));
      }
    }
    .summary {
      min-height: var(--medium-control-height);
    }
  }

  &.__small {
    &.__smooth {
      border-radius: calc(var(--small-control-height) / 2);

      .summary:before {
        border-radius: calc(
          (var(--small-control-height) + 2 * var(--outline-width)) / 2
        );
      }
    }

    &.__rounded {
      border-radius: var(--border-radius);

      .summary:before {
        border-radius: calc(var(--border-radius) + 2 * var(--outline-width));
      }
    }

    .summary {
      min-height: var(--small-control-height);
    }
  }
}

.summary {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: var(--gap-base) var(--gap-3x); // to be as high as other controls
  cursor: pointer;

  .d-typography {
    max-width: calc(100% - var(--gap-5x));
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // hide default icon
  &::-webkit-details-marker {
    display: none;
  }

  // custom focus visible
  outline: none;

  &.focus-visible {
    &:before {
      @include outline;
    }
  }
}

.d-icon-direction {
  @include transition-medium;
}

.details-content {
  @include transition-medium;

  overflow: hidden;
  padding: 0 var(--gap-3x);

  &.__expanded {
    padding: var(--gap-2x) var(--gap-3x) var(--gap-3x);
  }
}
</style>
