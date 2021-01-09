<template>
  <transition name="opacity">
    <div v-if="isShown" :class="$attrs.class" class="d-modal">
      <div class="modal">
        <DButton
          ref="close-button"
          :icon-only="true"
          type="inverse"
          size="small"
          roundness="boxed"
          class="close-button"
          @click="closeHandler"
        >
          <DIconClose />
        </DButton>

        <!--Custom modal with cancel and accept buttons-->
        <slot v-if="$slots.default" />

        <template v-else>
          <!--Standard modal with heading text, cancel and accept buttons-->
          <DTypography
            v-bind="{
              content: heading,
              size: 'h4',
              ...headingProps
            }"
            :style="headingStyle"
            class="heading"
          />

          <DTypography
            v-bind="{
              content: content,
              size: 'small',
              ...contentProps
            }"
            :style="contentStyle"
            class="content"
          />

          <div class="buttons-container">
            <DButton size="medium" type="secondary" @click="cancelHandler">
              {{ cancelButtonContent }}
              <!--TODO: allow slot-->
            </DButton>

            <DButton size="medium" @click="acceptHandler">
              {{ acceptButtonContent }}
              <!--TODO: allow slot-->
            </DButton>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
/** compositions **/
import useBlockBodyScroll from "../../compositions/blockBodyScroll";

/** components **/
import DIconClose from "../icons/DIconClose";
import DButton from "../atoms/DButton";
import DTypography from "../containers/DTypography";

/**
 * TODO
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DModal",

  inheritAttrs: false,

  components: { DTypography, DButton, DIconClose },

  props: {
    heading: {
      type: String,
      default: ""
    },

    headingProps: {
      type: Object,
      default: () => {}
    },

    headingStyle: {
      type: Object,
      default: () => {}
    },

    content: {
      type: String,
      default: ""
    },

    contentProps: {
      type: Object,
      default: () => {}
    },

    contentStyle: {
      type: Object,
      default: () => {}
    },

    cancelButtonContent: {
      type: String,
      // TODO: make configurable interfaceCopyright
      default: "Cancel"
    },

    acceptButtonContent: {
      type: String,
      // TODO: make configurable interfaceCopyright
      default: "Accept"
    }
  },

  setup() {
    return useBlockBodyScroll();
  },

  data() {
    return {
      isShown: true
    };
  },

  async mounted() {
    this.blockScroll();

    // reset focus to copy-button
    const copyButton = this.$refs["close-button"].$el.children[0];
    await this.$nextTick(() => copyButton.focus());
  },

  beforeUnmount() {
    this.blockScroll(false);
  },

  methods: {
    closeHandler() {
      this.$emit("close");
      this.blockScroll(false);
      this.isShown = false;
    },

    cancelHandler() {
      this.$emit("cancel");
      this.closeHandler();
    },

    acceptHandler() {
      this.$emit("accept");
      this.closeHandler();
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";

// TODO: move to common / reset styles ???
body {
  &.__blocked-scroll {
    overflow-y: hidden;
  }
}
</style>

<style scoped lang="scss">
@import "../../assets/styles/transitions/opacity";
@import "../../assets/styles/mixins/shadows";

.d-modal {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  pointer-events: all;

  &:before {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    background-color: var(--color-primary);
    opacity: 0.2;
  }
}

.modal {
  @include shadow;

  position: relative;
  background-color: var(--white);
  padding: var(--gap-6x) var(--gap-5x);
  // TODO: xs mobiles may have only 320 px width
  width: 324px;

  .content {
    margin-top: var(--gap-3x);
  }

  .buttons-container {
    margin-top: var(--gap-6x);
    display: flex;
    justify-content: flex-end;

    > * + * {
      margin-left: var(--gap-3x);
    }
  }
}

.close-button {
  position: absolute;
  top: var(--gap-2x);
  right: var(--gap-2x);
  cursor: pointer;
  color: var(--text-alt);
}
</style>
