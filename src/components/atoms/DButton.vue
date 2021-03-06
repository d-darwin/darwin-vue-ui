<template>
  <div
    :class="{ [$attrs.class]: $attrs.class, ['__full-width']: isFullWidth }"
    class="d-button"
  >
    <component
      :is="el"
      v-bind="$attrs"
      :class="{
        [`__${type}`]: type,
        [`__${size}`]: size,
        [`__${roundness}`]: roundness,
        ['__icon-only']: iconOnly,
        __disabled: !!$attrs.disabled
      }"
      class="control-button"
      @click="clickHandler"
    >
      <DTypography v-if="!$slots.default" :content="content" />
      <!-- @slot May contains a string, an icon or some combination of both. -->
      <slot />
    </component>

    <DError :content="error" />
  </div>
</template>

<script>
/** mixins **/
import typographyContentProp from "../../mixins/typographyContentProp";
import controlTypeProp from "../../mixins/controlTypeProp";
import controlSizeProp from "../../mixins/controlSizeProp";
import controlRoundnessProp from "../../mixins/controlRoundnessProp";
import hasRouter from "../../mixins/hasRouter";

/** components **/
import DTypography from "../containers/DTypography";
import DError from "./DError";

/**
 * The component renders as a <b>button</b>, <b>router-link</b> or <b>a</b> depending on props.<br>
 * Feel free to use any attrs you expect with specific tag,
 * they will be pass to the tag automatically.<br>
 * May be in various sizes and have different corner roundness.
 *
 * @version 1.6.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DButton",

  inheritAttrs: false,

  mixins: [
    typographyContentProp,
    controlTypeProp,
    controlSizeProp,
    controlRoundnessProp,
    hasRouter
  ],

  components: { DTypography, DError },

  emits: ["click"],

  props: {
    /**
     * Makes component equal height and width, removes padding and centers slot content.
     */
    iconOnly: {
      type: Boolean,
      default: false
    },

    /**
     * Makes component take all the container's width.
     */
    isFullWidth: {
      type: Boolean,
      default: false
    },

    /**
     * If not empty renders as an error string below the <b>input</b> tag.
     */
    error: {
      type: String,
      default: ""
    }
  },

  computed: {
    el() {
      return this.hasRouter && this.$attrs.to
        ? "router-link"
        : this.$attrs.href
        ? "a"
        : "button";
    }
  },

  methods: {
    clickHandler() {
      /**
       * Just emits click event without any payload.
       *
       * @event click
       * @type {undefined}
       */
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/controls";
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/outline";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/controls";
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/outline";

.d-button {
  &.__full-width {
    width: 100%;
  }

  &:not(.__full-width) {
    width: fit-content;
  }
}

.control-group {
  position: relative;
  display: flex;
}

.control-button {
  @include general-text;
  @include transition-short;

  font-weight: var(--button-font-weight);

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  text-align: center;
  white-space: nowrap;
  text-decoration: none;
  width: 100%;

  // TODO: avoid using <any> selector
  > * + *,
  > ::v-slotted(* + *) {
    margin-left: 6px;
  }

  &:not(.__disabled):hover,
  &:not(.__disabled):active {
    cursor: pointer;
  }

  &.__large {
    @include large-control;

    padding: 12px 23px;
  }

  &.__medium {
    @include medium-control;

    padding: 7px 19px;
  }

  &.__small {
    @include small-control;
    @include small-text;

    padding: 3px 9px;
  }

  &.__disabled {
    cursor: not-allowed;
  }

  &.__icon-only {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &.__large {
      height: var(--large-control-height);
      width: var(--large-control-height);
    }

    &.__medium {
      height: var(--medium-control-height);
      width: var(--medium-control-height);
    }

    &.__small {
      height: var(--small-control-height);
      width: var(--small-control-height);
    }
  }

  outline: none;

  &.focus-visible {
    &:before {
      @include outline;

      margin: -1px; // border
      width: calc(100% + 2 * var(--outline-width) + 2px); // border
    }
  }
}

.__primary {
  color: var(--white);
  background: var(--color-primary);
  border-color: var(--color-primary);

  &:not(.__disabled):hover,
  &:not(.__disabled):active {
    background: var(--color-primary-active);
    border-color: var(--color-primary-active);
  }

  &.__disabled {
    background: var(--color-primary-disabled);
    border-color: var(--color-primary-disabled);
  }
}

.__secondary {
  color: var(--color-text);
  background: var(--white);
  border-color: var(--color-separator);

  &:not(.__disabled):hover,
  &:not(.__disabled):active {
    background: var(--color-background);
  }

  &.__disabled {
    background: var(--white);
    color: var(--color-text-alt);
  }
}

.__alternative {
  color: var(--white);
  background: var(--color-accent);
  border-color: var(--color-accent);

  &:not(.__disabled):hover,
  &:not(.__disabled):active {
    background: var(--color-accent-active);
    border-color: var(--color-accent-active);
  }

  &.__disabled {
    background: var(--color-accent-disabled);
    border-color: var(--color-accent-disabled);
  }
}

.__inverse {
  color: var(--color-primary);
  background: var(--white);
  border-color: var(--white);

  &:not(.__disabled):hover,
  &:not(.__disabled):active {
    background: var(--color-background);
    border-color: var(--color-background);
  }

  &.__disabled {
    color: var(--color-primary-disabled);
    background: var(--white);
  }
}

.__danger {
  color: var(--white);
  background: var(--color-danger);
  border-color: var(--color-danger);

  &:not(.__disabled):hover,
  &:not(.__disabled):active {
    background: var(--color-danger-active);
    border-color: var(--color-danger-active);
  }

  &.__disabled {
    background: var(--color-danger-disabled);
    border-color: var(--color-danger-disabled);
  }
}
</style>
