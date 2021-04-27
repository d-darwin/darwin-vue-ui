<template>
  <div :class="$attrs.class" class="d-equal-width">
    <div class="table">
      <div ref="row" class="table-row">
        <!-- @slot Contains the component items -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * The component forces default slot elements to be equal width, equal to the biggest one.
 *
 * @version 1.0.2
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  // TODO: Add possibility to set the gap
  name: "DEqualWidth",

  inheritAttrs: false,

  data() {
    return {
      childrenCount: this.$slots.default()?.length
    };
  },

  mounted() {
    // TODO: use render function ???
    if (this.$refs.row?.children) {
      const width = 100 / this.$refs.row.children.length + "%";
      this.$refs.row.children.forEach(
        child => (child.style = `width: ${width}; ${child.style}`)
      );
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/gaps";
</style>

<style scoped lang="scss">
.d-equal-width {
  width: 100%;
}

.table {
  display: table;
  margin: auto;
}

.table-row {
  display: table-row;
  width: auto;

  > ::v-slotted(*) {
    padding: 0 var(--gap-base);
    display: table-cell;
  }

  > ::v-slotted(*:first-child) {
    padding-left: 0;
  }

  > ::v-slotted(*:last-child) {
    padding-right: 0;
  }
}
</style>
