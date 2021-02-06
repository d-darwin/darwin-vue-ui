export default (message, error) => {
  // TODO: move to compositions ???
  const prefix = "[@darwin-studio/ui-vue warn]: ";
  console.warn(prefix + message);

  if (error) {
    console.error(error);
  }
};
