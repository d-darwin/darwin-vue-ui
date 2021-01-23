/** core **/
import { watch, nextTick, onBeforeUnmount } from "vue";

/** utils **/
import uuid from "../utils/uuid";

/** compositions **/
import useBlockBodyScroll from "./blockBodyScroll";

/**
 *
 *
 * @param props
 * @param emit
 * @returns {{closeButtonId: string, closeHandler: function}}
 */
export default function useClosable(props, emit) {
  const { blockScroll } = useBlockBodyScroll();
  const closeButtonId = uuid();
  let activeElement = null;

  watch(
    () => props.isShown,
    async isShown => {
      if (isShown) {
        // block body scrolling
        blockScroll();

        // hold current active element to reset focus when the component will be closed
        activeElement = document.activeElement;

        // set focus to close button if exists
        await nextTick(() => {
          const closeButton = document.getElementById(closeButtonId);

          if (closeButton) {
            closeButton.focus();
          }
        });
      } else {
        // ensure that body scrolling isn't blocked
        blockScroll(false);

        if (activeElement) {
          // reset focus to it's previous state
          activeElement.focus();
        }
      }
    }
  );

  onBeforeUnmount(() => {
    // ensure that body scrolling isn't blocked
    blockScroll(false);
  });

  const closeHandler = () => {
    /**
     * Close button was clicked or click was outside the component.
     *
     * @event close
     */
    emit("close");
    blockScroll(false);
  };

  return {
    closeButtonId,
    closeHandler
  };
}
