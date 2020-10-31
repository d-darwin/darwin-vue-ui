<!--suppress CssInvalidPseudoSelector -->
<template>
  <component
    :is="tag"
    :class="[...columnCountClass, { __condensed: isCondensed }]"
    class="d-grid"
  >
    <!-- @slot contains grid items -->
    <slot />
  </component>
</template>

<script>
import cssColumnCountList from "../../assets/styles/tokens/_grid.scss";

/**
 * The container allows you an easy way to arrange child nodes in a grid template.
 *
 * @version 1.0.0
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
        // TODO: too verbose...
        xs: parseInt(cssColumnCountList.xs),
        sm: parseInt(cssColumnCountList.sm),
        md: parseInt(cssColumnCountList.md),
        lg: parseInt(cssColumnCountList.lg),
        xl: parseInt(cssColumnCountList.xl),
        xxl: parseInt(cssColumnCountList.xxl)
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

  &:not(.__condensed) {
    grid-column-gap: var(--grid-gutter);
  }
}

@include xs-device {
  .d-grid {
    grid-template-columns: repeat($xs-grid-columns-count, 1fr);

    @for $i from 1 through $xs-grid-columns-count {
      &.grid-xs-#{$i} > ::v-slotted(*) {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include sm-device {
  .d-grid {
    grid-template-columns: repeat($sm-grid-columns-count, 1fr);

    @for $i from 1 through $sm-grid-columns-count {
      &.grid-sm-#{$i} > ::v-slotted(*) {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include md-device {
  .d-grid {
    grid-template-columns: repeat($md-grid-columns-count, 1fr);

    @for $i from 1 through $md-grid-columns-count {
      &.grid-md-#{$i} > ::v-slotted(*) {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include lg-device {
  .d-grid {
    grid-template-columns: repeat($lg-grid-columns-count, 1fr);

    @for $i from 1 through $lg-grid-columns-count {
      &.grid-lg-#{$i} > ::v-slotted(*) {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include xl-device {
  .d-grid {
    grid-template-columns: repeat($xl-grid-columns-count, 1fr);

    @for $i from 1 through $xl-grid-columns-count {
      &.grid-xl-#{$i} > ::v-slotted(*) {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include xxl-device {
  .d-grid {
    grid-template-columns: repeat($xxl-grid-columns-count, 1fr);

    @for $i from 1 through $xxl-grid-columns-count {
      &.grid-xxl-#{$i} > ::v-slotted(*) {
        grid-column-end: span #{$i};
      }
    }
  }
}
</style>
