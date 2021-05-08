<template>
  <div :class="$attrs.class" class="d-checkbox-group">
    <DTypography
      v-if="title"
      :content="title"
      :style="titleStyle"
      class="title"
    />

    <div :style="listStyle" class="list">
      <DCheckbox
        v-for="(item, index) in itemList"
        :key="index"
        v-bind="{ color, ...item }"
        @update:value="emitChange(index, $event)"
      />
    </div>

    <DError :content="error" />
  </div>
</template>

<script>
/** mixins **/
import controlColorProp from "../../mixins/controlColorProp";

/** components **/
import DTypography from "../containers/DTypography";
import DCheckbox from "../atoms/DCheckbox";
import DError from "../atoms/DError";

/**
 * The component a group of <b>DCheckbox</b> components.
 *
 * @version 1.1.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DCheckboxGroup",

  inheritAttrs: false,

  mixins: [controlColorProp],

  components: { DError, DTypography, DCheckbox },

  emits: ["update:value"],

  props: {
    /**
     * List of props objects to pass to <b>DCheckbox</b> components.
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

    // TODO: add titleProps

    /**
     * Pass any style object to <i>.list</i> if needed.
     */
    listStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * If not empty renders as an error string below the <i>.list</b>.
     */
    error: {
      type: String,
      default: ""
    }
  },

  methods: {
    emitChange(index, { checked, value, id }) {
      /**
       * Checked attr of some of the containing <b>DCheckbox</b> updated.
       * Contains new value of <i>checked</i>, <i>value</i> attrs, <b>DCheckbox</b> id and index.<br>
       * Use @update:value="fn" to catch this event.
       *
       * @event update:value
       * @type {{index: Number, checked: Boolean, value: String, id: String}}
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

.d-checkbox {
  margin-right: var(--gap-8x);
  margin-bottom: var(--gap-2x);

  &:last-child {
    margin-top: 0;
  }
}
</style>
