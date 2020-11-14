<template>
  <div class="d-picture">
    <picture
      :class="{ 'aspect-ratio-box': aspectRatio }"
      :style="{
        ...pictureStyle,
        height:
          aspectRatio && aspectRatio !== '0'
            ? '0'
            : pictureStyle && pictureStyle.height,
        paddingBottom
      }"
    >
      <source
        v-for="(item, index) in sortedItems"
        :key="index"
        :media="constructMediaQuery(item)"
        :srcset="item.srcset"
        :data-src="item.src"
      />
      <!--TODO: check lazy loading-->
      <img
        v-if="hasSource"
        ref="image"
        v-bind="{ ...$attrs, alt, title: alt }"
        :srcset="sortedItems[0].srcset"
        :src="sortedItems[0].src"
        :style="imgStyle"
        loading="lazy"
        @load="loadedHandler"
      />

      <template v-else>
        <DIconImage v-if="!$slots['no-image']" />
        <!-- @slot You can replace default no-image icon by passing your own here. -->
        <slot v-else name="no-image" />
      </template>

      <transition name="opacity" mode="out-in">
        <template v-if="!isLoaded && hasSource">
          <DLoader v-if="!$slots['loader']" />
          <!-- @slot You can replace default loader by passing your own here. -->
          <slot v-else name="loader" />
        </template>
      </transition>
    </picture>

    <d-typography v-if="caption" :content="caption" size="small" />
  </div>
</template>

<script>
import DLoader from "../atoms/DLoader";
import DIconImage from "../icons/DIconImage";
import DTypography from "../containers/DTypography";

/**
 * The component renders <b>picture</> tag according to Responsive Image principle.<br>
 *  Supports plain string image asset or an array of image assets for different screen width and pixel density.<br>
 *  Also supports lazy loading, aspect-ration and renders <b>DIconImage</b> icon <i>source</i> prop is empty.
 *
 * @version 1.3.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DPicture",

  inheritAttrs: false,

  components: { DTypography, DLoader, DIconImage },

  props: {
    /**
     * An image asset or an array of such assets. If not presented, the component renders default <b>DIconImage</b>
     * or you custom content if <i>no-icon</i> slot presented.<br>
     * Пример массива:<br>
     * <i>[{min_width: 768, src: 'img_src_path1'}, {min_width: 1024, srcset: [{density: '1x', src: 'img_src_path2'}, {density: '2x', src: 'img_src_path3'}]}]</i>.
     */
    source: {
      type: [Array, String],
      default: () => []
    },

    /**
     * Подпись к компоненту.
     */
    caption: {
      type: String,
      default: ""
    },

    /**
     * Соотношение сторон компонента в формате x:y.<br>
     * Может быть проигнорирован если заданы другие свойства размера компонента.
     */
    aspectRatio: {
      type: String,
      default: ""
    },

    pictureStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Определяет атрибут <i>object-fit</i> тега <b>img</b>/
     */

    imgStyle: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      paddingBottom: 0,
      isLoaded: false
    };
  },

  computed: {
    alt() {
      return this.$attrs.alt ? this.$attrs.alt : this.caption;
    },

    hasSource() {
      return (
        this.sortedItems[0] &&
        (this.sortedItems[0].src || this.sortedItems[0].srcset)
      );
    },

    sortedItems() {
      // Array.sort function mutates array itself
      // so we need to clone it to avoid prop mutates
      const outPicture = JSON.parse(JSON.stringify(this.source));
      if (Array.isArray(outPicture)) {
        // Resort Array by min_width (higher is above)
        outPicture.sort(function(a, b) {
          return b.min_width - a.min_width;
        });
        // if srcset is array of images prepare srcset string
        outPicture.forEach(function(item, k) {
          if (Array.isArray(item.srcset)) {
            let srcset = "";
            item.srcset.forEach(function(srcObj, i) {
              srcset +=
                (i === 0 ? "" : ", ") + srcObj.src + " " + srcObj.density;
            });
            if (srcset) {
              outPicture[k].srcset = srcset;
            }
          }
        });
      } else if (typeof outPicture === "string") {
        return [{ min_width: 0, src: outPicture }];
      } else {
        return [];
      }
      return outPicture;
    }
  },

  watch: {
    aspectRatio() {
      this.recalculatePadding();
    }
  },

  mounted() {
    if (this.aspectRatio) {
      this.recalculatePadding();
    }
  },

  methods: {
    recalculatePadding() {
      /**
       * Used to correct vertical size of the picture with aspectRatio when it is changed
       * @type {string[]}
       */
      const widthHeight = this.aspectRatio.split(":");
      if (widthHeight[0] && widthHeight[1]) {
        this.paddingBottom = (100 * widthHeight[0]) / widthHeight[1] + "%";
      } else {
        this.paddingBottom = 0;
      }
    },

    constructMediaQuery(item) {
      if (item.min_width && item.max_width) {
        return `(min-width: ${item.min_width}px) and (max-width: ${item.max_width}px)`;
      } else if (item.min_width) {
        return `(min-width: ${item.min_width}px)`;
      } else if (item.max_width) {
        return `(max-width: ${item.max_width}px)`;
      } else {
        return null;
      }
    },

    loadedHandler() {
      this.isLoaded = true;
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/colors";
</style>

<style scoped lang="scss">
.d-picture {
  position: relative;
}

.d-loader {
  z-index: 1;
}

.d-typography {
  margin-top: var(--gap-2x);
}

picture {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--background);
  z-index: 10;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .d-icon-image {
    position: absolute;
    left: calc(50% - 12px);
    top: calc(50% - 12px);
    color: var(--text-aux);
  }

  &.aspect-ratio-box {
    position: relative;
    display: block;
    width: 100%;
    height: 0;
    content: "";

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
