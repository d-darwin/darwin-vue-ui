<template>
  <div :class="$attrs.class" class="d-copy-content">
    <DTypography
      v-bind="{
        content,
        ...typographyProps
      }"
      :style="typographyStyle"
    />

    <DButton
      ref="copy-button"
      v-bind="{
        'icon-only': true,
        size: 'small',
        roundness: 'boxed',
        type: 'backgroundless',
        ...buttonProps,
        onClick: copyText
      }"
      :style="buttonStyle"
    >
      <DIconCopy v-if="!$slots['icon-copy']" />
      <!-- @slot You can replace default copy icon by passing your own here. -->
      <slot v-else name="icon-copy" />
    </DButton>
  </div>
</template>

<script>
/** utils **/
import copyToClipboard from "../../utils/copyToClipboard";

/** components **/
import DIconCopy from "../icons/DIconCopy";
import DButton from "./DButton";
import DTypography from "../containers/DTypography";

/**
 * The component allows user to copy string passed to component in <i>content</i> prop.
 *
 * @version 1.0.3
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DCopyContent",

  inheritAttrs: false,

  components: { DIconCopy, DButton, DTypography },

  props: {
    /**
     * Simple string or any HTML.
     */
    content: {
      type: String,
      default: ""
    },

    /**
     * Pass any <b>DTypography</b> props if needed.
     */
    typographyProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.d-typography</i> if needed.
     */
    typographyStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any <b>DButton</b> props if needed.
     */
    buttonProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.d-button</i> props if needed.
     */
    buttonStyle: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    async copyText() {
      copyToClipboard(this.content);
      /**
       * Content string was copied.
       *
       * @event copied
       * @type {undefined}
       */
      await this.$emit("copied");

      // reset focus to copy-button
      const copyButton = this.$refs["copy-button"].$el.children[0];
      await this.$nextTick(() => copyButton.focus());
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/gaps";
</style>

<style scoped lang="scss">
.d-copy-content {
  display: flex;
  align-items: center;

  > * + *,
  > * + ::v-slotted(*) {
    margin-left: var(--gap-base);
  }
}
</style>
