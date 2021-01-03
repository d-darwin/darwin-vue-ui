<template>
  <div :class="$attrs.class" class="d-copy-link">
    <DLink
      ref="copy-link"
      v-bind="{
        size: 'small',
        href: '#',
        ...linkProps,
        onClick: copyLink
      }"
      :style="linkStyle"
    >
      <DIconCopy v-if="!$slots['icon-copy']" />
      <!-- @slot You can replace default copy icon by passing your own here. -->
      <slot v-else name="icon-copy" />

      <DTypography
        v-if="linkText"
        v-bind="{ content: linkText, ...typographyProps }"
        :style="typographyStyle"
      />
    </DLink>
  </div>
</template>

<script>
/** utils **/
import copyToClipboard from "../../utils/copyToClipboard";

/** components **/
import DLink from "../atoms/DLink";
import DIconCopy from "../icons/DIconCopy";
import DTypography from "../containers/DTypography";

/**
 * The component allows user to copy current page URL.
 *
 * @version 1.0.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DCopyLink",

  inheritAttrs: false,

  components: { DTypography, DLink, DIconCopy },

  props: {
    /**
     * Link text string.
     */
    linkText: {
      type: String,
      default: ""
    },

    /**
     * Pass any <b>DLink</b> props if needed.
     */
    linkProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.d-link</i> if needed.
     */
    linkStyle: {
      type: Object,
      default: () => {}
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
    }
  },

  methods: {
    async copyLink() {
      copyToClipboard(window.location.href);
      /**
       * Page link was copied.
       *
       * @event copied
       * @type {undefined}
       */
      await this.$emit("copied");

      // reset focus to copy-link
      const copy = this.$refs["copy-link"].$el;
      await this.$nextTick(() => copy.focus());
    }
  }
};
</script>

<style scoped lang="scss">
.d-link {
  > * + *,
  > * + ::v-slotted(*) {
    margin-left: 6px;
  }
}
</style>
