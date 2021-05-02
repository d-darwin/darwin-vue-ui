import controlTypeList from "../utils/controlTypeList";

export default {
  props: {
    /**
     * Defines colors of the component as well as :hover and :active behavior.<br>
     * Takes values: 'primary', 'secondary', 'alternative', 'inverse', 'danger'.
     */
    type: {
      type: String,
      default: "primary",
      validator: val => controlTypeList.includes(val)
    }
  }
};
