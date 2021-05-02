<template>
  <component
    :is="el"
    :class="{
      [`__${size}`]: size,
      [`__${type}`]: type
    }"
    v-bind="{ ...$attrs, rel, target }"
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
import typographyContentProp from "../../mixins/typographyContentProp";
import controlTypeProp from "../../mixins/controlTypeProp";
import hasRouter from "../../mixins/hasRouter";

/** components **/
import DTypography from "../../components/containers/DTypography";
import DIconExternalLink from "../../components/icons/DIconExternalLink";

/**
 * Component renders as a <b>router-link</b> or just as an <b>a</b> tag of differed colors and sized.<br>
 * Feel free to use any attrs you expect with <b>router-link</b> or <b>a</b> tag,
 * they will be pass to the tag automatically.<br>
 * If <i>href</i> is a link to external resource, optional icon added to the left side of the default slot. You can turn off this behavior or pass your own icon.<br>
 *
 * @version 1.4.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DLink",

  inheritAttrs: false,

  mixins: [
    typographySizeProp,
    typographyContentProp,
    controlTypeProp,
    hasRouter
  ],

  components: {
    DTypography,
    DIconExternalLink
  },

  props: {
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
      return this.hasRouter && this.$attrs.to ? "router-link" : "a";
    },

    isExternalLink() {
      return (
        this.$attrs?.href?.substring(0, 4) === "http" ||
        this.$attrs?.href?.substring(0, 2) === "//"
      );
    },

    rel() {
      return this.$attrs.rel
        ? this.$attrs.rel
        : this.isExternalLink
        ? "nofollow noopener noreferer"
        : "";
    },

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
  position: relative;

  &:not([disabled]) {
    cursor: pointer;
  }

  &[disabled] {
    cursor: not-allowed;
  }

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

.__alternative {
  @include link-alternative;
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
