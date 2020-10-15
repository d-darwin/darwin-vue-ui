<template>
  <DTypography :content="copyrightText" :size="size" />
</template>

<script>
/** utils **/
import fontSize from "../../utils/fontSize";

/** components **/
import DTypography from "../atoms/DTypography";

/**
 * Renders standard copyright.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DCopyright",

  components: { DTypography },

  props: {
    startYear: {
      type: Number,
      required: true
    },

    company: {
      type: String,
      required: true
    },

    size: fontSize
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
