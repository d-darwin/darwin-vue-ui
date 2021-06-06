<template>
  <details
    :id="componentId"
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
      <!-- @slot You can use custom summary content instead of summary prop -->
      <slot v-else name="summary" />
    </summary>

    <div
      ref="details-content"
      :style="{
        ...detailsContentStyle,
        height: isLoaded ? (isExpended ? contentHeight + 'px' : '0') : 'auto'
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

/** mixins **/
import typographyContentProp from "../../mixins/typographyContentProp";
import controlSizeProp from "../../mixins/controlSizeProp";
import controlRoundnessProp from "../../mixins/controlRoundnessProp";

/** compositions **/
import useComponentId from "../../compositions/componentId";

/** components **/
import DTypography from "../containers/DTypography";
import DIconDirection from "../icons/DIconDirection";

/**
 * Renders <b>details</b> tag with <b>summary</b>.<br>
 * Custom focus-visible, icon and slots for summary and details content are presented.<br>
 * May be in various sizes and have different corner roundness.
 *
 * @version 1.1.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DDetails",

  inheritAttrs: false,

  mixins: [typographyContentProp, controlSizeProp, controlRoundnessProp],

  components: { DIconDirection, DTypography },

  props: {
    /**
     * Defines <i>id</i> attr of the component.<br>
     * If you don't want to specify it, it will be generated automatically.
     */
    id: {
      // TODO: make shared /mixins/componentsIdProp ???
      type: [String, Number],
      default: ""
    },

    /** Defines component's initial state.
     *
     */
    open: {
      type: Boolean,
      default: false
    },

    /**
     * Content of the <b>summary</b> tag. It uses <b>DTypography</b> so any HTML string may be passed.
     */
    summary: {
      // TODO: how to reuse typographyContentProp without mixins factory usage ???
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

  watch: {
    open(value) {
      if (value !== this.isOpened) {
        this.summaryClickHandler();
      }
    }
  },

  setup(props) {
    const { componentId } = useComponentId(props);
    return { componentId };
  },

  data() {
    return {
      isOpened: true, // to be able to measure height onMounted
      isExpended: true,
      isLoaded: false,
      contentHeight: 0,
      transitionTime: parseInt(transitionTokens["transition-time-medium"])
    };
  },

  async mounted() {
    await this.$nextTick(() => {
      this.contentHeight = this.$refs["details-content"].offsetHeight;
    });

    await this.$nextTick(() => {
      this.isOpened = false;
      this.isExpended = false;
    });

    await this.$nextTick(() => {
      this.isLoaded = true;

      if (this.open !== this.isOpened) {
        this.summaryClickHandler();
      }
    });
  },

  methods: {
    async summaryClickHandler() {
      if (this.isOpened) {
        this.isExpended = false;

        // browser will completely hide .details-content only after transition finishes
        setTimeout(() => {
          this.isOpened = false;
          this.emitChange();
        }, this.transitionTime);
      } else {
        this.isOpened = true;
        this.emitChange();

        setTimeout(async () => {
          await this.$nextTick(() => {
            // use timeout and nextTick to hack event loop
            this.isExpended = true;
          });
        }, 24); // experimental value
      }
    },

    emitChange() {
      /**
       * Open attr of the <b>details</b> tag updated.
       * Contains new value of <i>open</i> attr and component id.<br>
       * Use @update:open="fn" to catch this event.
       *
       * @event update:open
       * @type {{open: Boolean, id: String}}
       */
      this.$emit("update:open", {
        open: this.isOpened,
        id: this.componentId
      });
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

    // TODO: different left/right padding for different sizes
    .summary {
      min-height: var(--large-control-height);
      height: fit-content;
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

    // TODO: different left/right padding for different sizes
    .summary {
      min-height: var(--medium-control-height);
      height: fit-content;
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

    // TODO: different left/right padding for different sizes
    .summary {
      min-height: var(--small-control-height);
      height: fit-content;
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
  &::marker {
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
    // TODO: different left/right padding for different sizes
    padding: var(--gap-2x) var(--gap-3x) var(--gap-3x);
  }
}
</style>
