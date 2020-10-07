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
::v-slotted(p) {
  font-style: italic;
}
</style>
