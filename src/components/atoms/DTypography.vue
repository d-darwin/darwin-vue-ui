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
/**
 * Component intents to display typography text.
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

    size: {
      type: String,
      default: "general",
      validator: val =>
        [
          "small",
          "general",
          "longread",
          "augmented",
          "h5",
          "h4",
          "h3",
          "h2",
          "h1"
        ].includes(val)
    }
  },

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

  methods: {
    /**
     * Нажатие на внутреннюю ссылку обрабатывается как переход по маршруту.
     *
     * @param event
     */
    navigate($event) {
      const href = $event.target.getAttribute("href");
      const target = $event.target.getAttribute("target");
      if (href && href[0] === "/" && target !== "_blank") {
        $event.preventDefault();
        this.$router.push(href);
      }
    },

    contentUpdated() {
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

<style scoped>
@import "../../assets/styles/_typography-tokens.css";

.d-typography > *,
.d-typography > ::v-slotted(*) {
  margin: 1em 0;
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
  font-size: var(--small-font-size);
  line-height: var(--small-line-height);
  font-weight: var(--small-font-weight);
}

.__general {
  font-size: var(--general-font-size);
  line-height: var(--general-line-height);
  font-weight: var(--general-font-weight);
}

.__longread {
  font-size: var(--longread-font-size);
  line-height: var(--longread-line-height);
  font-weight: var(--longread-font-weight);
}

.__augmented {
  font-size: var(--augmented-font-size);
  line-height: var(--augmented-line-height);
  font-weight: var(--augmented-font-weight);
}

h5,
.__h5 {
  font-size: var(--h5-font-size);
  line-height: var(--h5-line-height);
  font-weight: var(--h5-font-weight);
}

h4,
.__h4 {
  font-size: var(--h4-font-size);
  line-height: var(--h4-line-height);
  font-weight: var(--h4-font-weight);
}

h3,
.__h3 {
  font-size: var(--h3-font-size);
  line-height: var(--h3-line-height);
  font-weight: var(--h3-font-weight);
}

h2,
.__h2 {
  font-size: var(--h2-font-size);
  line-height: var(--h2-line-height);
  font-weight: var(--h2-font-weight);
}

h1,
.__h1 {
  font-size: var(--h1-font-size);
  line-height: var(--h1-line-height);
  font-weight: var(--h1-font-weight);
}
</style>
