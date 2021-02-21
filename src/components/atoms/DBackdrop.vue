<template>
  <transition :name="transitionName">
    <div v-if="isShown" class="d-backdrop" />
  </transition>
</template>

<script>
/**
 * TODO
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DBackdrop",

  props: {
    /**
     * Name of the component transition (animation).
     */
    transitionName: {
      type: String,
      default: "opacity"
    }
  },

  data() {
    return {
      isShown: false // used for transition
    };
  },

  mounted() {
    this.isShown = true;
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/transitions/opacity";

.d-backdrop {
  opacity: 0.2;
  background: var(--color-primary);
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  // z-index: 1000;
}
</style>
