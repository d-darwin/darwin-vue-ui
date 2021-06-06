import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    /**
     * May contain any HTML string.<br>
     * BEWARE: Don't pass raw user data because unsafe <i>v-html</i> directive may be used under the hood.
     */
    content: {
      type: [String, Number] as PropType<string | Number>,
      default: ""
    }
  }
});
