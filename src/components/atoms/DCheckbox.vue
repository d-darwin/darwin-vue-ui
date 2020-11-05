<template>
  <div class="d-checkbox">
    <label :for="inputId" :class="{ __error: error }" class="control-group">
      <input
        :id="inputId"
        v-bind="{
          ...$attrs,
          onChange: emitChange
        }"
        type="checkbox"
        class="input"
      />

      <span :class="{ [`__${color}`]: color }" class="mark">
        <DIconUnchecked :disabled="$attrs.disabled" class="unchecked-icon" />
        <DIconChecked :disabled="$attrs.disabled" class="checked-icon" />
      </span>

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
 * Компонент дублирует поведение тега <b>input</b> с атрибутом <i>type="checkbox"</i>.
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
}

.input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.checked-icon {
  opacity: 0;
}
.unchecked-icon {
  opacity: 1;
  color: var(--text-aux);
  position: absolute;
}

.label,
.checked-icon,
.unchecked-icon {
  @include transition-short;
}

.error {
  margin-top: var(--gap-base);
  color: var(--danger);
  text-overflow: ellipsis;
  overflow: hidden;
}

input:checked {
  + .mark {
    .checked-icon {
      opacity: 1;
    }

    .unchecked-icon {
      opacity: 0;
    }
  }
}

input:disabled {
  + * + .label {
    cursor: not-allowed;
    color: var(--text-aux);
  }
}

.error {
  margin-top: var(--gap-base);
}
</style>
