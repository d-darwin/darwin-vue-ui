<template>
  <div :class="$attrs.class" class="d-radio-group">
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
        v-bind="{ color, type, name: name || componentId, ...item }"
        @update:value="emitChange(index, $event)"
      />
    </div>

    <DError :content="error" />
  </div>
</template>

<script>
/** mixins **/
import controlColorProp from "../../mixins/controlColorProp";

/** compositions **/
import useComponentId from "../../compositions/componentId";

/** components **/
import DTypography from "../containers/DTypography";
import DRadio from "../atoms/DRadio";
import DError from "../atoms/DError";

/**
 * The component renders a group of <b>DRadio</b> components with title.
 *
 * @version 1.0.5
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DRadioGroup",

  inheritAttrs: false,

  mixins: [controlColorProp],

  components: {
    DRadio,
    DError,
    DTypography
  },

  props: {
    /**
     * List of props objects to pass to <b>DRadio</b> components.
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
     * Value of the <i>name</i> attr of the <b>input</b> tags.
     */
    name: {
      type: String,
      default: ""
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

  setup(props) {
    const { componentId } = useComponentId(props);
    return { componentId };
  },

  methods: {
    emitChange(index, { checked, value, id }) {
      /**
       * Checked attr of some of the containing <b>DRadio</b> updated.
       * Contains new value of <i>checked</i>, <i>value</i> attrs, <b>DRadio</b> id and index.<br>
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

.d-radio {
  margin-right: var(--gap-8x);
  margin-bottom: var(--gap-2x);

  &:last-child {
    margin-top: 0;
  }
}
</style>
