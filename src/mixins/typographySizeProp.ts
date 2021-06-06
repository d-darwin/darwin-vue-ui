/** core **/
import { defineComponent } from "vue";
import { PropType } from "vue";

// TODO: which type definition should I use ???
import typographySizeList from "../variables/typographySizeList";
import TypographySize from "../typings/types/typographySize";

export default defineComponent({
  props: {
    /**
     * Defines main font props of the component content.<br>
     * Expected values: "small", "general", "longread", "augmented", "h5", "h4", "h3", "h2", "h1".<br>
     * See './src/assets/styles/tokens/_typography.scss' for more details.
     */
    size: {
      type: String as PropType<TypographySize>,
      default: "general",
      validator: val => typographySizeList.includes(val)
    }
  }
});
