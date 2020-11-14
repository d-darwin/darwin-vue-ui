<template>
  <div class="d-select">
    <div class="control-group">
      <DTypography
        v-if="label"
        :content="label"
        :for="inputId"
        :class="{ __disabled: $attrs.disabled !== undefined }"
        tag="label"
        size="small"
        class="label"
      />

      <input
        :id="inputId"
        v-bind="{
          ...$props,
          ...$attrs,
          min: $attrs.min || 0,
          max: $attrs.max || 100,
          onChange: emitChange
        }"
        :class="{ [`__${color}`]: color }"
        type="range"
        class="input"
      />

      <div class="outline" />
    </div>

    <transition name="control-error">
      <DTypography v-if="error" :content="error" size="small" class="error" />
    </transition>
  </div>
</template>

<script>
/** utils **/
import uuid from "../../utils/uuid";

/** components **/
import DTypography from "../containers/DTypography";

/**
 * The components renders custom <b>input</b> tag with <i>type="range"</i> of different colors.<br>
 * Feel free to use any attrs you expect with <b>input</b> tag with <i>type="range"</i>,
 * they will be pass to the tag automatically.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DSlider",

  inheritAttrs: false,

  components: { DTypography },

  props: {
    /**
     * Defines <i>id</i> attr of th <b>input</b> tag.<br>
     * If you don't want to specify it, it will be generated automatically.
     */
    id: {
      type: [String, Number],
      default: ""
    },

    /**
     * Defines content of the <b>label</b> tag.
     */
    label: {
      type: String,
      default: ""
    },

    /**
     * Defines color of the component's default icons.<br>
     * Takes values: "primary", "accent", "text".
     */
    color: {
      type: String,
      default: "primary",
      validator: val => ["primary", "accent", "text"].includes(val)
    },

    /**
     * If not empty renders as an error string below the <b>input</b> tag.
     */
    error: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      inputId: this.id ? this.id : uuid()
    };
  },

  methods: {
    emitChange(e) {
      /**
       * Selected <b>option</b> was changed.<br>
       * Events contain <i>value</i> of the selected <i>option</i>.
       *
       * @event update:value
       * @type {String}
       */
      this.$emit("update:value", e.target.value);
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/outline";
</style>

<style scoped lang="scss">
@import "../../assets/styles/vue-transitions";

.control-group {
  display: flex;
  flex-direction: column;
  position: relative;
  // max-width: 240px;
}

.label {
  display: flex;
  margin-bottom: 2px;

  &.__disabled {
    color: var(--text-aux);
  }
}

.input {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  width: 100%;
  height: 2px;
  border-radius: 1px;
  margin: 9px 0;
  background: var(--separator);
  // TODO: include reset by default???
  box-sizing: border-box;

  &:disabled {
    cursor: not-allowed;
  }

  &::-webkit-slider-thumb {
    @include transition-short;

    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    // TODO: include reset by default???
    box-sizing: border-box;
  }

  &::-moz-range-thumb {
    @include transition-short;

    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    // TODO: include reset by default???
    box-sizing: border-box;
  }

  &.__primary {
    &::-webkit-slider-thumb {
      background: var(--primary);
    }

    &::-moz-range-thumb {
      background: var(--primary);
    }

    &:hover::-webkit-slider-thumb {
      background: var(--primary-active);
    }

    &:hover::-moz-range-thumb {
      background: var(--primary-active);
    }

    &:disabled::-webkit-slider-thumb {
      background: var(--primary-disabled);
      cursor: not-allowed;
    }

    &:disabled::-moz-range-thumb {
      background: var(--primary-disabled);
      cursor: not-allowed;
    }
  }

  &.__accent {
    &::-webkit-slider-thumb {
      background: var(--accent);
    }

    &::-moz-range-thumb {
      background: var(--accent);
    }

    &:hover::-webkit-slider-thumb {
      background: var(--accent-active);
    }

    &:hover::-moz-range-thumb {
      background: var(--accent-active);
    }

    &:disabled::-webkit-slider-thumb {
      background: var(--accent-disabled);
      cursor: not-allowed;
    }

    &:disabled::-moz-range-thumb {
      background: var(--accent-disabled);
      cursor: not-allowed;
    }
  }

  &.__text {
    &::-webkit-slider-thumb {
      background: var(--text);
    }

    &::-moz-range-thumb {
      background: var(--text);
    }

    &:hover::-webkit-slider-thumb {
      background: var(--text-aux);
    }

    &:hover::-moz-range-thumb {
      background: var(--text-aux);
    }

    &:disabled::-webkit-slider-thumb {
      background: var(--text-alt);
      cursor: not-allowed;
    }

    &:disabled::-moz-range-thumb {
      background: var(--text-disabled);
      cursor: not-allowed;
    }
  }

  outline: none;

  &.focus-visible + .outline {
    // emulates outline property
    // TODO: make mixin ???
    // TODO: include reset by default???
    box-sizing: border-box;
    position: absolute;
    content: " ";
    border: var(--outline-width) solid var(--outline-color);
    z-index: -1;
    // top: calc(var(--outline-width) * -1);
    height: calc(20px + 2 * var(--outline-width));
    right: calc(var(--outline-width) * -1);
    left: calc(var(--outline-width) * -1);
    bottom: calc(var(--outline-width) * -1);
    width: calc(100% + 2 * var(--outline-width));
  }
}

.error {
  margin-top: var(--gap-base);
  color: var(--danger);
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
