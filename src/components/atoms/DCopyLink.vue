<template>
  <div :class="$attrs.class" class="d-copy-link">
    <DLink
      ref="copy-link"
      v-bind="{
        size: 'small',
        href: '#',
        preventDefault: true,
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
/** compositions **/
import useCopyToClipboard from "../../compositions/copyToClipboard";

/** components **/
import DLink from "../atoms/DLink";
import DIconCopy from "../icons/DIconCopy";
import DTypography from "../containers/DTypography";

/**
 * The component allows user to copy current page URL.
 *
 * @version 1.1.3
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DCopyLink",

  inheritAttrs: false,

  components: { DTypography, DLink, DIconCopy },

  emits: ["copied"],

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

  setup() {
    const { copyToClipboard } = useCopyToClipboard();
    return { copyToClipboard };
  },

  methods: {
    async copyLink(e) {
      e.preventDefault();
      const link = window.location.href;

      this.copyToClipboard(link);
      /**
       * Page link was copied.
       *
       * @event copied
       * @type {string}
       */
      await this.$emit("copied", link);

      // reset focus to copy-link
      const copyLink = this.$refs["copy-link"] && this.$refs["copy-link"].$el;
      if (copyLink) {
        await this.$nextTick(() => copyLink.focus());
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
.d-link {
  display: flex;
  align-items: center;

  // TODO: avoid using <any> selector
  > * + *,
  > * + ::v-slotted(*) {
    margin-left: var(--gap-2x);
  }
}
</style>
