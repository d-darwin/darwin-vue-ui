import position from "../variables/position";

export default {
  props: {
    /**
     * Positions on the component.
     * Takes values: 'top', 'right', 'bottom', 'left'.
     */
    position: {
      type: String,
      default: "right",
      validator: val => position.includes(val)
    }
  }
};
