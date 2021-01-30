<template>
  <div
    :class="{
      [`${$attrs.class}`]: $attrs.class,
      [`__${size}`]: size,
      [`__${roundness}`]: roundness,
      __disabled: $attrs.disabled !== undefined
    }"
    class="d-input"
  >
    <DTypography
      v-if="label"
      :content="label"
      :for="inputId"
      tag="label"
      size="small"
      class="label"
    />

    <div :style="controlGroupStyle" class="control-group">
      <span v-if="$slots['before']" class="input-before">
        <slot name="before" />
      </span>

      <!--need roundness class here for uniformity with other controls-->
      <input
        :id="inputId"
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

      <span v-if="$slots['after']" class="input-after">
        <slot name="after" />
      </span>

      <div class="outline" />
    </div>

    <DError :text="error" />
  </div>
</template>

<script>
/** compositions **/
import useInputId from "../../compositions/inputId";

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
 * @version 1.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DInput",

  inheritAttrs: false,

  components: { DError, DTypography },

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
     * Defines vertical size of the <b>input</b> tag.<br>
     * Takes values: 'large', 'medium'.
     */
    size: {
      type: String,
      default: "large",
      validator: val => ["large", "medium"].includes(val)
    },

    /**
     * Defines corner's roundness of the <b>input</b> tag.<br>
     * Takes values: 'smooth', 'rounded', 'boxed'.
     */
    roundness: {
      type: String,
      default: "smooth",
      validator: val => ["smooth", "rounded", "boxed"].includes(val)
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
     * Pass any style object to <i>.controlGroupStyle</i> if needed.
     */
    controlGroupStyle: {
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
    emitValue(event) {
      /**
       * Value of the <b>input</b> tag updated. Contains new <i>value</i> and component id.<br>
       * Use @update:value="fn" to catch this event.
       *
       * @event update:value
       * @type {{String, String}}
       */
      this.$emit("update:value", {
        value: event.target.value,
        id: this.inputId
      });
    },

    emitSubmit() {
      /**
       * Enter clicked while focus on the <b>input</b>.
       *
       * @event submitted
       */
      this.$emit("submitted");
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
