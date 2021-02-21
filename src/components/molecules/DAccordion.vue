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
 * Render an accordion using <b>DDetails</b> components.
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DAccordion",

  components: { DDetails },

  props: {
    /**
     * List of props objects to pass to <b>DDetails</b> components.
     */
    itemList: {
      type: Array,
      default: () => []
    },

    /**
     * Set to true if only one <b>DDetails</b> component may be opened.
     */
    isSingleOpened: {
      type: Boolean,
      default: false
    },

    /**
     * Defines vertical size of <b>DDetails</b> components summary.<br>
     * Takes values: 'large', 'medium', 'small'.
     */
    size: {
      type: String,
      default: "large",
      validator: val => ["large", "medium", "small"].includes(val)
    },

    /**
     * Defines corner's roundness of <b>DDetails</b> components.<br>
     * Takes values: 'smooth', 'rounded', 'boxed'.
     */
    roundness: {
      type: String,
      default: "rounded",
      validator: val => ["smooth", "rounded", "boxed"].includes(val)
    }
  },

  data() {
    return {
      itemListProps: this.itemList.map(item => ({
        id: item.id ? item.id : uuid(),
        open: item.open || false,
        size: item.size || this.size,
        roundness: item.roundness || this.roundness
      }))
    };
  },

  methods: {
    updateOpenHandler(e) {
      if (this.isSingleOpened && e.open) {
        // close all other items
        this.itemListProps = this.itemListProps.map(item => ({
          ...item,
          open: item.id === e.id
        }));
      } else {
        this.itemListProps = this.itemListProps.map(item => ({
          ...item,
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
      this.$emit(
        "update:open",
        this.itemListProps.map(item => ({ open: item.open, id: item.id }))
      );
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

  &:last-child {
    & {
      margin-bottom: 0;
    }
  }
}
</style>
