import positionFull from "../utils/positionFull";

export default {
  props: {
    /**
     * Positions on the component.
     * Takes values: 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'.
     */
    position: {
      type: String,
      default: "bottom",
      validator: val => positionFull.includes(val)
    }
  }
};
