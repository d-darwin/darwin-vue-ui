<template>
  <svg
    :class="{ [`__${type}`]: type }"
    class="d-icon-direction"
    width="11"
    height="6"
    viewBox="0 0 11 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 4L2.20711 0.207107C2.0745 0.0744985 1.89464 0 1.70711 0C1.07714 0 0.761655 0.761655 1.20711 1.20711L6 6L10.7929 1.20711C11.2383 0.761654 10.9229 0 10.2929 0C10.1054 0 9.9255 0.0744984 9.79289 0.207107L6 4Z"
    />
  </svg>
</template>

<script>
/**
 * Contains svg-code.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DIconDirection",

  props: {
    /**
     * Defines component orientation.<br>
     * Takes values: 'up', 'right', 'down', 'left'.
     */
    type: {
      type: String,
      default: "down",
      validator: val => ["up", "right", "down", "left"].includes(val)
    }
  }
};
</script>

<style scoped lang="scss">
.d-icon-direction {
  path {
    fill: currentColor;
  }

  &.__up {
    transform: rotate(180deg);
  }

  &.__right {
    transform: rotate(-90deg);
  }

  &.__down {
    // transform: rotate(0);
  }

  &.__left {
    transform: rotate(90deg);
  }
}
</style>
