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

    <DControlError :text="error" />
  </div>
</template>

<script>
/** components **/
import DTypography from "../containers/DTypography";
import DCheckbox from "../atoms/DCheckbox";
import DControlError from "../atoms/DControlError";

/**
 * The component ...
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "ControlCheckboxGroup",

  components: { DControlError, DTypography, DCheckbox },

  props: {
    /**
     * Получает название компонента.
     */
    title: {
      type: String,
      default: ""
    },

    /**
     * Свойства, передаваемые в компоненты <b>ControlCheckbox</b>
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
