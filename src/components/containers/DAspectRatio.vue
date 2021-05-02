<template>
  <component :is="tag" :style="{ paddingBottom }" class="d-aspect-ratio">
    <!-- @slot Contains any HTML -->
    <slot />
  </component>
</template>

<script>
import aspectRatioProp from "../../mixins/aspectRatioProp";

/**
 * The component uses padding-bottom / zero-height hack to simulate aspect-ratio CSS property.
 *
 * @version 1.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DAspectRatio",

  mixins: [aspectRatioProp],

  props: {
    /**
     * A tag of the container component.
     */
    tag: {
      // TODO: should I enumerate all possible tags???
      type: String,
      default: "div"
    }
  },

  data() {
    return {
      paddingBottom: null
    };
  },

  watch: {
    aspectRatio() {
      this.recalculatePadding();
    }
  },

  mounted() {
    this.recalculatePadding();
  },

  methods: {
    recalculatePadding() {
      /**
       * Used to correct vertical size of the picture with aspectRatio when it is changed
       */
      const widthHeight = this.aspectRatio.toString().split(":");
      if (widthHeight[0] && widthHeight[1]) {
        this.paddingBottom =
          (100 * parseInt(widthHeight[0])) / parseInt(widthHeight[1]) + "%";
      } else {
        this.paddingBottom = null;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.d-aspect-ratio {
  position: relative;
  display: block;
  width: 100%;
  height: 0;

  > *,
  > ::v-slotted(*) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
