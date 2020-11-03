<template>
  <div class="d-switch">
    <d-typography
      v-if="labels && labels.falsy"
      :content="labels.falsy"
      class="value-label"
    />

    <label class="label">
      <input
        v-bind="{
          ...$attrs,
          onChange: emitChange
        }"
        type="checkbox"
        class="input"
      />
      <span
        :class="{ [`__${type}`]: type, [`__toggle`]: values }"
        class="slider"
      />
    </label>

    <d-typography
      v-if="labels && labels.truthy"
      :content="labels.truthy"
      class="value-label"
    />
  </div>
</template>

<script>
import DTypography from "../containers/DTypography";

/**
 * The components renders switch (has true / false value) or toggle (has custom values).<br>
 * If values prop defined the component will be rendered as toggle (slightly different appearance).
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DSwitch",
  components: { DTypography },
  inheritAttrs: false,

  props: {
    /**
     * Defines color of the component.
     */
    type: {
      type: String,
      default: "primary",
      validator: val => ["primary", "secondary", "tertiary"].includes(val)
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
    }
  },

  methods: {
    emitChange(event) {
      /**
       * Checked attr of the <b>input</b> tag updated. Contains new <i>value</i>.<br>
       * Use @update:value="fn" to catch this event.
       *
       * @event update:value
       * @type {Boolean | String | Number}
       */
      const value = event.target.checked
        ? (this.values && this.values.truthy) || true
        : (this.values && this.values.falsy) || false;

      this.$emit("update:value", value);
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";

.d-switch {
  display: inline-flex;
  width: auto;
  align-items: center;
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

  background-color: var(--text-alt);

  &.__toggle {
    &.__primary {
      background-color: var(--primary);
    }

    &.__secondary {
      background-color: var(--accent);
    }

    &.__tertiary {
      background-color: var(--text);
    }
  }
}

.slider:before {
  @include transition-short;

  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: var(--white);
  border-radius: 50%;
}

.input:checked {
  & + .slider {
    &:before {
      transform: translateX(20px);
    }

    &.__primary {
      background-color: var(--primary);
    }

    &.__secondary {
      background-color: var(--accent);
    }

    &.__tertiary {
      background-color: var(--text);
    }
  }
}

.input:focus + .slider {
  // box-shadow: 0 0 1px #2196f3;
}
</style>
