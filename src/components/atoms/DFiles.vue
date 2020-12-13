<template>
  <div class="d-files">
    <label :for="inputId" class="label">
      <DLink type="secondary" href="#" @click.prevent="$refs.input.click()">
        <DIconPaperclip v-if="!$slots['icon-attach']" />
        <!-- @slot You can replace default attach icon by passing your own here. -->
        <slot v-else name="icon-attach" />

        <DTypography v-if="label" :content="label" />
      </DLink>
    </label>

    <DControlError :text="error" />

    <transition-group tag="ul" name="list" class="list">
      <li
        v-for="(file, index) in uploadedFiles"
        :key="file.name"
        class="list-item"
      >
        <DTypography :content="file.name" tag="span" />

        <DLink type="secondary" href="#" @click.prevent="removeFromList(index)">
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
/** utils **/
import uuid from "../../utils/uuid";

/** components **/
import DIconPaperclip from "../icons/DIconPaperclip";
import DIconCloseCircle from "../icons/DIconCloseCircle";
import DTypography from "../containers/DTypography";
import DLink from "../atoms/DLink";
import DControlError from "../atoms/DControlError";

/**
 * This is a reusable file input component.
 * Prevents duplicates uploading and allows file deletion one by one.
 * Feel free to use any attrs you expect with file <b>input</b> tag,
 * they will be pass to the tag automatically.<br>
 * While submitted uploadedFiles array need to be processed with FormData().
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */

export default {
  name: "DFiles",

  inheritAttrs: false,

  components: {
    DControlError,
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
     * If not empty renders as an error string below the <b>input</b> tag.
     */
    error: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      // TODO: move al inputId logic to mixin or composition API ???
      inputId: this.id || uuid(),
      uploadedFiles: []
    };
  },

  watch: {
    uploadedFiles() {
      /**
       * File list was changed. Payload contains files array to be uploaded and component uid.
       *
       * @event changed
       * @type {Array, Number}
       */
      this.$emit("changed", this.uploadedFiles, this.id);
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
      // TODO: emit change event with files list
    },

    removeFromList(index) {
      // both arrays have the same index
      this.uploadedFiles.splice(index, 1);
      // TODO: emit change event with files list
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
@import "../../assets/styles/vue-transition-list";

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
