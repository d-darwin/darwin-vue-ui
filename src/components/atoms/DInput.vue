<template>
  <div class="d-input">
    <div
      :class="{
        [`__${size}`]: size,
        [`__${roundness}`]: roundness,
        __disabled: $attrs.disabled
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
          __borderless: borderless,
          __error: error
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

    <transition name="control-error">
      <DTypography v-if="error" :content="error" size="small" class="error" />
    </transition>
  </div>
</template>

<script>
/** utils **/
import uuid from "../../utils/uuid";

/** components **/
import DTypography from "../containers/DTypography";

/**
 * The component renders <b>input</b> tag with <b>label</b>.<br>
 * May be in various sizes and have different corner roundness.<br>
 * Renders error string if any passed to a prop.
 *
 * @version 1.0.3
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DInput",

  inheritAttrs: false,

  components: { DTypography },

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

  data() {
    return {
      inputId: this.id ? this.id : uuid()
    };
  },

  methods: {
    emitValue(event) {
      /**
       * Value of the <b>input</b> tag updated. Contains new <i>value</i>.<br>
       * Use @update:value="fn" to catch this event.
       *
       * @event update:value
       * @type {String}
       */
      this.$emit("update:value", event.target.value);
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
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/outline";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/controls";
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/focus-visible";
@import "../../assets/styles/vue-transitions";

.control-group {
  display: flex;
  flex-direction: column;
  position: relative;
  // max-width: 240px;
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
  // min-width: 240px;
  width: 100%;
  border: 1px solid var(--separator);
  color: var(--text);
  text-overflow: ellipsis;

  outline: none;

  &.focus-visible + .outline {
    // emulates outline property
    // TODO: make mixin ???
    // TODO: include reset by default???
    @include transition-short;
    box-sizing: border-box;
    position: absolute;
    content: " ";
    border: var(--outline-width) solid var(--outline-color);
    z-index: -1;
    // top: calc(var(--outline-width) * -1);
    right: calc(var(--outline-width) * -1);
    left: calc(var(--outline-width) * -1);
    bottom: calc(var(--outline-width) * -1);
    width: calc(100% + 2 * var(--outline-width));
  }

  &.__error {
    border-color: var(--red);
  }
}

.error {
  margin-top: var(--gap-base);
  color: var(--danger);
}

.__borderless {
  border-color: var(--white);
}

.input:focus,
.input:active {
  border-color: var(--text-alt);
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--text-aux);
  opacity: 1; /* Firefox */
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--text-aux);
}
::-ms-input-placeholder {
  /* Microsoft Edge */
  color: var(--text-aux);
}

.__disabled {
  .label {
    color: var(--text-alt);
  }

  .input {
    color: var(--text-alt);
    background: var(--white);
    cursor: not-allowed;
  }

  ::placeholder {
    color: var(--text-alt);
  }
  :-ms-input-placeholder {
    color: var(--text-alt);
  }
  ::-ms-input-placeholder {
    color: var(--text-alt);
  }
}

.__large {
  .input {
    @include large-control;

    padding: 12px 0 12px 15px;

    &.focus-visible + .outline {
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

    &.focus-visible + .outline {
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
