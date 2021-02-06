<template>
  <DTypography :content="copyrightText" :size="size" class="d-copyright" />
</template>

<script>
/** utils **/
import fontSizeProp from "../../utils/fontSizeProp";

/** components **/
import DTypography from "../containers/DTypography";

/**
 * The component renders standard copyright string. Current year always displays as "to" year.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DCopyright",

  components: { DTypography },

  inheritAttrs: false,

  props: {
    /**
     * Company foundation year.
     */
    startYear: {
      type: Number,
      required: true
    },

    /**
     * Company name.
     */
    company: {
      type: String,
      required: true
    },

    /**
     * Defines main font props of the component content.<br>
     * Expected values: "small", "general", "longread", "augmented", "h5", "h4", "h3", "h2", "h1".<br>
     * See './src/assets/styles/tokens/_typography.scss' for more details.
     */
    size: fontSizeProp
  },

  computed: {
    currentYear() {
      return new Date().getFullYear();
    },

    copyrightText() {
      return (
        "© " +
        (this.currentYear > this.startYear
          ? this.startYear + "–" + this.currentYear
          : this.startYear) +
        " " +
        this.company
      );
    }
  }
};
</script>
