import controlRoundnessList from "../variables/controlRoundnessList";

export default {
  props: {
    /**
     * Defines corner's roundness of the component.<br>
     * Takes values: 'smooth', 'rounded', 'boxed'.
     */
    roundness: {
      type: String,
      default: "rounded",
      validator: val => controlRoundnessList.includes(val)
    }
  }
};
