<template>
  <DButton
    :icon-only="true"
    roundness="boxed"
    class="d-grid-debug"
    @click="toggleGridVisualization"
  >
    <DIconColumns />
  </DButton>
</template>

<script>
import DIconColumns from "../icons/DIconColumns";
import DButton from "../atoms/DButton";

/**
 * This development component intents to help while positioning elements inside <b>DGrid</b> component.</br>
 * It renders independent grid visualization on <i>Ctrl + Alt + D</i>.
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DGridDebug",
  components: { DButton, DIconColumns },
  data() {
    return {
      keydownEventListener: null
    };
  },

  mounted() {
    // hold pointer to the event listener to release it while unmount
    this.keydownEventListener = e => {
      if (e.ctrlKey && e.altKey && e.key === "d") {
        this.toggleGridVisualization();
      }
    };
    window.addEventListener("keydown", this.keydownEventListener);
  },

  unmounted() {
    // remove all added event listeners to avoid memory leaks
    window.removeEventListener("keydown", this.keydownEventListener);
  },

  methods: {
    toggleGridVisualization() {
      const body = document.getElementsByTagName("body")[0];
      body.classList.toggle("__debug");
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/tokens/grid";

body.__debug::before {
  position: fixed;
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;

  --grid-column-color: rgba(0, 0, 0, 0.05);
  --grid-gutter-color: transparent;
  --grid-column-width: calc(
    (100% - var(--grid-gutter) * var(--grid-columns-count)) /
      var(--grid-columns-count)
  );

  width: calc(var(--grid-width) - var(--grid-offset) * 2 + var(--grid-gutter));
  margin: 0
    calc(
      50% - var(--grid-width) / 2 + var(--grid-offset) - var(--grid-gutter) / 2
    );

  background-repeat: no-repeat;
  //noinspection CssInvalidFunction
  background-image: repeating-linear-gradient(
    to right,
    var(--grid-gutter-color) 0,
    var(--grid-gutter-color) calc(var(--grid-gutter) / 2),
    var(--grid-column-color) calc(var(--grid-gutter) / 2),
    var(--grid-column-color)
      calc(var(--grid-column-width) + var(--grid-gutter) / 2),
    var(--grid-gutter-color)
      calc(var(--grid-column-width) + var(--grid-gutter) / 2),
    var(--grid-gutter-color) calc(var(--grid-column-width) + var(--grid-gutter))
  );
}
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/colors";

.d-grid-debug {
  @include transition-short;

  color: var(--white);
  bottom: $gap-3x;
  left: $gap-4x;
  position: fixed;
  opacity: 0.3;
  z-index: 9999;
}

.d-grid-debug:hover {
  opacity: 1;
}

.d-icon-columns {
  min-height: 24px;
  min-width: 24px;
}
</style>
