/**
 * Uses as possible font sizes props of components.
 * See example usage in '@dariwn-studio/ui-vue/components/containers/DTypography.vue'.
 */
export default {
  type: String,
  default: "general",
  validator: val =>
    [
      "small",
      "general",
      "longread",
      "augmented",
      "h5",
      "h4",
      "h3",
      "h2",
      "h1"
    ].includes(val)
};
