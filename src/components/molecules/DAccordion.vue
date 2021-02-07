<template>
  <div class="d-accordion">
    <!--    TODO: add animation-->
    <DDetails
      v-for="(item, index) in itemList"
      :key="itemListProps[index].id"
      v-bind="{ ...item, ...itemListProps[index] }"
      @update:open="updateOpenHandler"
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
    },

    // TODO
    isSingleOpened: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      itemListProps: this.itemList.map(item => ({
        id: item.id ? item.id : uuid(),
        open: item.open
      }))
    };
  },

  methods: {
    updateOpenHandler(e) {
      console.log("updateOpenHandler", e);

      if (this.isSingleOpened && e.open) {
        // close all others
      }

      // TODO: emit change like checkboxes
    }
  }
};
</script>

<style scoped lang="scss">
// @import '../../assets/styles/mixins/';
</style>
