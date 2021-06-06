import { onBeforeUnmount } from "vue";

/**
 * Makes it easy to add global event listeners.
 * See example usage in '@dariwn-studio/ui-vue/components/development/DGridDebug.vue'.
 *
 * @param keyCombos
 * @param type
 */
export default function useKeyboardListener(keyCombos, type = "keydown") {
  // construct listener
  const onKeyDown = event => {
    // find pressed key with shift/ctrl/alt modifications in keyCombos
    const keyCombo = keyCombos.find(
      kc =>
        // use .key and .code interchangeable
        (event.key === kc.key || event.code === kc.code) &&
        event.shiftKey === !!kc.shiftKey &&
        event.altKey === !!kc.altKey &&
        // use ctrlKey and metaKey interchangeable
        (event.ctrlKey === !!kc.ctrlKey || event.metaKey === !!kc.metaKey)
    );

    if (keyCombo) {
      // there is pressed key with shift/ctrl/alt modifications in keyCombos - execute keyCombo func
      keyCombo.func(event, keyCombo.args);
    }
  };

  if (process.browser) {
    // add listener only in browser
    window.addEventListener(type, onKeyDown);

    onBeforeUnmount(() => {
      // remove event listener before unmount component to prevent memory leaks
      window.removeEventListener(type, onKeyDown);
    });
  }
}
