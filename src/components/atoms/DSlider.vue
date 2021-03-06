<template>
  <div :class="$attrs.class" class="d-select">
    <div class="control-group">
      <DTypography
        v-if="label"
        :content="label"
        :for="componentId"
        :class="{ __disabled: !!$attrs.disabled }"
        tag="label"
        size="small"
        class="label"
      />

      <input
        :id="componentId"
        v-bind="{
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

    <DError :content="error" />
  </div>
</template>

<script>
/** mixins **/
import controlColorProp from "../../mixins/controlColorProp";

/** compositions **/
import useComponentId from "../../compositions/componentId";

/** components **/
import DTypography from "../containers/DTypography";
import DError from "./DError";

/**
 * The components renders custom <b>input</b> tag with <i>type="range"</i> of different colors.<br>
 * Feel free to use any attrs you expect with <b>input</b> tag with <i>type="range"</i>,
 * they will be pass to the tag automatically.
 *
 * @version 1.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DSlider",

  inheritAttrs: false,

  mixins: [controlColorProp],

  components: { DError, DTypography },

  emits: ["update:value"],

  props: {
    /**
     * Defines <i>id</i> attr of the <b>input</b> tag.<br>
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
     * If not empty renders as an error string below the <b>input</b> tag.
     */
    error: {
      type: String,
      default: ""
    }
  },

  setup(props) {
    const { componentId } = useComponentId(props);
    return { componentId };
  },

  methods: {
    emitChange(e) {
      /**
       * Selected <b>option</b> was changed.<br>
       * Events contain <i>value</i> of the selected <i>option</i> and component id.
       *
       * @event update:value
       * @type {{value: String, id: String}}
       */
      this.$emit("update:value", {
        value: e.target.value,
        id: this.componentId
      });
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/outline";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/outline";

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
    color: var(--color-text-aux);
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
  background: var(--color-separator);
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
      background: var(--color-primary);
    }

    &::-moz-range-thumb {
      background: var(--color-primary);
    }

    &:hover::-webkit-slider-thumb {
      background: var(--color-primary-active);
    }

    &:hover::-moz-range-thumb {
      background: var(--color-primary-active);
    }

    &:disabled::-webkit-slider-thumb {
      background: var(--color-primary-disabled);
      cursor: not-allowed;
    }

    &:disabled::-moz-range-thumb {
      background: var(--color-primary-disabled);
      cursor: not-allowed;
    }
  }

  &.__accent {
    &::-webkit-slider-thumb {
      background: var(--color-accent);
    }

    &::-moz-range-thumb {
      background: var(--color-accent);
    }

    &:hover::-webkit-slider-thumb {
      background: var(--color-accent-active);
    }

    &:hover::-moz-range-thumb {
      background: var(--color-accent-active);
    }

    &:disabled::-webkit-slider-thumb {
      background: var(--color-accent-disabled);
      cursor: not-allowed;
    }

    &:disabled::-moz-range-thumb {
      background: var(--color-accent-disabled);
      cursor: not-allowed;
    }
  }

  &.__text {
    &::-webkit-slider-thumb {
      background: var(--color-text);
    }

    &::-moz-range-thumb {
      background: var(--color-text);
    }

    &:hover::-webkit-slider-thumb {
      background: var(--color-text-aux);
    }

    &:hover::-moz-range-thumb {
      background: var(--color-text-aux);
    }

    &:disabled::-webkit-slider-thumb {
      background: var(--color-text-alt);
      cursor: not-allowed;
    }

    &:disabled::-moz-range-thumb {
      background: var(--color-text-disabled);
      cursor: not-allowed;
    }
  }

  outline: none;

  &.focus-visible ~ .outline {
    @include outline;

    top: unset;
    height: calc(20px + 2 * var(--outline-width));
  }
}
</style>
