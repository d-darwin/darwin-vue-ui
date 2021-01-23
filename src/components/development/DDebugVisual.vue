<template>
  <teleport to="body">
    <div v-show="isPanelShown" class="d-debug-visual">
      <DButton
        :icon-only="true"
        roundness="boxed"
        @click="toggleBordersVisualization"
      >
        <DIconBorders />
      </DButton>

      <DButton
        :icon-only="true"
        roundness="boxed"
        @click="toggleGridVisualization"
      >
        <DIconColumns />
      </DButton>

      <DButton
        :icon-only="true"
        roundness="boxed"
        @click="toggleSemanticVisualization"
      >
        <DIconSemantic />
      </DButton>
    </div>
  </teleport>
</template>

<script>
/** core **/
import { ref } from "vue";

/** compositions **/
import useKeyboardListener from "../../compositions/keyboardListener";

/** components **/
import DIconColumns from "../icons/DIconColumns";
import DIconBorders from "../icons/DIconBorders";
import DButton from "../atoms/DButton";
import DIconSemantic from "../icons/DIconSemantic";

/**
 * This development component intents to help visualize grid columns, elements' borders and semantic tags.</br>
 * It renders independent grid visualization on <i>Ctrl + Alt + g</i>.<br>
 * It highlights all DOM elements with red borders on <i>Ctrl + Alt + b</i>.<br>
 * It highlights all semantic DOM elements with green background on <i>Ctrl + Alt + s</i>.<br>
 * Also you can toggle the component buttons panel on <i>Ctrl + Alt + d</i>.
 *
 * @version 1.3.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DDebugVisual",

  components: { DIconSemantic, DIconBorders, DButton, DIconColumns },

  setup() {
    const isPanelShown = ref(true);

    const toggleGridVisualization = () => {
      const body = document.getElementsByTagName("body")[0];
      body.classList.toggle("__d-debug-grid");
    };

    const toggleBordersVisualization = () => {
      const body = document.getElementsByTagName("body")[0];
      body.classList.toggle("__d-debug-border");
    };

    const toggleSemanticVisualization = () => {
      const body = document.getElementsByTagName("body")[0];
      body.classList.toggle("__d-debug-semantic");
    };

    const togglePanel = () => {
      isPanelShown.value = !isPanelShown.value;
    };

    useKeyboardListener([
      {
        ctrlKey: true,
        altKey: true,
        key: "g",
        func: toggleGridVisualization
      },
      {
        ctrlKey: true,
        altKey: true,
        key: "b",
        func: toggleBordersVisualization
      },
      {
        ctrlKey: true,
        altKey: true,
        key: "s",
        func: toggleSemanticVisualization
      },
      {
        ctrlKey: true,
        altKey: true,
        key: "d",
        func: togglePanel
      }
    ]);

    return {
      toggleGridVisualization,
      toggleBordersVisualization,
      toggleSemanticVisualization,
      togglePanel,
      isPanelShown
    };
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/tokens/grid";

body {
  &.__d-debug-semantic {
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    h1,
    h2,
    h3,
    h4,
    h5,
    main,
    mark,
    nav,
    section,
    summary,
    time {
      // TODO: think about colors
      background: #adff2f4d !important;
    }
  }

  &.__d-debug-border {
    * {
      // TODO: think about colors
      box-shadow: inset 0 0 5px tomato !important;
    }
  }

  &.__d-debug-grid::before {
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

    width: calc(
      var(--grid-width) - var(--grid-offset) * 2 + var(--grid-gutter)
    );
    margin: 0
      calc(
        50% - var(--grid-width) / 2 + var(--grid-offset) - var(--grid-gutter) /
          2
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
      var(--grid-gutter-color)
        calc(var(--grid-column-width) + var(--grid-gutter))
    );
  }
}
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/colors";

.d-debug-visual {
  @include transition-short;

  color: var(--white);
  bottom: $gap-3x;
  left: $gap-3x;
  position: fixed;
  opacity: 0.2;
  z-index: 9999;

  &:hover {
    opacity: 1;
  }

  > * + * {
    margin-top: var(--gap-base);
  }
}
</style>
