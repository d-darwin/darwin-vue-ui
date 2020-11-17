<template>
  <div :class="{ __embedded: format }" class="video-container">
    <div
      :style="{
        height: aspectRatio && aspectRatio !== '0' ? '0' : height,
        width,
        minHeight,
        minWidth,
        maxHeight,
        maxWidth,
        paddingBottom,
      }"
      :class="{ 'aspect-ratio-box': aspectRatio }"
      class="video-wrap"
      v-html="videoCode"
    />

    <DLoader />
  </div>
</template>

<script>
import getVideoId from 'get-video-id'

/** components **/
import DLoader from './DLoader'


/**
 * Компонент предназначен для вставки видео. Рендериться в тег <b>iframe</b> или <b>video</b> и поддерживает ленивую загрузку.
 *
 * @version 1.3.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'DVideo',

  inheritAttrs: false,

  components: { DLoader },

  props: {
    /**
     * Принимает ссылку на youtube, vimeo, vk, mp4 или iframe code.
     */
    content: {
      type: String,
      default: '',
    },

    /**
     * Если видео в формате mp4, то необходимо задать значение 'video/mp4'.
     */
    format: {
      type: String,
      default: '',
      // TODO: expand if needed.
      validator: (val) => ['', 'video/mp4'].includes(val),
    },

    /**
     * Автоматический запуск видео при загрузке компонента.
     */
    autoplay: {
      // TODO: expand to vimeo/youtube.
      type: Boolean,
      default: false,
    },

    /**
     * Отключает звук видео.
     */
    muted: {
      // TODO: expand to vimeo/youtube.
      type: Boolean,
      default: false,
    },

    /**
     * Зацикливает видео.
     */
    loop: {
      // TODO: expand to vimeo/youtube
      type: Boolean,
      default: false,
    },

    /**
     * Соотношение сторон компонента в формате x:y.<br>
     * Может быть проигнорирован если заданы другие свойства размера компонента.
     */
    aspectRatio: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      paddingBottom: 0,
    }
  },

  computed: {
    videoCode() {
      /**
       * If content prop contains simple link to video service, converts this link to <iframe .../>
       */
      let content = this.content
      const linkData = getVideoId(this.content) // if content is link
      if (Object.keys(linkData).length) {
        // TODO: refactor these, make more readable
        if (linkData.service === 'youtube') {
          const allow = this.autoplay ? 'allow="autoplay"' : ''
          const params = this.autoplay ? '?autoplay=1' : ''
          content =
            '<iframe width="100%" height="100%" ' +
            allow +
            ' src="https://www.youtube.com/embed/' +
            linkData.id +
            params +
            '" allowfullscreen loading="lazy"></iframe>'
        } else if (linkData.service === 'vimeo') {
          content =
            '<iframe width="100%" height="100%" ' +
            'src="https://player.vimeo.com/video/' +
            linkData.id +
            '" loading="lazy"></iframe>'
        } else {
          // console.log('Unsupported service:', linkData.service)
        }
      } else if (content.includes('//vk.com/video')) {
        content = `<iframe src="${content}" height="100%" width="100%" allowfullscreen loading="lazy"></iframe>`
      } else {
        // console.log('Unsupported content:', this.content)
      }

      if (this.format === 'video/mp4') {
        // TODO: check format by extension
        const autoplay = this.autoplay ? 'autoplay' : null
        const loop = this.loop ? 'loop' : ''
        const muted = this.muted ? 'muted' : ''
        content =
          `<video ${autoplay} ${loop} ${muted} playsinline preload="none">` +
          `<source src="${this.content}" type="video/mp4" />` +
          '</video>'
      }
      return content
    },
  },

  watch: {
    aspectRatio() {
      this.recalculatePadding()
    },
  },

  mounted() {
    if (this.aspectRatio) {
      this.recalculatePadding()
    }
  },

  methods: {
    recalculatePadding() {
      /**
       * Used to correct vertical size of the map with aspectRatio when it is changed
       * @type {string[]}
       */
      const widthHeight = this.aspectRatio.split(':')
      if (widthHeight[0] && widthHeight[1]) {
        this.paddingBottom = (100 * widthHeight[0]) / widthHeight[1] + '%'
      } else {
        this.paddingBottom = 0
      }
    },
  },
}
</script>

<style lang="scss">
.video-container {
  position: relative;
  max-width: 100%;
  max-height: 100%;
}

.video-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;

  > * {
    overflow: hidden;
    display: block;
    border: none;
    // TODO: remove !important ???
    width: 100% !important;
    height: 100% !important;
  }
}

.aspect-ratio-box {
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  content: '';
  overflow: hidden;

  > * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.__embedded {
  .aspect-ratio-box {
    > * {
      object-fit: cover;
    }
  }
}
</style>
