/**
 * Checks if vue-router installed and exposes hasRouter variable.
 */
export default {
  data() {
    return {
      hasRouter: !!this.$router
    };
  },
};
