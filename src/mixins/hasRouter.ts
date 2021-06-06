import { defineComponent } from "vue";

/**
 * Checks if vue-router installed and exposes hasRouter variable.
 */
export default defineComponent({
  data(): { hasRouter: boolean } {
    return {
      // @ts-ignore // TODO: don't use suppression
      hasRouter: !!this.$router
    };
  }
});
