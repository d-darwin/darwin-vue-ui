<!--suppress CssInvalidPseudoSelector -->
<template>
  <component
    :is="tag"
    :class="[...columnCountClass, { __condensed: isCondensed }]"
    class="d-grid"
  >
    <!-- @slot Contains grid items -->
    <slot />
  </component>
</template>

<script>
/** design tokens **/
import gridTokens from "../../assets/styles/tokens/_grid.scss";

/**
 * The container provides you with an easy way to arrange child nodes in a grid template.
 *
 * @version 1.0.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DGrid",

  props: {
    /**
     * Contains number of columns which should take every child node for specific device width.<br>
     * Expected format: { xs: 2, sm: 3, ..., xxl: 4 }.<br>
     * If no column count presented for any device width, nodes will take all width of the container.
     */
    columnCount: {
      // TODO: specify more specific type
      type: Object,
      default: () => {}
    },

    /**
     * Tag of the component.
     */
    tag: {
      type: String,
      default: "div"
    },

    /**
     * Condensed grid hasn't gaps between columns.
     */
    isCondensed: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      defaultColumnCountList: {
        // TODO: too verbose and not so flexible
        xs: parseInt(gridTokens["xs-grid-columns-count"]),
        sm: parseInt(gridTokens["sm-grid-columns-count"]),
        md: parseInt(gridTokens["md-grid-columns-count"]),
        lg: parseInt(gridTokens["lg-grid-columns-count"]),
        xl: parseInt(gridTokens["xl-grid-columns-count"]),
        xxl: parseInt(gridTokens["xxl-grid-columns-count"])
      },
      throttledFunction: null
    };
  },

  computed: {
    columnCountClass() {
      return Object.keys(this.defaultColumnCountList).map(
        deviceWidth =>
          `grid-${deviceWidth}-${(this.columnCount &&
            this.columnCount[deviceWidth]) ||
            this.defaultColumnCountList[deviceWidth]}`
      );
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/grid";
</style>

<style scoped lang="scss">
@import "../../assets/styles/tokens/grid";
@import "../../assets/styles/mixins/breakpoints";

.d-grid {
  display: grid;
  min-width: 320px;
  margin: 0 auto;
  // TODO: do we really need it right here or may be it's a root style?
  box-sizing: border-box;

  padding-left: var(--grid-offset);
  padding-right: var(--grid-offset);
  width: var(--grid-width);

  grid-template-columns: repeat(var(--grid-columns-count), 1fr);

  &:not(.__condensed) {
    grid-column-gap: var(--grid-gutter);
  }
}

@include xs-device {
  .d-grid {
    @for $i from 1 through $xs-grid-columns-count {
      &.grid-xs-#{$i} > *,
      &.grid-xs-#{$i} > ::v-slotted(*) {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include sm-device {
  .d-grid {
    @for $i from 1 through $sm-grid-columns-count {
      &.grid-sm-#{$i} > *,
      &.grid-sm-#{$i} > ::v-slotted(*) {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include md-device {
  .d-grid {
    @for $i from 1 through $md-grid-columns-count {
      &.grid-md-#{$i} > *,
      &.grid-md-#{$i} > ::v-slotted(*) {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include lg-device {
  .d-grid {
    @for $i from 1 through $lg-grid-columns-count {
      &.grid-lg-#{$i} > *,
      &.grid-lg-#{$i} > ::v-slotted(*) {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include xl-device {
  .d-grid {
    @for $i from 1 through $xl-grid-columns-count {
      &.grid-xl-#{$i} > *,
      &.grid-xl-#{$i} > ::v-slotted(*) {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include xxl-device {
  .d-grid {
    @for $i from 1 through $xxl-grid-columns-count {
      &.grid-xxl-#{$i} > *,
      &.grid-xxl-#{$i} > ::v-slotted(*) {
        grid-column-end: span #{$i};
      }
    }
  }
}
</style>
