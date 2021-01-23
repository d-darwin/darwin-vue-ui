<template>
  <teleport to="body">
    <DButton
      :icon-only="true"
      class="d-button-scroll-to-top"
      @click="scrollToTop"
    >
      <DIconArrow />
    </DButton>
  </teleport>
</template>

<script>
/** utils **/
import scrollToTop from "../../utils/scrollToTop";

/** components **/
import DButton from "./DButton";
import DIconArrow from "../icons/DIconArrow";

/**
 * TODO:
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DButtonScrollToTop",

  inheritAttrs: false,

  components: { DIconArrow, DButton },

  methods: {
    scrollToTop
  }
};
</script>

<style scoped lang="scss">
// @import "./assets/styles/colors";
.d-button-scroll-to-top {
  position: fixed;
  bottom: 15px;
  right: 15px;
}
</style>
