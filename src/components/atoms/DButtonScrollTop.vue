<template>
  <teleport to="body">
    <!--// TODO: how to customize transition ???-->
    <transition name="scale">
      <DButton
        v-if="isShown"
        v-bind="{
          'icon-only': true,
          ...buttonProps,
          onClick: scrollToTop
        }"
        :style="buttonStyle"
        class="d-button-scroll-top"
      >
        <DIconArrow v-if="!$slots['icon-arrow']" />
        <!-- @slot You can replace default arrow icon by passing your own here. -->
        <slot v-else name="icon-arrow" />
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
import DIconArrow from "../icons/DIconArrow";
import DButton from "./DButton";

/**
 * The component implements scroll to the top of the page button.<br>
 * It appears when user scroll page to the <i>scrollOffset</i>.
 *
 * @version 1.0.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DButtonScrollTop",

  inheritAttrs: false,

  components: { DIconArrow, DButton },

  props: {
    /**
     * Defines scroll offset when the component appears.
     */
    scrollOffset: {
      type: Number,
      default: 400
    },

    /**
     * Pass any <b>DButton</b> props if needed.
     */
    buttonProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.d-button</i> if needed.
     */
    buttonStyle: {
      type: Object,
      default: () => {}
    }
  },

  setup(props) {
    const isShown = ref(false);

    const { scrollOffset } = useScrollOffset();

    watch(scrollOffset, value => {
      // show the component if page is scrolled enough
      isShown.value = value > props.scrollOffset;
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

.d-button-scroll-top {
  position: fixed;
  z-index: 100;
}

@include sm-device-max {
  .d-button-scroll-top {
    bottom: 12px;
    right: 12px;
  }
}

@include md-device-min {
  .d-button-scroll-top {
    bottom: 15px;
    right: 15px;
  }
}
</style>