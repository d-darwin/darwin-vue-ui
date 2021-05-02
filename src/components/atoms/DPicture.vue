<template>
  <div :class="$attrs.class" class="d-picture">
    <component
      :is="tag"
      :style="pictureStyle"
      v-bind="tagProps"
      class="picture"
    >
      <source
        v-for="(item, index) in sortedItems"
        :key="index"
        :media="constructMediaQuery(item)"
        :srcset="item.srcset"
        :data-src="item.src"
      />
      <img
        v-if="hasSource"
        ref="image"
        v-bind="{ ...$attrs, alt, title: alt }"
        :srcset="sortedItems[0].srcset"
        :src="sortedItems[0].src"
        :style="imgStyle"
        loading="lazy"
        class="img"
        @load="loadedHandler"
      />

      <template v-else>
        <DIconImage v-if="!$slots['no-image']" />
        <!-- @slot You can replace default no-image icon by passing your own here. -->
        <slot v-else name="no-image" />
      </template>

      <transition :name="transitionName">
        <template v-if="!isLoaded && hasSource">
          <DLoader v-if="!$slots['loader']" />
          <!-- @slot You can replace default loader by passing your own here. -->
          <slot v-else name="loader" />
        </template>
      </transition>
    </component>

    <DTypography v-if="caption" :content="caption" size="small" />
  </div>
</template>

<script>
import DLoader from "./DLoader";
import DIconImage from "../icons/DIconImage";
import DTypography from "../containers/DTypography";
import DAspectRatio from "../containers/DAspectRatio";

/**
 * The component renders <b>picture</b> tag according to the Responsive Image Principle.<br>
 *  Supports plain string image asset or an array of image assets for different screen width and pixel density.<br>
 *  Also supports lazy loading with <b>DLoader</b> placeholder, aspect-ration and renders <b>DIconImage</b> icon if <i>source</i> prop is empty.
 *
 * @version 1.4.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DPicture",

  inheritAttrs: false,

  components: { DTypography, DLoader, DIconImage, DAspectRatio },

  emits: ["loaded"],

  props: {
    /**
     * An image asset or an array of such assets.
     * If empty, the component renders default <b>DIconImage</b>.<br>
     * Expected formats:<br>
     * * '/image_src_string' or<br>
     * * [<br>
     *    { min_width: 320, src: 'img_src_string_xs' },<br>
     *    { min_width: 480, srcset: [<br>
     *      { density: '1x', src: 'img_src_string_sm_1x' },<br>
     *      { density: '2x', src: 'img_src_string_sm_2x' }<br>
     *      ]<br>
     *    }<br>
     *  ].
     */
    source: {
      // TODO: specify more accurate type ???
      type: [Array, String],
      default: () => []
    },

    /**
     * The picture caption. Also used as <i>alt</i> and <i>title</> attrs if they aren't presented.
     */
    caption: {
      type: String,
      default: ""
    },

    /**
     * Aspect ratio of the picture.
     * Expected format: 'height:width'.
     */
    aspectRatio: {
      // TODO: specify more accurate type ???
      type: String,
      default: ""
    },

    /**
     * Pass any style object here for <b>picture</b> tag if needed.
     */
    pictureStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object here for <b>img</b> tag if needed.
     */
    imgStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Name of the component transition (animation).
     */
    transitionName: {
      type: String,
      default: "opacity"
    }
  },

  data() {
    return {
      isLoaded: false
    };
  },

  computed: {
    tag() {
      return this.aspectRatio ? "DAspectRatio" : "picture";
    },

    tagProps() {
      if (this.aspectRatio) {
        return {
          "aspect-ratio": this.aspectRatio,
          tag: "picture"
        };
      } else {
        return null;
      }
    },

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
        return this.source;
      }
      return outPicture;
    }
  },

  watch: {
    isLoaded(value) {
      this.$emit("loaded", value);
    }
  },

  methods: {
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
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 100%;
  width: 100%;
}

.d-typography {
  margin-top: var(--gap-2x);
}

.d-loader {
  z-index: 1;
}

.d-icon-image {
  color: var(--color-text-aux);
}

.picture {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow: hidden;
  background: var(--color-background);
  z-index: 10;
}

.img {
  object-fit: cover;
}
</style>
