<template>
  <component
    v-if="content"
    :is="tag"
    :class="{ [`__${size}`]: size }"
    v-bind="$attrs"
    v-html="content"
    class="d-typography"
  />
  <component
    v-else
    :is="tag"
    :class="{ [`__${size}`]: size }"
    v-bind="$attrs"
    class="d-typography"
  >
    <!-- @slot May contain any HTML or another components -->
    <slot />
  </component>
</template>

<script lang="ts">
/** core **/
import { defineComponent, PropType } from "vue";

/** mixins **/
import typographyContentProp from "../../mixins/typographyContentProp";
import typographySizeProp from "../../mixins/typographySizeProp";
import linkClickRouting from "../../mixins/linkClickRouting";

/**
 * Renders typography text according to design tokens from
 * './src/assets/styles/tokens/_typography.scss'.<br>
 * You can use <i>content</i> prop or default slot to pass HTML string or other components.<br>
 * Handles content relative links clicks as routes.
 *
 * @version 1.1.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default defineComponent({
  name: "DTypography",

  inheritAttrs: false,

  mixins: [typographyContentProp, typographySizeProp, linkClickRouting],

  props: {
    /**
     * Which tag should wrap component content.
     */
    tag: {
      // TODO: should I enumerate all possible tags???
      type: String,
      default: "div"
    }
  }
});
</script>

<style lang="scss">
@import "../../assets/styles/tokens/typography";
@import "../../assets/styles/mixins/links";
@import "../../assets/styles/mixins/outline";

.d-typography a {
  position: relative;
  outline: none;

  & {
    @include link-primary;
  }
}

.d-typography a.focus-visible:before {
  @include outline;
}
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/typography";

@include typography-sizes;

.d-typography {
  // color: currentColor; // TODO: do we really need this?
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
