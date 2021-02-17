<template>
  <div
    :class="{
      [`${$attrs.class}`]: $attrs.class,
      [`__${size}`]: size,
      [`__${roundness}`]: roundness,
      __disabled: !!$attrs.disabled
    }"
    class="d-textarea"
  >
    <DTypography
      v-if="label"
      :content="label"
      :for="componentId"
      tag="label"
      size="small"
      class="label"
    />

    <div class="control-group">
      <!--need roundness class here for uniformity with other controls-->
      <textarea
        :id="componentId"
        :class="{
          [`__${roundness}`]: roundness,
          __borderless: borderless
        }"
        v-bind="{
          ...$attrs,
          onInput: emitValue,
          onChange: emitValue
        }"
        class="textarea"
      />

      <div class="outline" />
    </div>

    <DError :text="error" />
  </div>
</template>

<script>
/** utils **/
import useInputId from "../../compositions/componentId";

/** components **/
import DTypography from "../containers/DTypography";
import DError from "./DError";

/**
 * The component renders <b>textarea</b> tag with <b>label</b>.<br>
 * Feel free to use any attrs you expect with <b>textarea</b> tag,
 * they will be pass to the tag automatically.<br>
 * May be in various sizes and have different corner roundness.<br>
 * Renders error string if any passed to a prop.
 *
 * @version 1.0.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DTextarea",

  inheritAttrs: false,

  components: { DError, DTypography },

  props: {
    /**
     * Defines <i>id</i> attr of the <b>textarea</b> tag.<br>
     * If you don't want to specify it, it will be generated automatically.
     */
    id: {
      type: [String, Number],
      default: ""
    },

    /**
     * Defines vertical size of the <b>textarea</b> tag.<br>
     * Takes values: 'large', 'medium'.
     */
    size: {
      type: String,
      default: "large",
      validator: val => ["large", "medium"].includes(val)
    },

    /**
     * Defines corner's roundness of the <b>textarea</b> tag.<br>
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
     * Defines if <b>textarea</b> tag has to have border.
     */
    borderless: {
      type: Boolean,
      default: false
    },

    /**
     * If not empty renders as an error string below the <b>textarea</b> tag.
     */
    error: {
      type: String,
      default: ""
    }
  },

  setup(props) {
    const { componentId } = useInputId(props);
    return { componentId };
  },

  methods: {
    emitValue(event) {
      /**
       * Value of the <b>textarea</b> tag updated. Contains new <i>value</i> and component id.<br>
       * Use @update:value="fn" to catch this event.
       *
       * @event update:value
       * @type {{value: String, id: String}}
       */
      this.$emit("update:value", {
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
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/controls";
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/outline";

// TODO: share styles with DInput ???
.d-textarea {
  width: fit-content;
  min-width: var(--control-min-width);
}

.control-group {
  display: flex;
  flex-direction: column;
  position: relative;
  width: fit-content;
}

.label {
  display: flex;
  margin-bottom: 2px;
}

.textarea {
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

  // TODO: outline is visible even if use mouse
  &.focus-visible ~ .outline {
    @include outline;

    height: calc(100% + 2 * var(--outline-width));
  }
}

.__borderless {
  border-color: var(--white);
}

.textarea:focus,
.textarea:active {
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

  .textarea {
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
  .textarea {
    @include large-control;

    padding: 12px 15px;
  }

  &.__smooth {
    .label {
      padding-left: 16px;
    }
  }
}

.__medium {
  .textarea {
    @include medium-control;

    padding: 7px 11px;
  }

  &.__smooth {
    .label {
      padding-left: 12px;
    }
  }
}

// TODO: __small ???
</style>
