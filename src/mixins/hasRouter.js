/**
 * Checks if vue-router installed and exposes hasRouter variable.
 */
export default {
  data() {
    return {
      hasRouter: false
    };
  },

  created() {
    this.hasRouter = !!this.$router;
  }
};
