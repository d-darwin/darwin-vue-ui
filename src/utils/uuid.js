/**
 * Creates a random UUID string.
 * See example usage in '@dariwn-studio/ui-vue/compositions/componentId.js'.
 *
 * @returns {string}
 */
export default () =>
  // TODO: move to compositions ???
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
