<template>
  <teleport to="body">
    <transition name="opacity">
      <div v-if="isShown" :class="$attrs.class" class="d-modal">
        <div
          :style="modalStyle"
          class="modal"
          v-click-outside:[true]="closeHandler"
        >
          <DButton
            v-bind="{
              id: closeButtonId,
              iconOnly: true,
              type: 'inverse',
              size: 'small',
              roundness: 'boxed',
              class: 'close-button',
              style: closeButtonStyle,
              ...closeButtonProps,
              onClick: closeHandler
            }"
          >
            <DIconClose v-if="!$slots['icon-close']" />
            <!-- @slot You can replace default close icon by passing your own here. -->
            <slot v-else name="icon-close" />
          </DButton>

          <!-- Standard modal content with heading, text, cancel and accept buttons -->
          <template v-if="!$slots.default">
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

            <div :style="buttonsContainerStyle" class="buttons-container">
              <DButton
                v-bind="{
                  type: 'secondary',
                  size: 'medium',
                  ...cancelButtonProps,
                  onClick: cancelHandler
                }"
              >
                <slot name="cancel-icon-before" />
                <DTypography :content="cancelButtonContent" />
                <slot name="cancel-icon-after" />
              </DButton>

              <DButton
                v-bind="{
                  size: 'medium',
                  ...acceptButtonProps,
                  onClick: acceptHandler
                }"
              >
                <slot name="accept-icon-before" />
                <DTypography :content="acceptButtonContent" />
                <slot name="accept-icon-after" />
              </DButton>
            </div>
          </template>

          <!-- @slot Custom modal content -->
          <slot v-else />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref, computed } from "vue";

/** utils **/
import uuid from "../../utils/uuid";

/** directives **/
import clickOutside from "../../directives/click-outside.js";

/** compositions **/
import useBlockBodyScroll from "../../compositions/blockBodyScroll";

/** components **/
import DIconClose from "../icons/DIconClose";
import DButton from "../atoms/DButton";
import DTypography from "../containers/DTypography";

/**
 * This is widely customizable modal component.
 * You can easily create standard modal with heading, text, cancel and accept buttons and customize these elements.
 * Also you can construct your own modal content by using default slot.
 *
 * @version 1.1.3
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  // TODO: find out if it is accessible ???
  name: "DModal",

  inheritAttrs: false,

  directives: {
    "click-outside": clickOutside
  },

  components: { DTypography, DButton, DIconClose },

  // TODO: too many props, try to reduce
  props: {
    /**
     * Use this prop instead of v-if or v-show to animate the component appearance.
     */
    isShown: {
      type: Boolean,
      default: true
    },

    /**
     * Pass any style object to <i>.modal</i> if needed.
     */
    modalStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any <b>DButton</b> props if needed.
     */
    closeButtonProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.close-button</i> if needed.
     */
    closeButtonStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Heading of the modal. Passed as content of <b>DTypography</b> so may contain string or any HTML.
     */
    heading: {
      type: String,
      default: ""
    },

    /**
     * Pass any <b>DTypography</b> props if needed.
     */
    headingProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.heading</i> if needed.
     */
    headingStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Text of the modal. Passed as content of <b>DTypography</b> so may contain string or any HTML.
     */
    content: {
      type: String,
      default: ""
    },

    /**
     * Pass any <b>DTypography</b> props if needed.
     */
    contentProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.content</i> if needed.
     */
    contentStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.buttons-container</i> if needed.
     */
    buttonsContainerStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Text of the cancel button. Passed as content of <b>DTypography</b> so may contain string or any HTML.
     */
    cancelButtonContent: {
      type: String,
      default: "Cancel"
    },

    /**
     * Pass any <b>DButton</b> props if needed.
     */
    cancelButtonProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to cancel button if needed.
     */
    cancelButtonStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Text of the accept button. Passed as content of <b>DTypography</b> so may contain string or any HTML.
     */
    acceptButtonContent: {
      type: String,
      default: "Accept"
    },

    /**
     * Pass any <b>DButton</b> props if needed.
     */
    acceptButtonProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to accept button if needed.
     */
    acceptButtonStyle: {
      type: Object,
      default: () => {}
    }
  },

  setup(props) {
    const { blockScroll } = useBlockBodyScroll();

    // TODO: try to simplify somehow, too many vars for a simple problem
    const isClosed = ref(false);
    const show = computed(() => props.isShown && !isClosed.value);
    const closeButtonId = uuid();

    return {
      blockScroll,
      isClosed,
      show,
      closeButtonId
    };
  },

  watch: {
    isShown(value) {
      if (value) {
        // reset isClosed if modal is shown
        this.isClosed = false;

        // block body scrolling
        this.blockScroll();

        // reset focus to close button
        this.$nextTick(() => {
          const closeButton = document.getElementById(this.closeButtonId);
          closeButton.focus();
        });
      } else {
        // ensure that body scrolling isn't blocked
        this.blockScroll(false);
      }
    }
  },

  beforeUnmount() {
    this.blockScroll(false);
  },

  methods: {
    closeHandler() {
      console.log("closeHandler DModal", this.show);
      /**
       * Close button was clicked or click was outside the component.
       *
       * @event close
       */
      this.$emit("close");
      this.blockScroll(false);
      this.isClosed = true;
    },

    cancelHandler() {
      /**
       * Cancel button was clicked.
       *
       * @event close
       */
      this.$emit("cancel");
      this.closeHandler();
    },

    acceptHandler() {
      /**
       * Accept button was clicked.
       *
       * @event close
       */
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
}
</style>
