import controlSizeList from "../utils/variables/controlSizeList";

export default {
  props: {
    /**
     * Defines vertical size of the component and paddings.<br>
     * Takes values: 'large', 'medium', 'small'.
     */
    size: {
      type: String,
      default: "medium",
      validator: val => controlSizeList.includes(val)
    }
  }
};
