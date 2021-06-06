/**
 * Add source (library name) to the warnings
 *
 * @param message
 * @param error
 */
export default (message, error) => {
  // TODO: move to compositions ???
  const prefix = "[@darwin-studio/ui-vue warn]: ";
  console.warn(prefix + message);

  if (error) {
    console.error(error);
  }
};
