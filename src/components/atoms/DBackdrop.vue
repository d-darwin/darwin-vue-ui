<template>
  <div class="d-backdrop" />
</template>

<script>
/**
 * TODO
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DBackdrop"
};
</script>

<style scoped lang="scss">
.d-backdrop {
  // TODO: move backdrop opacity to tokens ???
  opacity: 0.2;
  background: var(--color-primary);
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
}
</style>
