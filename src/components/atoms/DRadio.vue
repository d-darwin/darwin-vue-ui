<template>
  <div :class="{ ...$attrs.class, [`__${type}`]: type }" class="d-radio">
    <label
      :for="inputId"
      :class="{ __disabled: $attrs.disabled !== undefined }"
      class="control-group"
    >
      <input
        :id="inputId"
        v-bind="{
          ...$attrs,
          onChange: emitChange
        }"
        type="radio"
        class="input"
      />

      <template v-if="type === 'base'">
        <span
          :class="{
            [`__${color}`]: color,
            __disabled: $attrs.disabled !== undefined
          }"
          class="mark"
        >
          <DIconRadioUnchecked v-if="!$slots['icon-unchecked']" />
          <!-- @slot You can replace default unchecked icon by passing your own here. -->
          <slot v-else name="icon-unchecked" />

          <DIconRadioChecked v-if="!$slots['icon-checked']" />
          <!-- @slot You can replace default checked icon by passing your own here. -->
          <slot v-else name="icon-checked" />
        </span>

        <DTypography :content="label" class="label" />
      </template>

      <span
        v-if="type === 'button'"
        :class="{ [`__${color}`]: color }"
        class="button __smooth"
        v-text="label"
      />

      <span class="outline" />
    </label>

    <DControlError :text="error" />
  </div>
</template>

<script>
/** utils **/
import uuid from "../../utils/uuid";

/** components **/
import DIconRadioUnchecked from "../icons/DIconRadioUnchecked";
import DIconRadioChecked from "../icons/DIconRadioChecked";
import DTypography from "../containers/DTypography";
import DControlError from "./DControlError";

/**
 * The component renders <b>input</b> tag with <i>type="radio"</i> and custom icons.<br>
 * Feel free to use any attrs you expect with <b>input</b> tag with <i>type="radio"</i>,
 * they will be pass to the tag automatically.
 *
 * @version 1.0.3
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DRadio",

  inheritAttrs: false,

  components: {
    DControlError,
    DTypography,
    DIconRadioUnchecked,
    DIconRadioChecked
  },

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
     * Defines appearance of the components.
     */
    type: {
      type: String,
      default: "base",
      validator: val => ["base", "button"].includes(val)
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
     * Defines content of the <b>label</b> tag.
     */
    label: {
      type: String,
      default: "Label"
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
      // TODO: move al inputId logic to mixin or composition API ???
      inputId: this.id || uuid()
    };
  },

  methods: {
    emitChange(event) {
      /**
       * Component was clicked. Contains value of the <b>input</b>.<br>
       * Use @update:value="fn" to catch this event.
       *
       * @event update:value
       * @type {Boolean}
       */
      this.$emit("update:value", event.target.value);
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
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/mixins/controls";
@import "../../assets/styles/mixins/outline";

.control-group {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: fit-content;
  cursor: pointer;
}

.mark {
  margin: 0 10px 0 0;
  height: 22px;
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

.label {
  color: var(--color-text);
}

.d-icon-radio-checked {
  opacity: 0;
}

.d-icon-radio-unchecked {
  opacity: 1;
  color: var(--color-text-aux);
  position: absolute;
}

.d-icon-radio-checked,
.d-icon-radio-unchecked {
  @include transition-short;
}

.button {
  @include medium-control;
  @include general-text;
  @include transition-short;

  font-weight: 500;
  padding: 7px 19px;
  width: 100%;
  border: 1px solid var(--color-separator);
  text-align: center;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: middle;
  // TODO: add global reset style ??
  box-sizing: border-box;

  color: var(--color-text);
  background: var(--white);

  &:hover,
  &:active {
    cursor: pointer;
    background: var(--color-background);
  }

  &.__disabled {
    cursor: not-allowed;
    background: var(--white);
    color: var(--color-text-alt);
  }
}

input:checked {
  ~ .mark {
    .d-icon-radio-checked {
      opacity: 1;
    }

    .d-icon-radio-unchecked {
      opacity: 0;
    }
  }

  ~ .label {
    color: var(--color-text);
  }

  ~ .button {
    color: var(--white);

    &.__primary {
      background: var(--color-primary);
      border-color: var(--color-primary);

      &:hover,
      &:active {
        background: var(--color-primary-active);
        border-color: var(--color-primary-active);
      }
    }

    &.__color-accent {
      background: var(--color-accent);
      border-color: var(--color-accent);

      &:hover,
      &:active {
        background: var(--color-accent-active);
        border-color: var(--color-accent-active);
      }
    }

    &.__text {
      background: var(--color-text);
      border-color: var(--color-text);

      &:hover,
      &:active {
        background: var(--color-text-aux);
        border-color: var(--color-text-aux);
      }
    }

    &.__disabled {
      background: var(--color-primary-disabled);
      border-color: var(--color-primary-disabled);
    }
  }
}

input:disabled {
  ~ .label {
    cursor: not-allowed;
    color: var(--color-text-aux);
  }
}

.__disabled ~ .label {
  cursor: not-allowed;
  color: var(--color-text-aux);
}
</style>
