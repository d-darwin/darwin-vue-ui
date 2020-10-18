<script>
import { h } from "vue";

/**
 * This development component intents to help while positioning elements inside <b>DGrid</b> component.</br>
 * It renders independent grid visualization on <i>Ctrl + Alt + D</i>.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DGridDebug",

  data() {
    return {
      keydownEventListener: null
    };
  },

  mounted() {
    // hold pointer to the event listener to release it while unmount
    this.keydownEventListener = window.addEventListener("keydown", e => {
      if (e.ctrlKey && e.altKey && e.key === "d") {
        const body = document.getElementsByTagName("body")[0];
        body.classList.toggle("__debug");
      }
    });
  },

  unmounted() {
    // remove all added event listeners to avoid memory leaks
    window.removeEventListener("keydown", this.keydownEventListener);
  },

  render() {
    return h();
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/tokens/breakpoints";

body.__debug::before {
  position: fixed;
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  pointer-events: none;
  z-index: 9999;

  --grid-columns-count: 2;
  --grid-offset: 18px;
  --grid-gutter: 18px;

  --grid-width: calc(100% - var(--grid-offset) * 2);
  --grid-column-color: rgba(0, 0, 0, 0.05);
  --grid-gutter-color: transparent;
  --grid-column-width: calc(
    (100% - var(--grid-gutter) * var(--grid-columns-count)) /
    var(--grid-columns-count)
  );

  width: calc(var(--grid-width) + var(--grid-offset) * 2);

  border: solid transparent;
  border-width: 0 calc(var(--grid-offset) - var(--grid-gutter) / 2);

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

@media (min-width: $sm-breakpoint) {
  body.__debug::before {
    --grid-columns-count: 6;
  }
}

@media (min-width: $md-breakpoint) {
  body.__debug::before {
    --grid-columns-count: 12;
    --grid-offset: 24px;
    --grid-gutter: 24px;
  }
}

@media (min-width: $lg-breakpoint) {
  body.__debug::before {
    --grid-width: 960px;
  }
}

@media (min-width: $xl-breakpoint) {
  body.__debug::before {
    --grid-width: 1140px;
  }
}

@media (min-width: $xxl-breakpoint) {
  body.__debug::before {
    --grid-width: 1320px;
  }
}
</style>
