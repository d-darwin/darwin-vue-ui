export default {
  props: {
    /**
     * Defines main font props of the component content.<br>
     * Expected values: "small", "general", "longread", "augmented", "h5", "h4", "h3", "h2", "h1".<br>
     * See './src/assets/styles/tokens/_typography.scss' for more details.
     */
    size: {
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
    }
  }
};
