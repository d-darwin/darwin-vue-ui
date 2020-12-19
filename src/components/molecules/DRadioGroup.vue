<template>
  <div class="d-radio-group">
    <DTypography
      v-if="title"
      :content="title"
      :style="titleStyle"
      class="title"
    />

    <div :style="listStyle" class="list">
      <DRadio
        v-for="(item, index) in itemList"
        :key="index"
        v-bind="{ ...item, name }"
        @update:value="emitChange(index, $event)"
      />
    </div>

    <DError :text="error" />
  </div>
</template>

<script>
/** utils **/
import uuid from "../../utils/uuid";

/** components **/
import DTypography from "../containers/DTypography";
import DRadio from "../atoms/DRadio";
import DError from "../atoms/DError";

/**
 * Компонент рендерится в группу компонентов <b>DRadio</b>.
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "ControlRadioButtonsGroup",

  inheritAttrs: false,

  components: {
    DRadio,
    DError,
    DTypography
  },

  props: {
    /**
     * Value of the <i>name</i> attr of the <b>input</b> tags.
     */
    name: {
      type: String,
      default: `radio_group_${uuid()}`
    },

    /**
     *  <b>DRadio</b>
     */
    itemList: {
      type: Array,
      default: () => []
    },

    /**
     * Title of the group.
     */
    title: {
      type: String,
      default: ""
    },

    /**
     * Pass any style object to <i>.title</i> if needed.
     */
    titleStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.list</i> if needed.
     */
    listStyle: {
      type: Object,
      default: () => {}
    },

    error: {
      type: String,
      default: ""
    }
  },

  methods: {
    emitChange(value) {
      /**
       * Компонент изменил свое состояние. Событие содержит значение атрибута <i>value</i> нажатого компонента <b>ControlRadioButton</b>.
       *
       * @event change
       * @type {String}
       */
      this.$emit("change", value);
    }
  }
};
</script>

<style scoped lang="scss"></style>
