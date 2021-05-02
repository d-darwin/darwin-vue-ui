<template>
  <div class="d-loader">
    <svg
      class="loader"
      xmlns="http://www.w3.org/2000/svg"
      width="64px"
      height="64px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g
        transform="translate(0 -12)"
        style="animation-play-state: running; animation-delay: 0s;"
      >
        <circle
          cx="50"
          cy="35.6"
          r="10"
          style="animation-play-state: running; animation-delay: 0s;"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
            style="animation-play-state: running; animation-delay: 0s;"
          />
          <animate
            attributeName="r"
            dur="1s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            values="0;24;0"
            keySplines="0.2 0 0.8 1;0.2 0 0.8 1"
            style="animation-play-state: running; animation-delay: 0s;"
          />
        </circle>
        <circle
          cx="50"
          cy="35.6"
          r="10"
          style="animation-play-state: running; animation-delay: 0s;"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="180 50 50;540 50 50"
            style="animation-play-state: running; animation-delay: 0s;"
          />
          <animate
            attributeName="r"
            dur="1s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            values="24;0;24"
            keySplines="0.2 0 0.8 1;0.2 0 0.8 1"
            style="animation-play-state: running; animation-delay: 0s;"
          />
        </circle>
      </g>
    </svg>
  </div>
</template>

<script>
/**
 * The component contains animated svg and used with other components.
 *
 * @version 1.0.1
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DLoader"
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
</style>

<style scoped lang="scss">
.d-loader {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  svg {
    min-height: 64px;
    min-width: 64px;
    margin: auto;
    display: block;
    shape-rendering: auto;
    animation-play-state: running;
    animation-delay: 0s;
    background-position: initial initial;
    background-repeat: initial initial;
    z-index: -1;
  }

  circle:nth-child(1) {
    fill: var(--color-primary);
  }

  circle:nth-child(2) {
    fill: var(--color-accent);
  }
}
</style>
