<template>
  <div class="d-video">
    <component
      :is="containerTag"
      :style="videoContainerStyle"
      v-bind="containerTagProps"
      class="video-container"
    >
      <component
        v-if="videoCode"
        :is="videoTag"
        :style="videoStyle"
        v-bind="videoTagProps"
        v-html="videoCode"
        class="video"
      />

      <template v-else>
        <DIconVideo v-if="!$slots['no-video']" />
        <!-- @slot You can replace default no-video icon by passing your own here. -->
        <slot v-else name="no-video" />
      </template>

      <transition name="opacity">
        <template v-if="!isLoaded && videoCode">
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
import DAspectRatioBox from "../containers/DAspectRatioBox";

/**
 * Компонент предназначен для вставки видео. Рендериться в тег <b>iframe</b> или <b>video</b> и поддерживает ленивую загрузку.
 *
 * @version 1.3.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DVideo",

  inheritAttrs: false,

  components: { DTypography, DIconVideo, DLoader, DAspectRatioBox },

  props: {
    /**
     * Принимает ссылку на youtube, vimeo, vk, mp4 или iframe code.
     */
    source: {
      type: String,
      default: ""
    },

    /**
     * Если видео в формате mp4, то необходимо задать значение 'video/mp4'.
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
      return this.aspectRatio ? "DAspectRatioBox" : "div";
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
        return {
          ...this.$attrs
        };
      }
    },

    videoCode() {
      /**
       * If source prop contains simple link to video service, converts this link to <iframe .../>
       */
      let source = this.source;
      if (this.format === "video/mp4") {
        // local video
        // TODO: check format by extension
        // const autoplay = this.autoplay ? "autoplay" : null;
        // const loop = this.loop ? "loop" : "";
        // const muted = this.muted ? "muted" : "";
        source =
          // `<video ${autoplay} ${loop} ${muted} playsinline preload="none">` +
          `<source src="${this.source}" type="${this.format}" />`;
        // "</video>";
      } else {
        // external video
        const linkData = getVideoId(this.source); // if source is link
        if (Object.keys(linkData).length) {
          // TODO: refactor these, make more readable
          if (linkData.service === "youtube") {
            const allow = this.autoplay ? 'allow="autoplay"' : "";
            const params = this.autoplay ? "?autoplay=1" : "";
            source =
              '<iframe width="100%" height="100%" ' +
              allow +
              ' src="https://www.youtube.com/embed/' +
              linkData.id +
              params +
              '" allowfullscreen loading="lazy" />';
          } else if (linkData.service === "vimeo") {
            source =
              '<iframe width="100%" height="100%" ' +
              'src="https://player.vimeo.com/video/' +
              linkData.id +
              '" loading="lazy" />';
          } else {
            // console.log('Unsupported service:', linkData.service)
          }
        } else if (source.includes("//vk.com/video")) {
          source = `<iframe src="${source}" height="100%" width="100%" allowfullscreen loading="lazy" />`;
        } else {
          // console.log('Unsupported source:', this.source)
        }
      }

      return source;
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
  // position: absolute;
  // left: calc(50% - 12px);
  // top: calc(50% - 12px);
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
  flex: 1;
  object-fit: cover;
}
</style>
