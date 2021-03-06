<template>
  <div :class="$attrs.class" class="d-select">
    <div
      :class="{
        [`__${size}`]: size,
        [`__${roundness}`]: roundness
      }"
      class="control-group"
    >
      <DTypography
        v-if="label"
        :content="label"
        :for="componentId"
        tag="label"
        size="small"
        class="label"
      />

      <select
        :id="componentId"
        v-bind="{
          ...$attrs,
          onChange: emitChange
        }"
        :class="{
          [`__${roundness}`]: roundness,
          __borderless: borderless
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

      <div class="outline" />

      <DIconDirection v-if="!$slots['icon-dropdown']" />
      <!-- @slot You can replace default dropdown icon by passing your own here. -->
      <slot v-else name="icon-dropdown" />
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
import DIconDirection from "../icons/DIconDirection";
import DTypography from "../containers/DTypography";
import DError from "./DError";

/**
 * Renders standard <b>select</b> tag with <b>label</b>.<br>
 * Feel free to use any attrs you expect with <b>select</b> tag,
 * they will be pass to the tag automatically.<br>
 * May be in various sizes and have different corner roundness.<br>
 * Renders error string if any passed to a prop.
 *
 * @version 1.1.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DSelect",

  inheritAttrs: false,

  mixins: [controlSizeProp, controlRoundnessProp],

  components: { DError, DTypography, DIconDirection },

  emits: ["update:value"],

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
      // TODO: specify more accurate type ???
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

  setup(props) {
    const { componentId } = useComponentId(props);
    return { componentId };
  },

  methods: {
    emitChange(e) {
      /**
       * Selected <b>option</b> was changed.<br>
       * Events contain <i>value</i> of the selected <i>option</i> and component id.
       *
       * @event update:value
       * @type {{value: String, id: String}}
       */
      this.$emit("update:value", {
        value: e.target.value,
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
@import "../../assets/styles/mixins/typography";
@import "../../assets/styles/mixins/controls";
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/outline";

.d-select {
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

.select {
  @include general-text;
  @include transition-short;

  color: var(--color-text);
  background: var(--white);
  border: 1px solid var(--color-separator);
  cursor: pointer;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  // hide default dropdown icon
  // TODO: check if prefixes added on prod
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  outline: none;

  &.focus-visible ~ .outline {
    @include outline;

    top: unset;
  }
}

.option {
  // width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.d-icon-direction {
  pointer-events: none;
  position: absolute;
}

.__borderless {
  border-color: var(--white);
}

.__large {
  .select {
    @include large-control;

    padding: 12px calc(15px + 12px + 12px) 12px 15px;

    &.focus-visible ~ .outline {
      height: calc(var(--large-control-height) + 2 * var(--outline-width));
    }
  }

  .d-icon-direction {
    right: 15px;
    bottom: 20px;
  }

  &.__smooth {
    .label {
      padding-left: 16px;
    }
  }
}

.__medium {
  .select {
    @include medium-control;

    padding: 7px calc(11px + 12px + 12px) 7px 11px;

    &.focus-visible ~ .outline {
      height: calc(var(--medium-control-height) + 2 * var(--outline-width));
    }
  }

  .d-icon-direction {
    right: 11px;
    bottom: 16px;
  }

  &.__smooth {
    .label {
      padding-left: 12px;
    }
  }
}

.__small {
  .select {
    @include small-control;
    @include small-text;

    padding: 3px calc(9px + 12px + 12px) 3px 9px;

    &.focus-visible ~ .outline {
      height: calc(var(--small-control-height) + 2 * var(--outline-width));
    }
  }

  .d-icon-direction {
    right: 10px;
    bottom: 10px;
  }

  &.__smooth {
    .label {
      padding-left: 10px;
    }
  }
}
</style>
