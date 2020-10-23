<template>
  <div
    :class="{
      [`__${size}`]: size,
      [`__${roundness}`]: roundness,
      __disabled: disabled
    }"
    class="control-group"
  >
    <label v-if="label" :for="_uid" class="label">
      <DTypography :content="label" size="small" />
    </label>
    <input
      :id="_uid"
      v-model="inputValue"
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
    <!--<transition name="error">-->
    <DTypography v-if="error" :content="error" size="small" class="error" />
    <!--</transition>-->
  </div>
</template>

<script>
import DTypography from "../containers/DTypography";

/**
 * TODO: descr
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DInput",

  components: { DTypography },

  props: {
    /**
     * Определяет значение атрибута <i>name</i> тега <b>input</b>.
     */
    name: {
      type: String,
      default: ""
    },

    /**
     * Определяет размер компонента.<br>
     * Принимает значения: 'large', 'medium'.
     */
    size: {
      type: String,
      default: "large",
      validator: val => ["large", "medium"].includes(val)
    },

    /**
     * Определяет скругление углов компонента.<br>
     * Принимает значения: 'smooth', 'rounded', 'boxed'
     */
    roundness: {
      type: String,
      default: "smooth",
      validator: val => ["smooth", "rounded", "boxed"].includes(val)
    },

    /**
     * Определяет значение атрибута <i>type</i> тега <b>input</b>.
     */
    type: {
      type: String,
      default: "text"
    },

    /**
     * Определяет начальное значение атрибута <i>value</i> тега <b>input</b>.
     */
    value: {
      type: String,
      default: ""
    },

    /**
     * Определяет текст тега <b>label</b>.
     */
    label: {
      type: String,
      default: ""
    },

    /**
     * Определяет значение атрибута <i>placeholder</i> тега <b>input</b>.
     */
    placeholder: {
      type: String,
      default: ""
    },

    /**
     * Определяет значение атрибута <i>required</i> тега <b>input</b>.
     */
    required: {
      type: Boolean,
      default: false
    },

    /**
     * Определяет значение атрибута <i>autocomplete</i> тега <b>input</b>.
     */
    autocomplete: {
      type: Boolean,
      default: false
    },

    /**
     * Определяет значение атрибута <i>disabled</i> тега <b>input</b>.
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Определяет будет ли компонент иметь обводку.
     */
    borderless: {
      type: Boolean,
      default: false
    },

    /**
     * Если не пустое, то отображается в качестве текста ошибки.
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

  watch: {
    value() {
      this.inputValue = this.value;
    }
  },

  methods: {
    emitValue() {
      /**
       * Значение атрибута <i>value</i> тега <b>input</b> изменилось.<br>
       * Событие содержит новое значение атрибута <i>value</i>.
       *
       * @event changed
       * @type {String}
       */
      this.$emit("changed", this.inputValue);
    },

    emitSubmit() {
      /**
       * Была нажата клавиша Enter.
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
    border: var(--outline-width) solid var(--outline-color);
    content: " ";
    position: absolute;
    z-index: -1;
    top: calc(var(--outline-width) * -1);
    left: calc(var(--outline-width) * -1);
    right: calc(var(--outline-width) * -1);
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
  }

  &.__smooth {
    .label {
      padding-left: 12px;
    }
  }
}
</style>
