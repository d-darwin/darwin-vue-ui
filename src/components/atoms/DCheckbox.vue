<template>
  <div :class="$attrs.class" class="d-checkbox">
    <label :for="inputId" class="control-group">
      <input
        :id="inputId"
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
          __disabled: $attrs.disabled !== undefined
        }"
        :style="markStyle"
        class="mark"
      >
        <DIconUnchecked v-if="!$slots['icon-unchecked']" />
        <!-- @slot You can replace default unchecked icon by passing your own here. -->
        <slot v-else name="icon-unchecked" />

        <DIconChecked v-if="!$slots['icon-checked']" />
        <!-- @slot You can replace default checked icon by passing your own here. -->
        <slot v-else name="icon-checked" />
      </span>

      <span class="outline" />

      <DTypography
        :content="label"
        :size="labelSize"
        :style="labelStyle"
        class="label"
      />
    </label>

    <DError :text="error" />
  </div>
</template>

<script>
/** compositions **/
import useInputId from "../../compositions/inputId";

/** components **/
import DIconUnchecked from "../icons/DIconUnchecked";
import DIconChecked from "../icons/DIconChecked";
import DTypography from "../containers/DTypography";
import DError from "./DError";

/**
 * Renders <b>input</b> tag with <i>type="checkbox"</i> and custom icons.<br>
 * Feel free to use any attrs you expect with <b>input</b> tag with <i>type="checkbox"</i>,
 * they will be pass to the tag automatically.
 *
 * @version 1.0.5
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DCheckbox",

  inheritAttrs: false,

  components: { DError, DTypography, DIconChecked, DIconUnchecked },

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
     * Defines color of the component's default icons.<br>
     * Takes values: "primary", "accent", "text".
     */
    color: {
      type: String,
      default: "primary",
      validator: val => ["primary", "accent", "text"].includes(val)
    },

    /**
     * Pass any style object to <i>.mark</i> if needed.
     */
    markStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Defines content of the <b>label</b> tag.
     */
    label: {
      type: String,
      default: "Label"
    },

    /**
     * Defines <b>DTypography</b> size.<br>
     * Takes values: 'large', 'medium'.
     */
    labelSize: {
      type: String,
      default: "general",
      validator: val => ["general", "small"].includes(val)
    },

    /**
     * Pass any style object to <i>.label</i> if needed.
     */
    labelStyle: {
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
    const { inputId } = useInputId(props);
    return { inputId };
  },

  methods: {
    emitChange(event) {
      /**
       * Checked attr of the <b>input</b> tag updated.
       * Contains new value of <i>checked</i>, <i>value</i> attrs and component id.<br>
       * Use @update:value="fn" to catch this event.
       *
       * @event update:value
       * @type {{Boolean, String, String}}
       */
      this.$emit("update:value", {
        checked: event.target.checked,
        value: event.target.value,
        id: this.inputId
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
  position: relative;
  display: flex;
  align-items: flex-start;
  width: fit-content;
  cursor: pointer;
}

.mark {
  margin: 3px 10px 0 0;
  height: auto;
  display: flex;
  align-items: center;

  &.__primary {
    color: var(--color-primary);
  }

  &.__accent {
    color: var(--color-accent);
  }

  &.__text {
    color: var(--color-text);
  }

  &.__disabled {
    cursor: not-allowed;

    > * {
      color: var(--color-separator);
    }
  }
}

.input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;

  &.focus-visible ~ .outline {
    @include outline;
  }
}

.d-icon-checked {
  opacity: 0;
}

.d-icon-unchecked {
  opacity: 1;
  color: var(--color-text-aux);
  position: absolute;
}

.d-icon-checked,
.d-icon-unchecked {
  @include transition-short;
}

.input:checked {
  ~ .mark {
    .d-icon-checked {
      opacity: 1;
    }

    .d-icon-unchecked {
      opacity: 0;
    }
  }
}

.__disabled ~ .label {
  cursor: not-allowed;
  color: var(--color-text-aux);
}
</style>
