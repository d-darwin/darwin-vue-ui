<template>
  <div class="d-button">
    <div class="control-group">
      <component
        :is="el"
        v-bind="{ ...$props, ...$attrs }"
        :class="{
          [`__${type}`]: type,
          [`__${size}`]: size,
          [`__${roundness}`]: roundness,
          ['__icon-only']: iconOnly,
          __disabled: $attrs.disabled !== undefined
        }"
        :aria-disabled="$attrs.disabled"
        :role="['router-link', 'a'].includes(el) ? 'link' : 'button'"
        class="control-button"
      >
        <!-- @slot May contains a string, an icon or an combination. -->
        <slot />
      </component>
    </div>

    <transition name="control-error">
      <DTypography v-if="error" :content="error" size="small" class="error" />
    </transition>
  </div>
</template>

<script>
import DTypography from "../containers/DTypography";

/**
 * The component renders as a <b>button</b>, <b>router-link</b> or <b>a</b> depending on props.<br>
 * Feel free to use any attrs you expect with specific tag,
 * they will be pass to the tag automatically.<br>
 * May be in various sizes and have different corner roundness.
 *
 * @version 1.0.3
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DButton",
  components: { DTypography },
  inheritAttrs: false,

  props: {
    /**
     * Defines background and border colors of the component as well as :hover and :active behavior.<br>
     * Takes values: 'primary', 'secondary', 'alternative', 'inverse'.
     */
    type: {
      type: String,
      default: "primary",
      validator: val =>
        ["primary", "secondary", "alternative", "inverse"].includes(val)
    },

    /**
     * Defines vertical size of the component.<br>
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
      default: "smooth",
      validator: val => ["smooth", "rounded", "boxed"].includes(val)
    },

    /**
     * Reduces horizontal padding of the components.
     */
    iconOnly: {
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
      return this.$attrs.to && this.$router
        ? "router-link"
        : this.$attrs.href
        ? "a"
        : "button";
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
@import "../../assets/styles/vue-transitions";
// @import "../../assets/styles/focus-visible";

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

  outline: none;

  > * + * {
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

  &.focus-visible {
    &:before {
      // emulates outline property
      // TODO: make mixin ???
      // TODO: include reset by default???
      box-sizing: border-box;
      position: absolute;
      content: " ";
      border: var(--outline-width) solid var(--outline-color);
      z-index: -1;
      top: calc(var(--outline-width) * -1 - 1px);
      left: calc(var(--outline-width) * -1 - 1px); // border
      right: calc(var(--outline-width) * -1 - 1px); // border
      bottom: calc(var(--outline-width) * -1 - 1px); // border
      width: calc(100% + 2 * var(--outline-width) + 2px); // border
    }
  }
}

.error {
  margin-top: var(--gap-base);
  color: var(--danger);
  text-overflow: ellipsis;
  overflow: hidden;
}

.__primary {
  color: var(--white);
  background: var(--primary);
  border-color: var(--primary);

  &:not(.__disabled):hover,
  &:not(.__disabled):active {
    background: var(--primary-active);
    border-color: var(--primary-active);
  }

  &.__disabled {
    background: var(--primary-disabled);
    border-color: var(--primary-disabled);
  }
}

.__secondary {
  color: var(--text);
  background: var(--white);
  border-color: var(--separator);

  &:not(.__disabled):hover,
  &:not(.__disabled):active {
    background: var(--background);
  }

  &.__disabled {
    background: var(--white);
    color: var(--text-alt);
  }
}

.__alternative {
  color: var(--white);
  background: var(--accent);
  border-color: var(--accent);

  &:not(.__disabled):hover,
  &:not(.__disabled):active {
    background: var(--accent-active);
    border-color: var(--accent-active);
  }

  &.__disabled {
    background: var(--accent-disabled);
    border-color: var(--accent-disabled);
  }
}

.__inverse {
  color: var(--primary);
  background: var(--white);
  border-color: var(--white);

  &:not(.__disabled):hover,
  &:not(.__disabled):active {
    background: var(--background);
    border-color: var(--background);
  }

  &.__disabled {
    color: var(--primary-disabled);
    background: var(--white);
  }
}

.__icon-only {
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
</style>
