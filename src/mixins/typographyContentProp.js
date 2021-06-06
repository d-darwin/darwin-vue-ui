export default {
  props: {
    /**
     * May contain any HTML string.<br>
     * BEWARE: Don't pass raw user data because unsafe <i>v-html</i> directive is used under the hood.
     */
    content: {
      type: [String, Number],
      default: ""
    }
  }
};
