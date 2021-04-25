import { PropType } from "vue";
import FontSize from "../typings/types/FontSize";

/**
 * Uses as possible font sizes props for the components.
 * See example usage in '@dariwn-studio/ui-vue/components/containers/DTypography.vue'.
 */
export default {
  type: String as PropType<FontSize>,
  default: "general"
  /* validator: (val: string) =>
    [
      "small",
      "general",
      "longread",
      "augmented",
      "h5",
      "h4",
      "h3",
      "h2",
      "h1"
    ].includes(val) */
};
