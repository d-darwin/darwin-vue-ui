<template>
  <div class="d-checkbox-group">
    <DTypography v-if="title" :content="title" class="title" />

    <div class="checkbox-list">
      <DCheckbox
        v-for="(item, index) in itemList"
        :key="index"
        v-bind="item"
        class="checkbox"
        @update:value="emitChange(index, $event)"
      />
    </div>
  </div>
</template>

<script>
import DTypography from "../containers/DTypography";
import DCheckbox from "../atoms/DCheckbox";

/**
 * The component ...
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "ControlCheckboxGroup",

  components: { DTypography, DCheckbox },

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
    }
  },

  methods: {
    emitChange(index, { checked, value, id }) {
      console.log(index, checked, value, id);
      // this.$set(this.itemListState, checked);

      /**
       *
       * @event change
       * @type {Array}
       */
      this.$emit("update:value", { checked, value, id, index });
    }
  }
};
</script>

<style scoped lang="scss"></style>
