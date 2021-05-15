import controlColorList from "../variables/controlColorList";

export default {
  props: {
    /**
     * Defines color of the component's default icons.<br>
     * Takes values: "primary", "accent", "text".
     */
    color: {
      type: String,
      default: "primary",
      validator: val => controlColorList.includes(val)
    }
  }
};
