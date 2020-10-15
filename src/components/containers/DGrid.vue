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
/**
 * Container for child elements arrangement.
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DGrid",

  props: {
    columnCount: {
      type: Object,
      default: () => ({
        xs: 2,
        sm: 6,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 12
      })
    },

    tag: {
      type: String,
      default: "div"
    },

    isCondensed: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    columnCountClass() {
      if (Object.keys(this.columnCount).length) {
        return Object.keys(this.columnCount).map(
          deviceWidth => `grid-${deviceWidth}-${this.columnCount[deviceWidth]}`
        );
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss">
/* NOTE: need to be unscoped to be able to overwrite grid-... attr in other components */
@import "../../assets/styles/breakpoint-mixins";
@import "../../assets/styles/grid-tokens";

.d-grid {
  display: grid;
  min-width: 320px;
  margin: 0 auto;
}

@include xs-device {
  .d-grid {
    padding-left: $xs-grid-offset;
    padding-right: $xs-grid-offset;
    width: $xs-grid-width;

    grid-template-columns: repeat($xs-grid-columns-count, 1fr);

    &:not(.__condensed) {
      grid-column-gap: $xs-grid-gutter;
    }

    /*> * {
      // each grid item takes full-width by default
      grid-column-end: span $xs-grid-columns-count;
    }*/

    @for $i from 1 through $xs-grid-columns-count {
      // specific size columns
      &.grid-xs-#{$i} > * {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include sm-device {
  .d-grid {
    padding-left: $sm-grid-offset;
    padding-right: $sm-grid-offset;
    width: $sm-grid-width;

    grid-template-columns: repeat($sm-grid-columns-count, 1fr);

    &:not(.__condensed) {
      grid-column-gap: $sm-grid-gutter;
    }

    /*> * {
      grid-column-end: span $sm-grid-columns-count;
    }*/

    @for $i from 1 through $sm-grid-columns-count {
      &.grid-sm-#{$i} > * {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include md-device {
  .d-grid {
    padding-left: $md-grid-offset;
    padding-right: $md-grid-offset;
    width: $md-grid-width;

    grid-template-columns: repeat($md-grid-columns-count, 1fr);

    &:not(.__condensed) {
      grid-column-gap: $md-grid-gutter;
    }

    /* > * {
      grid-column-end: span $md-grid-columns-count;
    } */

    @for $i from 1 through $md-grid-columns-count {
      &.grid-md-#{$i} > * {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include lg-device {
  .d-grid {
    padding-left: $lg-grid-offset;
    padding-right: $lg-grid-offset;
    width: $lg-grid-width;

    grid-template-columns: repeat($lg-grid-columns-count, 1fr);

    &:not(.__condensed) {
      grid-column-gap: $lg-grid-gutter;
    }

    /* > * {
      grid-column-end: span $lg-grid-columns-count;
    } */

    @for $i from 1 through $lg-grid-columns-count {
      &.grid-lg-#{$i} > * {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include xl-device {
  .d-grid {
    padding-left: $xl-grid-offset;
    padding-right: $xl-grid-offset;
    width: $xl-grid-width;

    grid-template-columns: repeat($xl-grid-columns-count, 1fr);

    &:not(.__condensed) {
      grid-column-gap: $xl-grid-gutter;
    }

    /* > * {
      grid-column-end: span $xl-grid-columns-count;
    } */

    @for $i from 1 through $xl-grid-columns-count {
      &.grid-xl-#{$i} > * {
        grid-column-end: span #{$i};
      }
    }
  }
}

@include xxl-device {
  .d-grid {
    padding-left: $xxl-grid-offset;
    padding-right: $xxl-grid-offset;
    width: $xxl-grid-width;

    grid-template-columns: repeat($xxl-grid-columns-count, 1fr);

    &:not(.__condensed) {
      grid-column-gap: $xxl-grid-gutter;
    }

    /* > * {
      grid-column-end: span $xxl-grid-columns-count;
    } */

    @for $i from 1 through $xxl-grid-columns-count {
      &.grid-xxl-#{$i} > * {
        grid-column-end: span #{$i};
      }
    }
  }
}
</style>
