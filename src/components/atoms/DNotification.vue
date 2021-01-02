<template>
  <transition name="opacity">
    <div v-if="shown && content" class="d-notification">
      <!--TODO: use DTypography slot-->
      <DTypography
        :content="content"
        v-bind="typographyProps"
        :style="typographyStyle"
      />
    </div>
  </transition>
</template>

<script>
import DTypography from "../containers/DTypography";

/**
 * The component TODO
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DNotification",

  components: { DTypography },

  props: {
    /**
     * TODO
     */
    content: {
      type: String,
      default: ""
    },

    /**
     * Pass any <b>DTypography</b> props if needed.
     */
    typographyProps: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.d-typography</i> if needed.
     */
    typographyStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * TODO
     */
    duration: {
      type: Number,
      default: 5
    }
  },

  data() {
    return {
      shown: false,
      timeoutHandler: null
    };
  },

  watch: {
    // TODO: move to setup
    content(value) {
      if (value) {
        this.showNotification();
      }
    }
  },

  mounted() {
    this.showNotification();
  },

  beforeUnmount() {
    clearTimeout(this.timeoutHandler);
  },

  methods: {
    showNotification() {
      this.shown = true;

      clearTimeout(this.timeoutHandler);

      this.timeoutHandler = setTimeout(() => {
        this.shown = false;
      }, this.duration * 1000);
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/controls";
// TODO: how to not use it here
@import "../../assets/styles/tokens/shadows";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/shadows";
@import "../../assets/styles/transitions/opacity";

.d-notification {
  position: fixed;
  width: 100vw;
  bottom: var(--gap-6x);
  left: 0;
  display: flex;
  justify-content: center;
  min-height: var(--medium-control-height);
  height: fit-content;
  z-index: 100;
  pointer-events: none;
}

.d-typography {
  @include shadow;

  background: var(--color-text);
  color: var(--white);
  padding: var(--gap-2x) var(--gap-5x);
}
</style>
