<template>
  <teleport to="body">
    <transition :name="transitionName">
      <div v-show="isPanelShown" class="d-debug-visual">
        <DButton
          :icon-only="true"
          :type="isBordersVisualizationShown ? 'alternative' : 'primary'"
          roundness="boxed"
          @click="toggleBordersVisualization"
        >
          <DIconBorders />
        </DButton>

        <DButton
          :icon-only="true"
          :type="isGridVisualizationShown ? 'alternative' : 'primary'"
          roundness="boxed"
          @click="toggleGridVisualization"
        >
          <DIconColumns />
        </DButton>

        <DButton
          :icon-only="true"
          :type="isSemanticVisualizationShown ? 'alternative' : 'primary'"
          roundness="boxed"
          @click="toggleSemanticVisualization"
        >
          <DIconSemantic />
        </DButton>
      </div>
    </transition>
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
import DIconSemantic from "../icons/DIconSemantic";
import DButton from "../atoms/DButton";

/**
 * This development component intents to help visualize grid columns, elements' borders and semantic tags.<br>
 * It renders independent grid visualization on <i>Ctrl + Alt + g</i>.<br>
 * It highlights all DOM elements with red borders on <i>Ctrl + Alt + b</i>.<br>
 * It highlights all semantic DOM elements with green background on <i>Ctrl + Alt + s</i>.<br>
 * Also you can toggle the component buttons panel visibility on <i>Ctrl + Alt + d</i>.
 *
 * @version 1.3.5
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DDebugVisual",

  components: { DIconSemantic, DIconBorders, DIconColumns, DButton },

  props: {
    /**
     * Name of the component transition (animation).
     */
    transitionName: {
      type: String,
      default: "scale"
    }
  },

  setup() {
    const isGridVisualizationShown = ref(false);
    const isBordersVisualizationShown = ref(false);
    const isSemanticVisualizationShown = ref(false);

    const isPanelShown = ref(true);

    // just a helper to DRY
    const toggleVisualization = (className, flag) => {
      const body = document && document.body;
      body.classList.toggle(className);

      flag.value = !flag.value;
    };

    const toggleGridVisualization = () =>
      toggleVisualization("__d-debug-grid", isGridVisualizationShown);

    const toggleBordersVisualization = () =>
      toggleVisualization("__d-debug-border", isBordersVisualizationShown);

    const toggleSemanticVisualization = () =>
      toggleVisualization("__d-debug-semantic", isSemanticVisualizationShown);

    const togglePanel = () => (isPanelShown.value = !isPanelShown.value);

    useKeyboardListener([
      {
        ctrlKey: true,
        metaKey: true, // for iOS
        altKey: true,
        code: "KeyG",
        key: "g", // [g]rid
        func: toggleGridVisualization
      },
      {
        ctrlKey: true,
        metaKey: true, // for iOS
        altKey: true,
        code: "KeyB",
        key: "b", // [b]orders
        func: toggleBordersVisualization
      },
      {
        ctrlKey: true,
        metaKey: true, // for iOS
        altKey: true,
        code: "KeyS",
        key: "s", // [s]emantic
        func: toggleSemanticVisualization
      },
      {
        ctrlKey: true,
        metaKey: true, // for iOS
        altKey: true,
        code: "KeyD",
        key: "d", // [d]ebug
        func: togglePanel
      }
    ]);

    return {
      isGridVisualizationShown,
      isBordersVisualizationShown,
      isSemanticVisualizationShown,
      isPanelShown,
      toggleGridVisualization,
      toggleBordersVisualization,
      toggleSemanticVisualization,
      togglePanel
    };
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/tokens/grid";
@import "../../assets/styles/tokens/gaps";
@import "../../assets/styles/tokens/colors";

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
    // TODO: avoid using <any> selector
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

    // TODO: think about colors
    --grid-column-color: rgba(0, 0, 0, 0.05);
    --grid-gap-color: transparent;
    --grid-column-width: calc(
      (100% - var(--grid-column-gap) * var(--grid-columns-count)) /
        var(--grid-columns-count)
    );

    width: calc(
      var(--grid-width) - var(--grid-offset) * 2 + var(--grid-column-gap)
    );

    margin: 0
      calc(
        50% - var(--grid-width) / 2 + var(--grid-offset) -
          var(--grid-column-gap) / 2
      );

    background-repeat: no-repeat;
    //noinspection CssInvalidFunction
    background-image: repeating-linear-gradient(
      to right,
      var(--grid-gap-color) 0,
      var(--grid-gap-color) calc(var(--grid-column-gap) / 2),
      var(--grid-column-color) calc(var(--grid-column-gap) / 2),
      var(--grid-column-color)
        calc(var(--grid-column-width) + var(--grid-column-gap) / 2),
      var(--grid-gap-color)
        calc(var(--grid-column-width) + var(--grid-column-gap) / 2),
      var(--grid-gap-color)
        calc(var(--grid-column-width) + var(--grid-column-gap))
    );
  }
}
</style>

<style scoped lang="scss">
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/transitions/scale";

.d-debug-visual {
  @include transition-short;

  color: var(--white);
  bottom: var(--gap-3x);
  left: var(--gap-3x);
  position: fixed;
  opacity: 0.2;
  z-index: 9999;

  &:hover {
    opacity: 1;
  }

  // TODO: avoid using <any> selector
  > * + * {
    margin-top: var(--gap-base);
  }
}
</style>
