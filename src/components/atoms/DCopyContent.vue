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
        type: 'inverse',
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
/** mixins **/
import typographyContentProp from "../../mixins/typographyContentProp";

/** compositions **/
import useCopyToClipboard from "../../compositions/copyToClipboard";

/** components **/
import DIconCopy from "../icons/DIconCopy";
import DButton from "./DButton";
import DTypography from "../containers/DTypography";

/**
 * The component allows user to copy string passed to component in <i>content</i> prop.
 *
 * @version 1.1.4
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DCopyContent",

  inheritAttrs: false,

  mixins: [typographyContentProp],

  components: { DIconCopy, DButton, DTypography },

  emits: ["copied"],

  props: {
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
     * Pass any style object to <i>.d-button</i> if needed.
     */
    buttonStyle: {
      type: Object,
      default: () => {}
    }
  },

  setup() {
    const { copyToClipboard } = useCopyToClipboard();
    return { copyToClipboard };
  },

  methods: {
    async copyText() {
      if (process.browser) {
        this.copyToClipboard(this.content);
      }

      /**
       * Content string was copied.
       *
       * @event copied
       * @type {string}
       */
      await this.$emit("copied", this.content);

      // reset focus to copy-button
      const copyButton =
        this.$refs["copy-button"] && this.$refs["copy-button"].$el.children[0];
      if (copyButton) {
        await this.$nextTick(() => copyButton.focus());
      }
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

  // TODO: avoid using <any> selector
  > * + *,
  > * + ::v-slotted(*) {
    margin-left: var(--gap-base);
  }
}
</style>
