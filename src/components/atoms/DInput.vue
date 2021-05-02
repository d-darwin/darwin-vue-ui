<template>
  <div
    :class="{
      [`__${size}`]: size,
      [`__${roundness}`]: roundness,
      __disabled: !!$attrs.disabled
    }"
    v-bind="$attrs"
    class="d-input"
  >
    <DTypography
      v-if="label"
      :content="label"
      :for="componentId"
      tag="label"
      size="small"
      class="label"
    />

    <div :style="controlGroupStyle" class="control-group">
      <span
        v-if="$slots['before']"
        :style="inputBeforeStyle"
        class="input-before"
      >
        <!-- @slot Used to prepend input with icon -->
        <slot name="before" />
      </span>

      <!--need roundness class here for uniformity with other controls-->
      <input
        :id="componentId"
        :class="{
          [`__${roundness}`]: roundness,
          __borderless: borderless,
          '__slot-before': $slots['before'],
          '__slot-after': $slots['after']
        }"
        v-bind="{
          ...$attrs,
          onInput: emitValue,
          onChange: emitValue
        }"
        class="input"
        @keyup.enter.prevent="emitSubmit"
      />

      <span v-if="$slots['after']" :style="inputAfterStyle" class="input-after">
        <!-- @slot Used to append icon to input -->
        <slot name="after" />
      </span>

      <div class="outline" />
    </div>

    <DError :content="error" />
  </div>
</template>

<script>
/** mixins **/
import controlSizeProp from "../../mixins/controlSizeProp";
import controlRoundnessProp from "../../mixins/controlRoundnessProp";

/** compositions **/
import useComponentId from "../../compositions/componentId";

/** components **/
import DTypography from "../containers/DTypography";
import DError from "./DError";

/**
 * The component renders <b>input</b> tag with <b>label</b>.<br>
 * Feel free to use any attrs you expect with <b>input</b> tag,
 * they will be pass to the tag automatically.<br>
 * May be in various sizes and have different corner roundness.<br>
 * Renders error string if any passed to a prop.
 *
 * @version 1.2.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DInput",

  inheritAttrs: false,

  mixins: [controlSizeProp, controlRoundnessProp],

  components: { DError, DTypography },

  emits: ["update:value", "submit"],

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
     * Defines if <b>input</b> tag has to have border.
     */
    borderless: {
      type: Boolean,
      default: false
    },

    /**
     * Pass any style object to <i>.control-group</i> if needed.
     */
    controlGroupStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.input-before</i> if needed.
     */
    inputBeforeStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.input-after</i> if needed.
     */
    inputAfterStyle: {
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
    const { componentId } = useComponentId(props);
    return { componentId };
  },

  methods: {
    emitValue(event) {
      /**
       * Value of the <b>input</b> tag updated. Contains new <i>value</i> and component id.<br>
       * Use @update:value="fn" to catch this event.
       *
       * @event update:value
       * @type {{value: String, id: String}}
       */
      this.$emit("update:value", {
        value: event.target.value,
        id: this.componentId
      });
    },

    emitSubmit(event) {
      /**
       * Enter clicked while focus on the <b>input</b>.
       *
       * @event submit
       * @type {{value: String, id: String}}
       */
      this.$emit("submit", {
        value: event.target.value,
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
@import "../../assets/styles/tokens/controls";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/controls";
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/outline";

// TODO: share styles with DTextarea ???
.d-input {
  width: fit-content;
  min-width: var(--control-min-width);
}

.control-group {
  display: flex;
  flex-direction: column;
  position: relative;
}

.label {
  display: flex;
  margin-bottom: 2px;
}

.input {
  @include general-text;
  @include transition-short;

  // TODO: include reset by default???
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  border: 1px solid var(--color-separator);
  color: var(--color-text);
  text-overflow: ellipsis;

  outline: none;

  &.focus-visible ~ .outline {
    @include outline;

    height: calc(100% + 2 * var(--outline-width));
  }
}

.input-before,
.input-after {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.input-after {
  right: 0;
}

.__borderless {
  border-color: var(--white);
}

.input:focus,
.input:active {
  border-color: var(--color-text-alt);
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--color-text-aux);
  opacity: 1; /* Firefox */
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--color-text-aux);
}
::-ms-input-placeholder {
  /* Microsoft Edge */
  color: var(--color-text-aux);
}

.__disabled {
  .label {
    color: var(--color-text-alt);
  }

  .input {
    color: var(--color-text-alt);
    background: var(--white);
    cursor: not-allowed;
  }

  ::placeholder {
    color: var(--color-text-alt);
  }
  :-ms-input-placeholder {
    color: var(--color-text-alt);
  }
  ::-ms-input-placeholder {
    color: var(--color-text-alt);
  }
}

.__large {
  .input {
    @include large-control;

    padding: 12px 0 12px 15px;

    &.__slot-before {
      padding-left: var(--large-control-height);
    }

    &.__slot-after {
      padding-right: var(--large-control-height);
    }
  }

  &.__smooth {
    .label {
      padding-left: 16px;
    }
  }

  .input-before,
  .input-after {
    width: var(--large-control-height);
  }
}

.__medium {
  .input {
    @include medium-control;

    padding: 7px 0 7px 11px;

    &.__slot-before {
      padding-left: var(--medium-control-height);
    }

    &.__slot-after {
      padding-right: var(--medium-control-height);
    }
  }

  &.__smooth {
    .label {
      padding-left: 12px;
    }
  }

  .input-before,
  .input-after {
    width: var(--medium-control-height);
  }
}

// TODO: __small ???
</style>
