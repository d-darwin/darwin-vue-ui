<template>
  <component
    v-if="content"
    :is="tag"
    :class="{
      [`__${size}`]: size
    }"
    v-html="content"
    class="d-typography"
  />
  <component
    v-else
    :is="tag"
    :class="{
      [`__${size}`]: size
    }"
    class="d-typography"
  >
    <!-- @slot contains any HTML or components -->
    <slot v-if="$slots.default" />
  </component>
</template>

<script>
/** utils **/
import fontSizeProp from "../../utils/fontSizeProp";

/** mixins **/
import LinkClickRouting from "../../mixins/LinkClickRouting";

/**
 * Renders typography text according to design tokens from './src/assets/styles/tokens/_typography.scss'.<br>
 * Handles content relative links clicks as routes.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DTypography",

  mixins: [LinkClickRouting],

  props: {
    /**
     * May contain any HTML string. Alternatively you can use default slot to place any HTML or components.
     */
    content: {
      type: [String, Number],
      default: ""
    },

    /**
     * Which tag should wrap component content.
     */
    tag: {
      type: String,
      default: "div"
    },

    /**
     * Defines main font props of the component content.<br>
     * Expected values: "small", "general", "longread", "augmented", "h5", "h4", "h3", "h2", "h1".<br>
     * See './src/assets/styles/tokens/_typography.scss' for more details.
     */
    size: fontSizeProp
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/mixins/links";
@import "../../assets/styles/tokens/outline";
@import "../../assets/styles/focus-visible";

.d-typography a {
  position: relative;
  outline: none;

  & {
    @include link-primary;
  }
}

.d-typography a.focus-visible:before {
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
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/typography";

@include typography-sizes;

.d-typography {
  color: currentColor;
}

.d-typography > *,
.d-typography > ::v-slotted(*) {
  margin: 1em 0;
}

.d-typography > :first-child,
.d-typography > ::v-slotted(:first-child) {
  margin-top: 0;
}

.d-typography > :last-child,
.d-typography > ::v-slotted(:last-child) {
  margin-bottom: 0;
}
</style>
