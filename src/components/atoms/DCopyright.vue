<template>
  <DTypography
    :content="copyrightText"
    :fontSize="fontSize"
    class="d-copyright"
  />
</template>

<script>
/** mixins **/
import fontSizeProp from "../../mixins/fontSizeProp";

/** components **/
import DTypography from "../containers/DTypography";

/**
 * The component renders standard copyright string. Current year always displays as "to" year.
 *
 * @version 1.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DCopyright",

  inheritAttrs: false,

  mixins: [fontSizeProp],

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
    }
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
