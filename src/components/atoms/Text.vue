<template>
  <component
    :is="tag"
    :class="{
      [`__${size}`]: size
    }"
    class="text"
  >
    <slot />
  </component>
</template>

<script>
/**
 * Component intents to display typography text.
 *
 * @version 0.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DText",

  props: {
    /**
     * Определяет тег компонента.<br>
     * Принимает значения: 'div', 'span'.
     */
    tag: {
      type: String,
      default: "div"
    },

    /**
     * Размер текста компонента.<br>
     * Принимает значения: 'augmented', 'longread', 'general', 'small'.
     */
    size: {
      type: String,
      default: "general",
      validator: val =>
        ["augmented", "longread", "general", "small"].includes(val)
    }
  }
};
</script>

<style scoped>
@import "../../assets/styles/_text-tokens.css";

/* special vue pseudo selector to be able to style tags inside slot */
.__small ::v-slotted(*) {
  line-height: var(--small-line-height);
  font-size: var(--small-font-size);
}

.__general ::v-slotted(*) {
  line-height: var(--general-line-height);
  font-size: var(--general-font-size);
}

.__longread ::v-slotted(*) {
  line-height: var(--longread-line-height);
  font-size: var(--longread-font-size);
}

.__augmented ::v-slotted(*) {
  line-height: var(--augmented-line-height);
  font-size: var(--augmented-font-size);
}
</style>
