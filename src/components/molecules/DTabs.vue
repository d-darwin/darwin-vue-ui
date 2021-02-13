<template>
  <div class="d-tabs">
    <!--TODO: styles-->
    <ul class="tab-list">
      <!--TODO: disabled-->
      <!--TODO: styles-->
      <li
        v-for="(tab, tabIndex) in itemList"
        :key="tab.label"
        :class="{ __active: tabIndex === activeTabIndex }"
        role="tab"
        class="tab-item"
        @click="changeTabHandler(tabIndex)"
      >
        <DTypography :content="tab.label" />
        <!--TODO: optional slot usage-->
      </li>
    </ul>

    <!--TODO: styles-->
    <ul class="tab-panel-list">
      <!--TODO: styles-->
      <!--TODO: animation-->
      <li
        v-show="tabIndex === activeTabIndex"
        v-for="(tab, tabIndex) in itemList"
        :key="tab.label"
        class="tab-panel-item"
      >
        <DTypography :content="tab.content" />
        <!--TODO: optional slot usage-->
      </li>
    </ul>
  </div>
</template>

<script>
/** components **/
import DTypography from "../containers/DTypography";

/**
 * TODO
 *
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: "DTabs",

  components: { DTypography },

  props: {
    // TODO
    itemList: {
      // TODO: specify more accurate type ???
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      activeTabIndex:
        (this.itemList &&
          this.itemList.length &&
          this.itemList.findIndex(item => item.active)) ||
        0
    };
  },

  methods: {
    changeTabHandler(tabIndex) {
      this.activeTabIndex = tabIndex;
    }
  }
};
</script>

<style lang="scss">
// always include tokens unscoped
@import "../../assets/styles/tokens/colors";
@import "../../assets/styles/tokens/gaps";
</style>

<style scoped lang="scss">
// @import '../../assets/styles/';
@import "../../assets/styles/mixins/transitions";
.tab-list {
  display: flex;
}

.tab-item {
  @include transition-short;

  padding: var(--gap-base) var(--gap-3x); // to be as high as other controls
  cursor: pointer;

  &:hover,
  &.__active {
    background: var(--color-background);
  }

  &.__active {
    cursor: default;
  }
}
</style>
