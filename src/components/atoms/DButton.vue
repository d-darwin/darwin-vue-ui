<template>
  <div class="control-group">
    <component
      :is="el"
      v-bind="linkProps"
      :class="{
        [`__${type}`]: type,
        [`__${size}`]: size,
        [`__${roundness}`]: roundness,
        ['__icon-only']: iconOnly,
        __disabled: disabled
      }"
      :aria-disabled="disabled"
      role="button"
      class="control-button"
      @click="emitClick($event)"
    >
      <!-- @slot May contain string, icon or combination. -->
      <slot />
    </component>
  </div>
</template>

<script>
/**
 * The components renders as a <b>button</b>, <b>n-link</b> or <b>a</b> depending on props.
 * May be in various sizes and have different corner roundness.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DButton",

  props: {
    /*TODO: reduce number of props by using v-bind*/
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
     * Use the prop to render component as a <b>n-link<b>.
     */
    routeName: {
      type: String,
      default: ""
    },

    /**
     * Use the prop to define params of a route in case of <b>n-link<b> usage.
     */
    routeParams: {
      type: Object,
      default: () => {}
    },

    /**
     * Use the prop to render component as an <b>a</b> tag.
     */
    href: {
      type: String,
      default: ""
    },

    /**
     * Use the prop to define value of the <i>target</i> attr in case of <b>a</b> usage.
     * Takes values: '\_blank', '\_parent', '\_self', '\_top'.
     */
    target: {
      type: String,
      default: "_blank",
      validator: val => ["_blank", "_parent", "_self", "_top"].includes(val)
    },

    /**
     * Use the prop to add <i>download</i> attr in case of <b>a</b> usage.
     */
    download: {
      type: Boolean,
      default: false
    },

    /**
     * Prevents default button behavior on click.
     */
    preventDefault: {
      type: Boolean,
      default: false
    },

    /**
     * Prevents event generation on click and changes look and feel.
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Reduces horizontal padding of the components.
     */
    iconOnly: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    el() {
      return this.routeName ? "n-link" : this.href ? "a" : "button";
    },

    linkProps() {
      if (this.routeName) {
        return {
          to: {
            name: this.routeName,
            params: this.routeParams
          }
        };
      } else if (this.href) {
        return {
          href: this.href,
          target: !this.download && this.target,
          rel:
            !this.download && this.target === "_blank"
              ? "nofollow noopener noreferer"
              : "",
          download: this.download
        };
      } else {
        return {
          // TODO: add if needed
        };
      }
    }
  },

  methods: {
    emitClick(event) {
      if (this.preventDefault) {
        event.preventDefault();
      }

      if (!this.disabled) {
        /**
         * The component clicked. Contains <i>MouseEvent</i>.
         *
         * @event click
         * @type {MouseEvent}
         */
        this.$emit("click", event);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/tokens/control";
@import "../../assets/styles/mixins/control";
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/focus-visible";

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

  &.__disabled {
    cursor: not-allowed;
  }

  &.focus-visible {
    &:before {
      // emulates outline property
      // TODO: make mixin ???
      position: absolute;
      content: " ";
      border: var(--outline-width) solid var(--outline-color);
      z-index: -1;
      top: calc(var(--outline-width) * -1);
      left: calc(var(--outline-width) * -1);
      right: calc(var(--outline-width) * -1);
      bottom: calc(var(--outline-width) * -1);
      width: calc(100% + 2 * var(--outline-width));
    }
  }
}

.__large {
  @include large-control;

  padding: 12px 23px;
}

.__medium {
  @include medium-control;

  padding: 7px 19px;
}

.__small {
  @include small-control;
  @include small-text;

  padding: 3px 9px;
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
