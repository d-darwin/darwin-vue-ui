<template>
  <teleport to="body">
    <!--// TODO: how to customize transition ???-->
    <transition name="scale">
      <DButton
        v-if="isShown"
        :icon-only="true"
        class="d-button-scroll-to-top"
        @click="scrollToTop"
      >
        <DIconArrow />
      </DButton>
    </transition>
  </teleport>
</template>

<script>
/** core **/
import { ref, watch } from "vue";

/** utils **/
import scrollToTop from "../../utils/scrollToTop";

/** compositions **/
import useScrollOffset from "../../compositions/scrollOffset";

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

  setup() {
    const isShown = ref(false);

    const { scrollOffset } = useScrollOffset();

    watch(scrollOffset, scrollOffset => {
      console.log(scrollOffset);
    });

    return {
      isShown
    };
  },

  methods: {
    scrollToTop
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/mixins/breakpoints";
@import "../../assets/styles/transitions/scale";

.d-button-scroll-to-top {
  position: fixed;
  z-index: 100;
}

@include sm-device-max {
  .d-button-scroll-to-top {
    bottom: 12px;
    right: 12px;
  }
}

@include md-device-min {
  .d-button-scroll-to-top {
    bottom: 15px;
    right: 15px;
  }
}
</style>
