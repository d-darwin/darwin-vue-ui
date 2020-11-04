<template>
  <div class="d-select">
    <div
      :class="{
        [`__${size}`]: size
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
      <select
        :id="inputId"
        :class="{
          [`__${roundness}`]: roundness,
          __borderless: borderless
        }"
        v-bind="{
          ...$attrs,
          onChange: emitChange
        }"
        class="select"
      >
        <option
          v-for="op in options"
          :key="op.value"
          :value="op.value"
          :selected="selected === op.value"
          class="option"
          v-text="op.text"
        />
      </select>
      <DIconDirection v-if="!$slots['icon-dropdown']" />
      <!-- @slot You can replace default dropdown icon by passing your own here. -->
      <slot v-else name="icon-dropdown" />

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
import DIconDirection from "../icons/DIconDirection";
import DTypography from "../containers/DTypography";

/**
 * Renders standard <b>select</b> tag with <b>label</b>.<br>
 * May be in various sizes and have different corner roundness.<br>
 * Renders error string if any passed to a prop.
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "ControlSelect",

  components: { DTypography, DIconDirection },

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
     * Defines if <b>select</b> tag has to have border.
     */
    borderless: {
      type: Boolean,
      default: false
    },

    /**
     * Defines content of the <b>label</b> tag.
     */
    label: {
      type: String,
      default: ""
    },

    /**
     * Defines content of the <b>option</b> tags and their <i>value</i> attrs.
     * Expected format: { value: '', text: '' }
     */
    options: {
      type: Array,
      default: () => []
    },

    /**
     * Defines selected <i>options</i> element.
     * Has to contain <i>value</i> of the <b>option</b> to be selected.
     */
    selected: {
      type: [String, Number],
      default: ""
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
    emitChange(e) {
      /**
       * Selected <b>option</b> was changed.<br>
       * Events contain <i>value</i> of the selected <i>option</i>.
       *
       * @event update:value
       * @type {String}
       */
      this.$emit("update:value", e.target.value);
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/mixins/controls";
@import "../../assets/styles/focus-visible";
@import "../../assets/styles/vue-transitions";

.control-group {
  display: flex;
  align-items: center;
  position: relative;
  // width: 284px;
}

.select {
  @include general-text;

  color: var(--text);
  background: var(--white);
  border: 1px solid var(--separator);
  cursor: pointer;
  // width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // hide default dropdown icon
  // TODO: if prefixes added on prod
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  outline: none;

  /*&.focus-visible {
    // TODO: instead of outline
  }*/
}

.option {
  // width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.error {
  margin-top: var(--gap-base);
  color: var(--danger);
}

.icon-direction {
  pointer-events: none;
  // margin-top: 4px;
  position: absolute;
}

.__borderless {
  border-color: var(--white);
}

.__large {
  .select {
    @include large-control;

    padding: 12px calc(15px + 12px + 12px) 12px 15px;
  }

  .icon-direction {
    right: 15px;
  }
}

.__medium {
  .select {
    @include medium-control;

    padding: 7px calc(11px + 12px + 12px) 7px 11px;
  }

  .icon-direction {
    right: 11px;
  }
}
</style>