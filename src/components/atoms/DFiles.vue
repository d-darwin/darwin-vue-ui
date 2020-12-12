<template>
  <div class="d-files">
    <!--Form is used just to reset input-->
    <form ref="form" class="control-form">
      <input
        :id="inputId + '_file_input'"
        :multiple="multiple"
        type="file"
        class="file-input-fake"
        @change="addToList($event)"
      />
    </form>

    <label :for="inputId + '_file_input'">
      <span class="attach-file-wrap">
        <DIconPaperclip v-if="!$slots['icon-attach']" />
        <!-- @slot You can replace default attach icon by passing your own here. -->
        <slot v-else name="icon-attach" />

        <span class="attach-file-text" v-text="attachText" />
      </span>
    </label>

    <ul class="files-list">
      <li
        v-for="(file, index) in uploadedFiles"
        :key="file.name"
        class="file-item"
      >
        <DIconFile v-if="!$slots['icon-file']" />
        <!-- @slot You can replace default file icon by passing your own here. -->
        <slot v-else name="icon-file" />

        <div>
          <!--TODO: use DTypography-->
          <span class="file-item-name" v-text="file.name" />

          <span
            class="file-item-remove small-text"
            @click="removeFromList(index)"
            v-text="removeText"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
/** utils **/
import uuid from "../../utils/uuid";

/** components **/
import DIconPaperclip from "../icons/DIconPaperclip";
import DIconFile from "../icons/DIconFile";

/**
 * This is a reusable file input component.
 * Prevents duplicates uploading and allows file deletion one by one.
 * While submitted uploadedFiles array need to be processed with FormData().
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */

export default {
  name: "DFiles",

  inheritAttrs: false,

  components: { DIconPaperclip, DIconFile },

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
     * TODO: use attrs
     * If multiple file selection allows
     */
    multiple: {
      type: Boolean,
      default: true
    },

    /**
     * Text for add files area
     */
    attachText: {
      type: String,
      default: "Attach file(s)"
    },

    /**
     * Text for remove file link
     */
    removeText: {
      type: String,
      default: "Remove file"
    }
  },

  data() {
    return {
      // TODO: move al inputId logic to mixin or composition API ???
      inputId: this.id || uuid(),
      uploadedFiles: [],
      filenames: [] // just for quick check for duplicates
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
        if (!this.filenames.includes(newFile.name)) {
          // the old one file with the same name stays at uploadedFiles
          this.uploadedFiles.push(event.target.files[i]);
          this.filenames.push(newFile.name);
        }
      }
      // Input is used only to collect uploadedFiles array
      // This array is needed to be processed via FormData() while uploading
      this.$refs.form.reset();
    },

    removeFromList(index) {
      // both arrays have the same index
      this.uploadedFiles.splice(index, 1);
      this.filenames.splice(index, 1);
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

.control-form,
.file-input-fake {
  visibility: hidden;
  height: 0;
  width: 0;
}

.attach-file-wrap {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.attach-file-text {
  // TODO: use gaps
  margin-left: 8px;
}

.files-list {
  // TODO: use gaps
  margin-top: 8px;
}

.file-item {
  display: flex;
  align-items: flex-start;
}

.file-item + .file-item {
  // TODO: use gaps
  margin-top: 8px;
}

.file-item-name {
  // TODO: use gaps
  margin-left: 8px;
}

.file-item-remove {
  @include link-primary;

  cursor: pointer;
  // TODO: use gaps
  padding-top: 4px;
  margin-left: 16px;
}
</style>
