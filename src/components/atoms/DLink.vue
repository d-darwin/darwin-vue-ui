<template>
  <component
    :is="el"
    :class="{
      [`__${size}`]: size,
      [`__${type}`]: type,
      [`${$attrs.class}`]: $attrs.class
    }"
    v-bind="{ ...$props, ...$attrs, rel, target }"
    class="d-link"
  >
    <DTypography v-if="!$slots.default" :content="content" :size="size" />
    <!-- @slot May contains a string or any content you want. -->
    <slot v-else />

    <template v-if="isExternalLink && !hideExternalLinkIcon">
      <DIconExternalLink v-if="!$slots['icon-external-link']" />
      <!-- @slot You can replace default external link icon by passing your own here. -->
      <slot v-else name="icon-external-link" />
    </template>
  </component>
</template>

<script>
/** mixins **/
import typographySizeProp from "../../mixins/typographySizeProp";

/** components **/
import DTypography from "../../components/containers/DTypography";
import DIconExternalLink from "../../components/icons/DIconExternalLink";

/**
 * Component renders as a <b>router-link</b> or just as an <b>a</b> tag of differed colors and sized.<br>
 * Feel free to use any attrs you expect with <b>router-link</b> or <b>a</b> tag,
 * they will be pass to the tag automatically.<br>
 * If <i>href</i> is a link to external resource, optional icon added to the left side of the default slot. You can turn off this behavior or pass your own icon.<br>
 *
 * @version 1.2.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DLink",

  inheritAttrs: false,

  mixins: [typographySizeProp],

  components: {
    DTypography,
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
     * If not empty renders as an error HTML string.
     */
    content: {
      type: [String, Number],
      default: ""
    },

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
      return this.$router && this.$attrs.to ? "router-link" : "a";
    },

    isExternalLink() {
      return (
        this.$attrs.href &&
        (this.$attrs.href.substring(0, 4) === "http" ||
          this.$attrs.href.substring(0, 2) === "//")
      );
    },

    // TODO: use attrs???
    rel() {
      return this.$attrs.rel
        ? this.$attrs.rel
        : this.isExternalLink
        ? "nofollow noopener noreferer"
        : "";
    },

    // TODO: use attrs???
    target() {
      return this.$attrs.target
        ? this.$attrs.target
        : this.isExternalLink
        ? "_blank"
        : "";
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
@import "../../assets/styles/mixins/outline";

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
      @include outline;
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
