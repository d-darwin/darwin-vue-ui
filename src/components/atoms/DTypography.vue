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
    <slot v-if="$slots.default" />
  </component>
</template>

<script>
/** utils **/
import fontSize from "../../utils/fontSize";

/**
 * Displays typography text.
 *
 * @version 0.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DTypography",

  props: {
    content: {
      type: [String, Number],
      default: ""
    },

    tag: {
      type: String,
      default: "div"
    },

    size: fontSize
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
      this.contentUpdatedHandler();
    }
  },

  methods: {
    /**
     * Click on a relative link don't reloads the page
     *
     * @param event
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
@import "../../assets/styles/typography-mixins";

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

.__small {
  @include small-text;
}

.__general {
  @include general-text;
}

.__longread {
  @include longread-text;
}

.__augmented {
  @include augmented-text;
}

h5,
.__h5 {
  @include h5-heading;
}

h4,
.__h4 {
  @include h4-heading
}

h3,
.__h3 {
  @include h3-heading
}

h2,
.__h2 {
  @include h2-heading
}

h1,
.__h1 {
  @include h1-heading
}
</style>
