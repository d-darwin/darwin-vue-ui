<template>
  <div :class="$attrs.class" class="d-video">
    <component
      :is="containerTag"
      :style="videoContainerStyle"
      v-bind="containerTagProps"
      class="video-container"
    >
      <component
        v-if="source"
        :is="videoTag"
        :style="videoStyle"
        v-bind="videoTagProps"
        v-html="videoHTML"
        class="video"
      />

      <template v-else>
        <DIconVideo v-if="!$slots['no-video']" />
        <!-- @slot You can replace default no-video icon by passing your own here. -->
        <slot v-else name="no-video" />
      </template>

      <transition name="opacity">
        <template v-if="!isLoaded && source">
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
import getVideoId from "get-video-id";

/** components **/
import DLoader from "./DLoader";
import DIconVideo from "../icons/DIconVideo";
import DTypography from "../containers/DTypography";
import DAspectRatio from "../containers/DAspectRatio";

/**
 * The component intents to insert video into your page.<br>
 * It renders <b>iframe</b> or <b>video</b> or any iframe depending on your source value.<br>
 * Supports lazy loading with <b>DLoader</b> placeholder, aspect-ration and renders <b>DIconVideo</b> icon if <i>source</i> prop is empty.
 *
 * @version 1.3.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DVideo",

  inheritAttrs: false,

  components: { DTypography, DIconVideo, DLoader, DAspectRatio },

  props: {
    /**
     * Pass youtube, vimeo, vine, videopress link, local video path or any iframe code.
     */
    source: {
      type: String,
      default: ""
    },

    /**
     * Format of the video source if it is local.
     */
    format: {
      type: String,
      default: null,
      validator: val =>
        [
          null,
          "video/mp4",
          "video/mpeg",
          "video/ogg",
          "video/webm",
          "video/3gpp",
          "video/3gpp2",
          "video/mp2t"
        ].includes(val)
    },

    /**
     * Pass any style object <i>.video-container</i> if needed.
     */
    videoContainerStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object here for <b>img</b> tag if needed.
     */
    videoStyle: {
      type: Object,
      default: () => {}
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
      type: String,
      default: ""
    }
  },

  data() {
    return {
      isLoaded: false
    };
  },

  computed: {
    containerTag() {
      return this.aspectRatio ? "DAspectRatio" : "div";
    },

    containerTagProps() {
      if (this.aspectRatio) {
        return {
          "aspect-ratio": this.aspectRatio
        };
      } else {
        return null;
      }
    },

    videoTag() {
      return this.format ? "video" : "iframe";
    },

    videoTagProps() {
      if (this.format) {
        return {
          ...this.$attrs,
          onLoadeddata: () => (this.isLoaded = true)
        };
      } else {
        const linkData = getVideoId(this.source); // if source is link
        let src = null;
        if (Object.keys(linkData).length) {
          src = linkData && linkData.id;
          if (linkData.service === "youtube") {
            src = "https://www.youtube.com/embed/" + src;
          } else if (linkData.service === "vimeo") {
            src = "https://player.vimeo.com/video/" + src;
          } else if (linkData.service === "vine") {
            src = `https://vine.co/v/${src}/embed/simple`;
          } else if (linkData.service === "videopress") {
            src = "https://videopress.com/embed/" + src;
          } else {
            throw new Error("Unsupported video service");
          }
        } else {
          src = this.source;
        }

        return {
          ...this.$attrs,
          src,
          loading: "lazy"
        };
      }
    },

    videoHTML() {
      if (this.format) {
        return `<source src="${this.source}" type="${this.format}" />`;
      }
      return null;
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
.d-video {
  position: relative;
  display: flex;
  flex-direction: column;
}

.d-typography {
  margin-top: var(--gap-2x);
}

.d-loader {
  z-index: -1;
}

.d-icon-video {
  color: var(--color-text-aux);
}

.video-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow: hidden;
  background: var(--color-background);
  z-index: 10;
}

.video {
  height: 100%;
  width: 100%;
  border: none;
  object-fit: cover;
}
</style>
