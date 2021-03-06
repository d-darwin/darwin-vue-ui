<template>
  <teleport to="body">
    <transition :name="backdropTransitionName">
      <DBackdrop v-if="isShown" />
    </transition>

    <transition :name="transitionName">
      <!--TODO: use native dialog tag if the browser supports one-->
      <div
        v-if="isShown"
        :class="$attrs.class"
        class="d-modal"
        @click="closeHandler"
      >
        <div :style="modalStyle" class="modal" @click.stop="">
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
/** compositions **/
import useClosable from "../../compositions/closable";

/** components **/
import DIconClose from "../icons/DIconClose";
import DButton from "../atoms/DButton";
import DTypography from "../containers/DTypography";
import DBackdrop from "../atoms/DBackdrop";

/**
 * This is widely customizable modal component.
 * You can easily create standard modal with heading, text, cancel and accept buttons and customize these elements.
 * Also you can construct your own modal content by using default slot.
 *
 * @version 1.3.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  // TODO: find out if it is accessible ???
  name: "DModal",

  inheritAttrs: false,

  components: { DBackdrop, DTypography, DButton, DIconClose },

  emits: ["close", "cancel", "accept"],

  // TODO: too many props, try to reduce
  props: {
    /**
     * Use this prop instead of v-if or v-show to animate the component appearance.
     * TODO: use DDrawer backdrop technique
     */
    isShown: {
      type: Boolean,
      default: true
    },

    /**
     * Heading of the modal. Passed as content of <b>DTypography</b> so may contain string or any HTML.
     */
    heading: {
      type: String,
      default: ""
    },

    /**
     * Text of the modal. Passed as content of <b>DTypography</b> so may contain string or any HTML.
     */
    content: {
      type: String,
      default: ""
    },

    /**
     * Text of the cancel button. Passed as content of <b>DTypography</b> so may contain string or any HTML.
     */
    cancelButtonContent: {
      type: String,
      default: "Cancel"
    },

    /**
     * Text of the accept button. Passed as content of <b>DTypography</b> so may contain string or any HTML.
     */
    acceptButtonContent: {
      type: String,
      default: "Accept"
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
     * Pass any <b>DTypography</b> props if needed.
     */
    // TODO: pack all props/styles of such kind into one object ???
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
    },

    /**
     * Name of the component transition (animation).
     */
    transitionName: {
      type: String,
      default: "opacity"
    },

    /**
     * Name of the <b>DBackdrop</b> transition (animation).
     */
    backdropTransitionName: {
      type: String,
      default: "opacity-backdrop"
    }
  },

  setup(props, { emit }) {
    const { closeButtonId, closeHandler } = useClosable(props, emit);

    const cancelHandler = () => {
      /**
       * Cancel button was clicked.
       *
       * @event cancel
       */
      emit("cancel");
      closeHandler();
    };

    const acceptHandler = () => {
      /**
       * Accept button was clicked.
       *
       * @event accept
       */
      emit("accept");
      closeHandler();
    };

    return {
      closeButtonId,
      closeHandler,
      cancelHandler,
      acceptHandler
    };
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/grid";

body {
  &.__blocked-scroll {
    overflow-y: hidden;
  }
}
</style>

<style scoped lang="scss">
@import "../../assets/styles/transitions/opacity";
@import "../../assets/styles/transitions/opacity-backdrop";
@import "../../assets/styles/mixins/shadows";
@import "../../assets/styles/mixins/breakpoints";

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
}

.modal {
  @include shadow-medium;

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

    // TODO: avoid using <any> selector
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

@include xs-device {
  .d-modal {
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 0;
    overflow-y: auto;
    touch-action: pan-y;
    height: 100%;
    margin: var(--gap-42) var(--grid-offset) 0;
  }

  .modal {
    width: 100%;
    padding-bottom: var(--gap-26x);
    margin-top: auto;
  }
}
</style>
