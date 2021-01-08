export default (message, error) => {
  const prefix = "[@darwin-studio/ui-vue warn]: ";
  console.warn(prefix + message);

  if (error) {
    console.error(error);
  }
};
