<template>
  <div
    :class="{
      [`__${size}`]: size,
      [`__${roundness}`]: roundness,
      __disabled: disabled
    }"
    class="control-group"
  >
    <label v-if="label" :for="id" class="label">
      <DTypography :content="label" size="small" />
    </label>
    <!--TODO: [`__${roundness}`]: should be at one place-->
    <input
      v-model="inputValue"
      :id="id"
      :name="name"
      :type="type"
      :placeholder="required ? placeholder + '*' : placeholder"
      :autocomplete="autocomplete ? 'on' : 'off'"
      :required="required"
      :disabled="disabled"
      :class="{
        [`__${roundness}`]: roundness,
        __borderless: borderless,
        __error: error
      }"
      class="input"
      @input="emitValue"
      @change="emitValue"
      @keyup.enter.prevent="emitSubmit"
    />
    <div class="outline" />

    <transition name="input-error">
      <DTypography v-if="error" :content="error" size="small" class="error" />
    </transition>
  </div>
</template>

<script>
/** utils **/
import uuid from "@/utils/uuid";

/** components **/
import DTypography from "../containers/DTypography";

/**
 * The components renders input field with label.<br>
 * May be in various sizes and have different corner roundness.<br>
 * Renders error string if any passed to a prop.
 *
 * @version 1.0.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DInput",

  components: { DTypography },

  props: {
    /*TODO: reduce number of props by using v-bind*/
    /**
     * Defines <i>name</i> attr value of the <b>input</b> tag.
     */
    name: {
      type: String,
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
     * Defines <i>type</i> attr value of the <b>input</b> tag.
     */
    type: {
      type: String,
      default: "text"
    },

    /**
     * Defines <i>value</i> тега <b>input</b>.
     */
    value: {
      type: String,
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
     * Defines <i>placeholder</i> attr value of the <b>input</b> tag.
     */
    placeholder: {
      type: String,
      default: ""
    },

    /**
     * Defines <i>required</i> attr value of the <b>input</b> tag.
     */
    required: {
      type: Boolean,
      default: false
    },

    /**
     * Defines <i>autocomplete</i> attr value of the <b>input</b> tag.
     */
    autocomplete: {
      type: Boolean,
      default: false
    },

    /**
     * Defines <i>disabled</i> attr value of the <b>input</b> tag.
     */
    disabled: {
      type: Boolean,
      default: false
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
      inputValue: this.value,
      innerError: this.error,
      id: null
    };
  },

  mounted() {
    this.id = uuid();
  },

  watch: {
    value() {
      this.inputValue = this.value;
    }
  },

  methods: {
    emitValue() {
      /**
       * Value of the <b>input</b> tag changed.<br>
       * Contains new <i>value</i>.
       *
       * @event changed
       * @type {String}
       */
      this.$emit("changed", this.inputValue);
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

<style scoped lang="scss">
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/mixins/control";
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/focus-visible";

.control-group {
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 240px;
}

.label {
  display: flex;
  margin-bottom: 2px;
}

.input {
  @include general-text;
  // @include transition;

  display: inline-block;
  min-width: 240px;
  width: 100%;
  border: 1px solid var(--separator);
  color: var(--text);
  text-overflow: ellipsis;

  outline: none;

  &.focus-visible + .outline {
    // emulates outline property
    // TODO: make mixin ???
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
