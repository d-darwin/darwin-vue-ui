<template>
  <component
    :is="el"
    :class="{
      [`__${size}`]: size,
      [`__${type}`]: type
    }"
    v-bind="{ ...$props, ...$attrs }"
    role="link"
    class="d-link"
  >
    <!-- @slot May contains a string or any content you want. -->
    <slot name="default" />

    <template v-if="isExternalLink && !hideExternalLinkIcon">
      <DIconExternalLink v-if="!$slots['icon-external-link']" />
      <!-- @slot You can replace default external link icon by passing your own here. -->
      <slot v-else name="icon-external-link" />
    </template>
  </component>
</template>

<script>
/** utils **/
import fontSizeProp from "../../utils/fontSizeProp";

/** components **/
import DIconExternalLink from "../../components/icons/DIconExternalLink";

/**
 * Component renders as a <b>router-link</b> or just as an <b>a</b> tag of differed colors and sized.<br>
 * If <i>href</i> is a link to external resource, optional icon added to the left side of the default slot. You can turn off this behavior or pass your own icon.<br>
 *
 * @version 1.0.3
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DLink",

  components: {
    DIconExternalLink
  },

  props: {
    /**
     * Defines color of the component.<br>
     * Takes values: 'primary', 'secondary', 'tertiary', 'inverse', 'danger'.
     */
    type: {
      type: String,
      default: "primary",
      validator: val =>
        ["primary", "secondary", "tertiary", "inverse", "danger"].includes(val)
    },

    /**
     * Defines main font props of the component content.<br>
     * Expected values: "small", "general", "longread", "augmented", "h5", "h4", "h3", "h2", "h1".<br>
     * See './src/assets/styles/tokens/_typography.scss' for more details.
     */
    size: fontSizeProp,

    /**
     * Set to true if you don't want to add icon to external links.
     */
    hideExternalLinkIcon: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    el() {
      return this.$attrs.to && this.$router ? "router-link" : "a";
    },

    isExternalLink() {
      return this.$attrs.href && this.$attrs.href.substring(0, 4) === "http";
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/outline";
@import "../../assets/styles/tokens/links";
@import "../../assets/styles/tokens/typography";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/links";
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/focus-visible";

.d-link {
  @include transition-short;

  width: auto;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  outline: none;

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
      top: calc(var(--outline-width) * -1);
      left: calc(var(--outline-width) * -1);
      right: calc(var(--outline-width) * -1);
      bottom: calc(var(--outline-width) * -1);
      width: calc(100% + 2 * var(--outline-width));
    }
  }
}

@include typography-sizes;

.__primary {
  @include link-primary;
}

.__secondary {
  @include link-secondary;
}

.__tertiary {
  @include link-tertiary;
}

.__inverse {
  @include link-inverse;
}

.__danger {
  @include link-danger;
}

.d-icon-external-link {
  height: 1em;
  width: 1em;
  margin-left: calc(1em / 3);
  margin-top: calc(-1em / 12);
}
</style>
