<template>
  <div class="d-accordion">
    <!--TODO: add transition-->
    <DDetails
      v-for="(item, index) in itemList"
      :key="itemListState[index].id"
      v-bind="{ ...item, ...itemListState[index] }"
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
      itemListState: this.itemList.map(item => ({
        id: item.id ? item.id : uuid(),
        open: item.open || false
      }))
    };
  },

  methods: {
    updateOpenHandler(e) {
      if (this.isSingleOpened && e.open) {
        // close all other items
        this.itemListState = this.itemListState.map(item => ({
          id: item.id,
          open: item.id === e.id
        }));
      } else {
        this.itemListState = this.itemListState.map(item => ({
          id: item.id,
          open: item.id === e.id ? e.open : item.open
        }));
      }

      this.emitChange();
    },

    emitChange() {
      /**
       * Open attr of some of the containing <b>DDetails</b> updated.
       * Contains current state of the <b>DDetails</b> components.<br>
       * Use @update:open="fn" to catch this event.
       *
       * @event update:open
       * @type {{open: Boolean, id: String}}
       */
      this.$emit("update:open", this.itemListState);
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
