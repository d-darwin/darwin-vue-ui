/**
 * Copies 'text' to the system's clipboard.
 * See example usage in '@dariwn-studio/ui-vue/components/atoms/DTextCopy.vue'.
 *
 * @param text
 */
export default text => {
  // TODO: move to compositions ???
  const dummyElement = document.createElement("input");

  document.body.appendChild(dummyElement);
  dummyElement.value = text;
  dummyElement.select();
  document.execCommand("copy");
  document.body.removeChild(dummyElement);
};
