<template>
  <div class="d-accordion">
    <!--TODO: add transition-->
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
        open: item.open || false
      }))
    };
  },

  methods: {
    updateOpenHandler(e) {
      console.log("updateOpenHandler", e);

      if (this.isSingleOpened && e.open) {
        // close all other items
        console.log(e.id);
        this.itemListProps = this.itemListProps.map(item => ({
          id: item.id,
          open: item.id === e.id
        }));

        console.log(this.itemListProps);
      }

      // TODO: emit change like checkboxes
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/mixins/shadows";
@import "../../assets/styles/mixins/transitions";

.d-accordion {
  display: flex;
  flex-direction: column;
}

.d-details {
  @include shadow-medium;
  @include transition-short;

  &:hover {
    @include shadow-large;
  }

  & {
    margin: var(--gap-base) 0;
  }

  &:first-child {
    & {
      margin-top: 0;
    }
  }
}
</style>
