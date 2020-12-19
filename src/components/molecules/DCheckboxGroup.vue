<template>
  <div class="d-checkbox-group">
    <DTypography
      v-if="title"
      :content="title"
      :style="titleStyle"
      class="title"
    />

    <div :style="checkboxListStyle" class="checkbox-list">
      <DCheckbox
        v-for="(item, index) in itemList"
        :key="index"
        v-bind="item"
        @update:value="emitChange(index, $event)"
      />
    </div>

    <DError :text="error" />
  </div>
</template>

<script>
/** components **/
import DTypography from "../containers/DTypography";
import DCheckbox from "../atoms/DCheckbox";
import DError from "../atoms/DError";

/**
 * The component ...
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DCheckboxGroup",

  components: { DError, DTypography, DCheckbox },

  props: {
    /**
     *
     */
    title: {
      type: String,
      default: ""
    },

    /**
     *  <b>ControlCheckbox</b>
     */
    itemList: {
      type: Array,
      default: () => []
    },

    /**
     * Pass any style object to <i>.title</i> if needed.
     */
    titleStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.checkbox-list</i> if needed.
     */
    checkboxListStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * If not empty renders as an error string below the <i>.checkbox-list</b>.
     */
    error: {
      type: String,
      default: ""
    }
  },

  methods: {
    emitChange(index, { checked, value, id }) {
      /**
       *
       * @event change
       * @type {{Boolean, String, String, Number}}
       */
      this.$emit("update:value", { checked, value, id, index });
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/gaps";
</style>

<style scoped lang="scss">
.checkbox-list {
  margin-top: var(--gap-base);
  display: flex;
  flex-wrap: wrap;
  margin-bottom: calc(var(--gap-base) * -1);
}

.d-checkbox {
  margin-right: var(--gap-8x);
  margin-bottom: var(--gap-base);

  &:last-child {
    margin-top: 0;
  }
}
</style>
