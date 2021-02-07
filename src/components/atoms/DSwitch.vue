<template>
  <div
    :class="{
      __disabled: $attrs.disabled !== undefined,
      [`${$attrs.class}`]: $attrs.class
    }"
    class="d-switch"
  >
    <div class="control-group">
      <DTypography
        v-if="labels && labels.falsy"
        :tag="isChecked ? 'label' : 'div'"
        :for="componentId"
        :content="labels.falsy"
        class="value-label"
      />

      <label :for="componentId" class="label">
        <input
          :id="componentId"
          v-bind="{
            ...$attrs,
            onChange: emitChange
          }"
          type="checkbox"
          class="input"
        />

        <span
          :class="{
            [`__${color}`]: color,
            [`__toggle`]: values
          }"
          class="slider"
        />

        <span class="outline" />
      </label>

      <DTypography
        v-if="labels && labels.truthy"
        :tag="isChecked ? 'div' : 'label'"
        :for="componentId"
        :content="labels.truthy"
        class="value-label"
      />
    </div>

    <DError :text="error" />
  </div>
</template>

<script>
/** compositions **/
import useInputId from "../../compositions/componentId";

/** components **/
import DTypography from "../containers/DTypography";
import DError from "./DError";

/**
 * The components renders switch (has true / false value) or toggle (has custom values).<br>
 * Feel free to use any attrs you expect with <b>input</b> tag with <i>type="checkbox"</i>,
 * they will be pass to the tag automatically.<br>
 * If values prop defined the component will be rendered as toggle (slightly different appearance).
 *
 * @version 1.0.5
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DSwitch",

  inheritAttrs: false,

  components: { DError, DTypography },

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
     * Defines color of the component.
     */
    color: {
      type: String,
      default: "primary",
      validator: val => ["primary", "accent", "text"].includes(val)
    },

    /**
     * You can replace default true/false values with your own.<br>
     * Expected format: <i>{ truthy: "On", falsy: "Off" }.</i>
     */
    values: {
      type: Object,
      default: () => {}
    },

    /**
     * You can add labels to the component states.<br>
     * Expected format: <i>{ truthy: "On", falsy: "Off" }.</i>
     */
    labels: {
      type: Object,
      default: () => {}
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
    const { componentId } = useInputId(props);
    return { componentId };
  },

  data() {
    return {
      isChecked: this.$attrs.checked
    };
  },

  methods: {
    emitChange(event) {
      this.isChecked = event.target.checked;

      /**
       * Checked attr of the <b>input</b> tag updated. Contains new <i>value</i> and component id.<br>
       * Use @update:value="fn" to catch this event.
       *
       * @event update:value
       * @type {{Boolean | String | Number, String}}
       */
      const value = event.target.checked
        ? (this.values && this.values.truthy) || true
        : (this.values && this.values.falsy) || false;

      this.$emit("update:value", { value, id: this.componentId });
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
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/outline";

.control-group {
  display: inline-flex;
  width: auto;
  align-items: center;
}

label {
  cursor: pointer;
}

.value-label {
  white-space: nowrap;
}

.value-label:first-child {
  margin-right: 16px;
}

.value-label:last-child {
  margin-left: 16px;
}

.label {
  display: block;
  position: relative;
  width: 44px;
  min-width: 44px;
  height: 24px;
}

.input {
  opacity: 0;
  width: 0;
  height: 0;

  &.focus-visible ~ .outline {
    @include outline;

    border-radius: calc(12px + var(--outline-width));
  }
}

.slider {
  @include transition-short;

  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 14px;
  width: 44px;
  height: 24px;
  border: 1px solid transparent;
  // TODO: attach reset by default???
  box-sizing: border-box;

  background-color: var(--color-text-alt);

  &.__toggle {
    &.__primary {
      background-color: var(--color-primary);
    }

    &.__accent {
      background-color: var(--color-accent);
    }

    &.__text {
      background-color: var(--color-text);
    }
  }
}

.slider:before {
  @include transition-short;

  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 1px;
  bottom: 1px;
  background-color: var(--white);
  border-radius: 50%;
}

.input:checked {
  & ~ .slider {
    &:before {
      transform: translateX(20px);
    }

    &.__primary {
      background-color: var(--color-primary);
    }

    &.__accent {
      background-color: var(--color-accent);
    }

    &.__text {
      background-color: var(--color-text);
    }
  }
}

.__disabled {
  .value-label {
    color: var(--color-text-aux);
    cursor: not-allowed;
  }

  .input + .slider,
  .input:checked + .slider {
    background-color: var(--color-separator);
    cursor: not-allowed;
  }
}
</style>
