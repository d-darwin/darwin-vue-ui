<template>
  <DInput> </DInput>
</template>

<script>
import DInput from "./DInput";
/**
 * TODO
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DInputPassword",

  components: { DInput },

  data() {
    return {
      shown: false
    };
  }
};
</script>

<style scoped lang="scss">
// @import './assets/styles/colors';
</style>
