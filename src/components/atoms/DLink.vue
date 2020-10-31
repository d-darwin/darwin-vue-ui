<template>
  <component
    :is="el"
    :class="{
      [`__${size}`]: size,
      [`__${type}`]: type
    }"
    v-bind="{ ...$props, ...$attrs }"
    role="link"
    class="d-link"
  >
    <!-- @slot TODO -->
    <slot name="before" />

    <slot />

    <!-- @slot TODO -->
    <slot name="after" />

    <!-- <icon-external-link
      v-if="href && !routeName && !hideExternalLinkIcon"
      class="icon-external-link"
    /> -->
  </component>
</template>

<script>
/** utils **/
import fontSizeProp from "@/utils/fontSizeProp";

/** components **/
// import IconExternalLink from '@/components/atoms/IconExternalLink'

/**
 * Компонент отображается в виде ссылок различного размера и цветов.<br>
 * Если ссылка абсолютная, то к тексту добавляется иконка <i>external link</i>.<br>
 * Компонент рендериться как тег <b>a</b> или <b>n-link</b>.<br>
 * Содержимое ссылки задается через свойство <i>text</i> и/или слот.<br>
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DLink",

  components: {
    // IconExternalLink,
  },

  props: {
    /**
     * Определяет цвета компонента.<br>
     * Принимает значения: 'primary', 'secondary', 'tertiary', 'inverse', 'danger'.
     */
    type: {
      type: String,
      default: "primary",
      validator: val =>
        ["primary", "secondary", "tertiary", "inverse", "danger"].includes(val)
    },

    /**
     * Defines main font props of the component content.<br>
     * Expected values: "small", "general", "longread", "augmented", "h5", "h4", "h3", "h2", "h1".<br>
     * See './src/assets/styles/tokens/_typography.scss' for more details.
     */
    size: fontSizeProp

    /**
     * Определяет нужно ли скрывать, что иконка на внешний ресурс.
     */
    /* hideExternalLinkIcon: {
      type: Boolean,
      default: false,
    }, */
  },

  computed: {
    el() {
      return this.$attrs.to && this.$router ? "n-link" : "a";
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/outline";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/mixins/links";
@import "../../assets/styles/focus-visible";

.d-link {
  width: auto;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  outline: none;

  &.focus-visible {
    &:before {
      // emulates outline property
      // TODO: make mixin ???
      position: absolute;
      content: " ";
      border: var(--outline-width) solid var(--outline-color);
      z-index: -1;
      top: calc(var(--outline-width) * -1);
      left: calc(var(--outline-width) * -1);
      right: calc(var(--outline-width) * -1);
      bottom: calc(var(--outline-width) * -1);
      width: calc(100% + 2 * var(--outline-width));
    }
  }
}

@include typography-sizes;

.__primary {
  @include link-primary;
}

.__secondary {
  @include link-secondary;
}

.__tertiary {
  @include link-tertiary;
}

.__inverse {
  @include link-inverse;
}

/* .icon-external-link {
  margin-left: 6px;
} */
</style>
