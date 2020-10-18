<script>
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
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/grid-debug";
</style>
