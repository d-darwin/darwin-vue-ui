<template>
  <div class="d-radio-group">
    <div :class="{ [`__${type}`]: type }">
      <RadioButton
        v-for="(item, index) in itemList"
        :key="index"
        :name="name"
        :type="type"
        :color="color"
        v-bind="item"
        @click="emitChange"
      />
    </div>
  </div>
</template>

<script>
import RadioButton from "@/components/molecules/ControlRadioButton";
import DarwinText from "@/components/atoms/Text";

/**
 * Компонент рендерится в группу компонентов <b>ControlRadioButton</b>.
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "ControlRadioButtonsGroup",

  components: {
    DarwinText,
    RadioButton
  },

  props: {
    /**
     * Значение атрибута <i>name</i> тега <b>input</b>.
     */
    name: {
      type: String,
      default: `radio_group_${Math.random()}`
    },

    /**
     * Определяет внешний вид компонента.
     */
    type: {
      type: String,
      default: "base",
      validator: val => ["base", "button"].includes(val)
    },

    color: {
      type: String,
      default: "primary",
      validator: val => ["primary", "accent"].includes(val)
    },

    /**
     * Свойства, передаваемые в компоненты <b>ControlRadioButton</b>
     */
    itemList: {
      type: Array,
      default: () => ({})
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
