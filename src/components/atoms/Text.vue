<template>
  <div><slot /></div>
</template>

<script>

/**
 * Component
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DText"
};
</script>

<style scoped>
/* special vue pseudo selector to be able to style tags inside slot */
::v-slotted(p) {
  font-style: italic;
}
</style>
