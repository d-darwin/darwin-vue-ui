<template>
  <div :class="{ ...$attrs.class }" class="d-radio-group">
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
        v-bind="{ ...item, name, type }"
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
  name: "DRadioGroup",

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
     * Defines appearance of <b>DRadio</> components.
     */
    type: {
      type: String,
      default: "base",
      validator: val => ["base", "button"].includes(val)
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
    emitChange(index, { checked, value, id }) {
      /**
       * Checked attr of some of the containing <b>DRadio</b> updated.
       * Contains new value of <i>checked</i>, <i>value</i> attrs, <b>DRadio</b> id and index.<br>
       * Use @update:value="fn" to catch this event.
       *
       * @event update:value
       * @type {{Boolean, String, String, Number}}
       */
      this.$emit("update:value", { index, checked, value, id });
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/gaps";
</style>

<style scoped lang="scss">
.list {
  margin-top: var(--gap-2x);
  display: flex;
  flex-wrap: wrap;
  margin-bottom: calc(var(--gap-2x) * -1);
}

.d-radio {
  margin-right: var(--gap-8x);
  margin-bottom: var(--gap-2x);

  &:last-child {
    margin-top: 0;
  }
}
</style>
