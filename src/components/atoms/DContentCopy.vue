<template>
  <div :class="$attrs.class" class="d-content-copy">
    <DTypography
      v-bind="{
        content,
        ...typographyProps
      }"
      :style="typographyStyle"
    />

    <DButton
      v-bind="{
        'icon-only': true,
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
import DTypography from "../containers/DTypography";
import DButton from "./DButton";
import DIconCopy from "../icons/DIconCopy";

/**
 * TODO
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DContentCopy",

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
    copyText() {
      copyToClipboard(this.content);
      /**
       * Content string was copied.
       *
       * @event copied
       * @type {undefined}
       */
      this.$emit("copied");
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";
</style>

<style scoped lang="scss">
.d-content-copy {
  display: flex;
  align-items: center;

  > * + *,
  > * + ::v-slotted(*) {
    margin-left: var(--gap-base);
  }
}
</style>
