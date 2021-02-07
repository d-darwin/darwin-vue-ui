<template>
  <div class="d-accordion">
    <!--    TODO: add animation-->
    <DDetails v-for="item in itemList" :key="item.id ? item.id " v-bind="item" />
  </div>
</template>

<script>
/** utils **/
import uuid from "../../utils/uuid";

/** components **/
import DDetails from "../atoms/DDetails";

/**
 * TODO
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DAccordion",

  components: { DDetails },

  props: {
    // TODO
    itemList: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
// @import '../../assets/styles/mixins/';
</style>
