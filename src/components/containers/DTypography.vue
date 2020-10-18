<!--suppress ALL -->
<template>
  <component
    v-if="content"
    :is="tag"
    :class="{
      [`__${size}`]: size
    }"
    v-html="content"
    class="d-typography"
  />
  <component
    v-else
    :is="tag"
    :class="{
      [`__${size}`]: size
    }"
    class="d-typography"
  >
    <!-- @slot contains any HTML or components -->
    <slot v-if="$slots.default" />
  </component>
</template>

<script>
/** utils **/
import fontSizeProp from "../../utils/fontSizeProp";

/**
 * Renders typography text according to design tokens from './src/assets/styles/tokens/_typography.scss'.<br>
 * Handles content relativ links cliks as routes.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DTypography",

  props: {
    /**
     * May contain any HTML string. Alternatavly you can use defaul slot to place any HTML or components.
     */
    content: {
      type: [String, Number],
      default: ""
    },

    /**
     * Which tag should wrap component content.
     */
    tag: {
      type: String,
      default: "div"
    },

    /**
     * Defines main font props of the component content.<br>
     * Expected values: "small", "general", "longread", "augmented", "h5", "h4", "h3", "h2", "h1".<br>
     * See './src/assets/styles/tokens/_typography.scss' for more details.
     */
    size: fontSizeProp
  },

  // TODO: how to reuse relative link handling logic ?
  // TODO: how to not include this logic if no vue-router installed
  data() {
    return {
      links: []
    };
  },

  mounted() {
    if (this.$router) {
      this.addListeners();
    }
  },

  beforeUnmount() {
    if (this.$router) {
      this.removeListeners();
    }
  },

  watch: {
    content() {
      if (this.$router) {
        this.contentUpdatedHandler();
      }
    }
  },

  methods: {
    /**
     * Prevents default browser behavior (page reload) for relative links.
     */
    navigate(event) {
      const href = event.target.getAttribute("href");
      const target = event.target.getAttribute("target");
      if (href && href[0] === "/" && target !== "_blank") {
        event.preventDefault();
        this.$router.push(href);
      }
    },

    contentUpdatedHandler() {
      this.removeListeners();
      this.$nextTick(() => {
        this.addListeners();
      });
    },

    addListeners() {
      this.links = this.$el.getElementsByTagName("a");
      for (let i = 0; i < this.links.length; i++) {
        this.links[i].addEventListener("click", this.navigate, false);
      }
    },

    removeListeners() {
      for (let i = 0; i < this.links.length; i++) {
        this.links[i].removeEventListener("click", this.navigate, false);
      }
      this.links = [];
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/mixins/typography";

@include text-sizes;
@include heading-sizes;

.d-typography > *,
.d-typography > ::v-slotted(*) {
  margin: 1rem 0;
  color: currentColor;
}

.d-typography > :first-child,
.d-typography > ::v-slotted(:first-child) {
  margin-top: 0;
}

.d-typography > :last-child,
.d-typography > ::v-slotted(:last-child) {
  margin-bottom: 0;
}
</style>
