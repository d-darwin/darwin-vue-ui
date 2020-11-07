<template>
  <div class="d-checkbox">
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

      <DTypography class="label" :size="size" :content="label" />
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
import DIconUnchecked from "../icons/DIconUnchecked";
import DIconChecked from "../icons/DIconChecked";
import DTypography from "../containers/DTypography";

/**
 * Renders <b>input</b> tag with <i>type="checkbox"</i> and custom icons.<br>
 * Feel free to use any attrs you expect with <b>input</b> tag with <i>type="checkbox"</i>,
 * they will be pass to the tag automatically.
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "ControlCheckbox",

  components: { DTypography, DIconChecked, DIconUnchecked },

  inheritAttrs: false,

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
     * Defines color of the component's default icons.
     */
    color: {
      type: String,
      default: "primary",
      validator: val => ["primary", "accent"].includes(val)
    },

    /**
     * Defines vertical size of the <b>input</b> tag.<br>
     * Takes values: 'large', 'medium'.
     */
    size: {
      type: String,
      default: "general",
      validator: val => ["general", "small"].includes(val)
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
      inputId: this.id ? this.id : uuid()
    };
  },

  methods: {
    emitChange(event) {
      /**
       * Checked attr of the <b>input</b> tag updated. Contains new value of <i>checked</i> prop.<br>
       * Use @update:value="fn" to catch this event.
       *
       * @event update:value
       * @type {Boolean}
       */
      this.$emit("update:value", event.target.checked);
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";

.control-group {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: auto;
  cursor: pointer;
}

.mark {
  margin: 3px 10px 0 0;
  height: auto;
  display: flex;
  align-items: center;

  &.__primary {
    color: var(--primary);
  }

  &.__accent {
    color: var(--accent);
  }

  &.__disabled {
    color: var(--separator);
    cursor: not-allowed;
  }
}

.input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;

  &.focus-visible + .mark + .outline {
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

.d-icon-checked {
  opacity: 0;
}

.d-icon-unchecked {
  opacity: 1;
  color: var(--text-aux);
  position: absolute;
}

.label,
.d-icon-checked,
.d-icon-unchecked {
  @include transition-short;
}

.error {
  margin-top: var(--gap-base);
  color: var(--danger);
  text-overflow: ellipsis;
  overflow: hidden;
}

.input:checked {
  + .mark {
    .d-icon-checked {
      opacity: 1;
    }

    .d-icon-unchecked {
      opacity: 0;
    }
  }
}

.__disabled + * + .label {
  cursor: not-allowed;
  color: var(--text-aux);
}

.error {
  margin-top: var(--gap-base);
}
</style>
