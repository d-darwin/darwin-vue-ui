export default message => {
  const prefix = "[@darwin-studio/ui-vue warn]: ";
  console.warn(prefix + message);
};
