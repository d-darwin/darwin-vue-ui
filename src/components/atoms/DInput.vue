<template>
  <div :class="$attrs.class" class="d-input">
    <div
      :class="{
        [`__${size}`]: size,
        [`__${roundness}`]: roundness,
        __disabled: $attrs.disabled !== undefined
      }"
      class="control-group"
    >
      <DTypography
        v-if="label"
        :content="label"
        :for="inputId"
        tag="label"
        size="small"
        class="label"
      />
      <!--need roundness class here for uniformity with other controls-->
      <input
        :id="inputId"
        :class="{
          [`__${roundness}`]: roundness,
          __borderless: borderless
        }"
        v-bind="{
          ...$attrs,
          onInput: emitValue,
          onChange: emitValue
        }"
        class="input"
        @keyup.enter.prevent="emitSubmit"
      />
      <div class="outline" />
    </div>

    <DError :text="error" />
  </div>
</template>

<script>
/** use **/
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
 * @version 1.0.5
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
     * If not empty renders as an error string below the <b>input</b> tag.
     */
    error: {
      type: String,
      default: ""
    }
  },

  setup(props) {
    return { ...useInputId(props) };
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
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/controls";
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/outline";

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

    top: unset;
  }
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

    &.focus-visible ~ .outline {
      height: calc(var(--large-control-height) + 2 * var(--outline-width));
    }
  }

  &.__smooth {
    .label {
      padding-left: 16px;
    }
  }
}

.__medium {
  .input {
    @include medium-control;

    padding: 7px 0 7px 11px;

    &.focus-visible ~ .outline {
      height: calc(var(--medium-control-height) + 2 * var(--outline-width));
    }
  }

  &.__smooth {
    .label {
      padding-left: 12px;
    }
  }
}

// TODO: __small ???
</style>
