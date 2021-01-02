<template>
  <div
    :class="{
      [`${$attrs.class}`]: $attrs.class,
      __disabled: $attrs.disabled !== undefined
    }"
    class="d-files"
  >
    <DLink
      :href="$attrs.disabled !== undefined ? null : '#'"
      type="secondary"
      @click.prevent="$refs.input.click()"
    >
      <label :for="inputId" :style="labelStyle" class="label">
        <DIconPaperclip v-if="!$slots['icon-attach']" />
        <!-- @slot You can replace default attach icon by passing your own here. -->
        <slot v-else name="icon-attach" />

        <DTypography v-if="label" :content="label" />
      </label>
    </DLink>

    <DError :text="error" />

    <transition-group
      :style="listStyle"
      tag="ul"
      name="list"
      class="list"
      mode="out-in"
    >
      <li
        v-for="(file, index) in uploadedFiles"
        :key="file.name"
        :style="{
          transitionDelay: itemDelay(index),
          ...listItemStyle
        }"
        class="list-item"
      >
        <DTypography :content="file.name" tag="span" />

        <DLink
          :href="$attrs.disabled !== undefined ? null : '#'"
          type="secondary"
          @click.prevent="removeFromList(index)"
        >
          <DIconCloseCircle v-if="!$slots['icon-remove']" />
          <!-- @slot You can replace default remove icon by passing your own here. -->
          <slot v-else name="icon-remove" />
        </DLink>
      </li>
    </transition-group>

    <!--Form is used just to reset input-->
    <form ref="form" class="control-form">
      <input
        :id="inputId"
        ref="input"
        v-bind="{
          ...$attrs,
          onChange: addToList
        }"
        type="file"
        class="file-input-fake"
      />
    </form>
  </div>
</template>

<script>
/** use **/
import useInputId from "../../use/inputId";

/** design tokens **/
import transitionsTokens from "../../assets/styles/tokens/_transitions.scss";

/** components **/
import DIconPaperclip from "../icons/DIconPaperclip";
import DIconCloseCircle from "../icons/DIconCloseCircle";
import DTypography from "../containers/DTypography";
import DLink from "../atoms/DLink";
import DError from "./DError";

/**
 * This is a reusable file input component.
 * Prevents duplicates uploading and allows file deletion one by one.
 * Feel free to use any attrs you expect with file <b>input</b> tag,
 * they will be pass to the tag automatically.<br>
 * While submitted uploadedFiles array need to be processed with FormData().
 *
 * @version 1.0.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */

export default {
  name: "DFiles",

  inheritAttrs: false,

  components: {
    DError,
    DLink,
    DTypography,
    DIconPaperclip,
    DIconCloseCircle
  },

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
     * Defines content of the <b>label</b> tag.
     */
    label: {
      type: String,
      default: ""
    },

    /**
     * Pass any style object to <i>.label</i> if needed.
     */
    labelStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.list</i> if needed.
     */
    listStyle: {
      type: Object,
      default: () => {}
    },

    /**
     * Pass any style object to <i>.list-item</i> if needed.
     */
    listItemStyle: {
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
    return { ...useInputId(props) };
  },

  data() {
    return {
      uploadedFiles: []
    };
  },

  watch: {
    uploadedFiles() {
      /**
       * File list was changed. Payload contains files array to be uploaded and component id.
       *
       * @event changed
       * @type {Array, String}
       */
      this.$emit("changed", this.uploadedFiles, this.inputId);
    }
  },

  methods: {
    addToList(event) {
      for (let i = 0; i < event.target.files.length; i++) {
        const newFile = event.target.files[i];
        if (!this.uploadedFiles.find(f => f.name === newFile.name)) {
          // the old one file with the same name stays at uploadedFiles
          this.uploadedFiles.push(event.target.files[i]);
        }
      }
      // Input is used only to collect uploadedFiles array
      // This array is needed to be processed via FormData() while uploading
      this.$refs.form.reset();
    },

    removeFromList(index) {
      if (!this.disabled) {
        this.uploadedFiles.splice(index, 1);
      }
    },

    itemDelay(index) {
      const delay = parseInt(transitionsTokens["transition-delay-short"]);
      return index * delay + "ms";
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/links";
@import "../../assets/styles/transitions/list";

.d-files {
  &.__disabled {
    .d-link {
      cursor: not-allowed;
      color: var(--color-primary-disabled);
    }
  }
}

.control-form,
.file-input-fake {
  visibility: hidden;
  height: 0;
  width: 0;
}

.d-icon-close-circle {
  min-width: 1em;
  min-height: 1em;
  width: 1em;
  height: 1em;
}

.label {
  display: flex;
  align-items: center;
  cursor: pointer;

  .d-typography {
    margin-left: var(--gap-2x);
  }
}

.list {
  margin-top: var(--gap-2x);
}

.list-item {
  position: relative;
  overflow-wrap: break-word;

  & + & {
    margin-top: var(--gap-base);
  }

  .d-link {
    margin-left: var(--gap-2x);
    position: absolute;
    bottom: 4px;
  }
}
</style>
