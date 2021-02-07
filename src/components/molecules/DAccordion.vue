<template>
  <div class="d-accordion">
    <!--    TODO: add animation-->
    <DDetails
      v-for="(item, index) in itemList"
      :key="itemListKeys[index]"
      v-bind="{ ...item, id: itemListKeys[index] }"
    />
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
  },

  data() {
    return {
      itemListKeys: this.itemList.map(item => (item.id ? item.id : uuid()))
    };
  }
};
</script>

<style scoped lang="scss">
// @import '../../assets/styles/mixins/';
</style>
