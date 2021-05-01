<template>
  <div class="d-backdrop" @click="clickHandler" />
</template>

<script>
/**
 * The component renders simple backdrop and intended to be used with Drawers, Modals, etc.
 *
 * @version 1.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DBackdrop",

  emits: ["click"],

  methods: {
    clickHandler() {
      /**
       * Just emits click event without any payload.
       *
       * @event click
       * @type {undefined}
       */
      this.$emit("click");
    }
  }
};
</script>

<style scoped lang="scss">
.d-backdrop {
  // TODO: move backdrop opacity to tokens ???
  position: fixed;
  height: 100vh;
  width: 100vw;
  opacity: 0.2;
  background: var(--color-primary);
  top: 0;
  left: 0;
}
</style>
