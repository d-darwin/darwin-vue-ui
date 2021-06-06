export default {
  props: {
    /**
     * Aspect ratio of the picture.
     * Expected format: 'height:width'.
     */
    aspectRatio: {
      type: String,
      default: "",
      validator: val => {
        const [height, width] = val.split(":");
        return parseInt(height) && parseInt(width);
      }
    }
  }
};
