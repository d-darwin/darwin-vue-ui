<template>
  <DTypography :content="copyrightText" :size="size" />
</template>

<script>
/** utils **/
import fontSizeProp from "../../utils/fontSizeProp";

/** components **/
import DTypography from "../atoms/DTypography";

/**
 * Renders standard copyright string.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DCopyright",

  components: { DTypography },

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
     * Size of the string in <DTypography /> notation.
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
