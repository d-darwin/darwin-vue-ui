<template>
  <div :class="{ [`__${type}`]: type }" class="d-radio">
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

    <transition name="control-error">
      <DTypography v-if="error" :content="error" size="small" class="error" />
    </transition>
  </div>
</template>

<script>
/** utils **/
import uuid from "../../utils/uuid";

/** components **/
import DIconRadioUnchecked from "../icons/DIconRadioUnchecked";
import DIconRadioChecked from "../icons/DIconRadioChecked";
import DTypography from "../containers/DTypography";

/**
 * The component renders <b>input</b> tag with <i>type="radio"</i> and custom icons.<br>
 * Feel free to use any attrs you expect with <b>input</b> tag with <i>type="radio"</i>,
 * they will be pass to the tag automatically.
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DRadio",

  inheritAttrs: false,

  components: {
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
      inputId: this.id ? this.id : uuid()
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
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/outline";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/mixins/controls";
@import "../../assets/styles/vue-transitions";

.d-radio {
  max-width: 100%;
}

.control-group {
  position: relative;
  display: flex;
  align-items: center;
  width: auto;
  max-width: 100%;
  cursor: pointer;
}

.mark {
  margin: 0 10px 0 0;
  height: 22px;
  display: flex;
  align-items: center;

  &.__primary {
    color: var(--primary);
  }

  &.__accent {
    color: var(--accent);
  }

  &.__text {
    color: var(--text);
  }

  &.__disabled {
    cursor: not-allowed;

    > * {
      color: var(--separator);
    }
  }
}

.input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;

  &.focus-visible ~ .outline {
    // emulates outline property
    // TODO: make mixin ???
    // TODO: include reset by default???
    box-sizing: border-box;
    position: absolute;
    content: " ";
    border: var(--outline-width) solid var(--outline-color);
    z-index: -1;
    top: calc(var(--outline-width) * -1);
    right: calc(var(--outline-width) * -1);
    left: calc(var(--outline-width) * -1);
    bottom: calc(var(--outline-width) * -1);
    width: calc(100% + 2 * var(--outline-width));
  }
}

.label {
  color: var(--text);
}

.d-icon-radio-checked {
  opacity: 0;
}

.d-icon-radio-unchecked {
  opacity: 1;
  color: var(--text-aux);
  position: absolute;
}

.d-icon-radio-checked,
.d-icon-radio-unchecked {
  @include transition-short;
}

.error {
  margin-top: var(--gap-base);
  color: var(--danger);
  text-overflow: ellipsis;
  overflow: hidden;
}

.button {
  @include medium-control;
  @include general-text;
  @include transition-short;

  font-weight: 500;
  padding: 7px 19px;
  width: 100%;
  border: 1px solid var(--separator);
  text-align: center;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: middle;
  // TODO: add global reset style ??
  box-sizing: border-box;

  color: var(--text);
  background: var(--white);

  &:hover,
  &:active {
    cursor: pointer;
    background: var(--background);
  }

  &.__disabled {
    cursor: not-allowed;
    background: var(--white);
    color: var(--text-alt);
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
    color: var(--text);
  }

  ~ .button {
    color: var(--white);

    &.__primary {
      background: var(--primary);
      border-color: var(--primary);

      &:hover,
      &:active {
        background: var(--primary-active);
        border-color: var(--primary-active);
      }
    }

    &.__accent {
      background: var(--accent);
      border-color: var(--accent);

      &:hover,
      &:active {
        background: var(--accent-active);
        border-color: var(--accent-active);
      }
    }

    &.__text {
      background: var(--text);
      border-color: var(--text);

      &:hover,
      &:active {
        background: var(--text-aux);
        border-color: var(--text-aux);
      }
    }

    &.__disabled {
      background: var(--primary-disabled);
      border-color: var(--primary-disabled);
    }
  }
}

input:disabled {
  ~ .label {
    cursor: not-allowed;
    color: var(--text-aux);
  }
}

.__disabled ~ .label {
  cursor: not-allowed;
  color: var(--text-aux);
}
</style>
