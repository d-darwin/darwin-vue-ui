<template>
  <div :class="{ __vertical: isVertical }" class="d-tabs">
    <!--TODO: styles-->
    <!--TODO:  aria-label="Sample Tabs"-->
    <div role="tablist" class="tab-list">
      <!--TODO: styles-->
      <button
        v-for="(tab, index) in itemList"
        :key="tab.label"
        :id="`tab-${index}`"
        :aria-selected="index === activeTabIndex"
        :aria-controls="`panel-${index}`"
        :disabled="tab.disabled"
        :class="{
          __active: index === activeTabIndex,
          __disabled: tab.disabled
        }"
        :tabindex="index === activeTabIndex ? -1 : 0"
        role="tab"
        class="tab"
        @click="changeTabHandler(index)"
      >
        <DTypography :content="tab.label" />
        <!--TODO: optional slot usage-->
      </button>
    </div>

    <!--TODO: styles-->
    <!--TODO: animation-->
    <transition-group name="opacity">
      <div
        v-show="index === activeTabIndex"
        v-for="(tab, index) in itemList"
        :key="tab.label"
        :id="`panel-${index}`"
        :aria-labelledby="`tab-${index}`"
        :hidden="index !== activeTabIndex"
        role="tabpanel"
        class="tab-panel"
      >
        <DTypography :content="tab.content" />
        <!--TODO: optional slot usage-->
      </div>
    </transition-group>
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
    },

    isVertical: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      activeTabIndex:
        (this.itemList &&
          this.itemList.length &&
          this.itemList.findIndex(item => item.active && !item.disabled)) ||
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
@import "../../assets/styles/tokens/outline";
</style>

<style scoped lang="scss">
// @import '../../assets/styles/';
@import "../../assets/styles/mixins/transitions";
@import "../../assets/styles/mixins/outline";
@import "../../assets/styles/transitions/opacity";

.tab-list {
  display: flex;
}

.__vertical {
  .tab-list {
    flex-direction: column;
  }

  .tab {
    &.__active {
      order: 1;
    }
  }
}

.tab {
  @include transition-short;

  border: none;
  background: none;
  padding: var(--gap-3x) var(--gap-6x);
  min-height: var(--large-control-height);
  height: fit-content;
  position: relative;
  cursor: pointer;

  &:not(.__disabled):hover,
  &.__active {
    background: var(--color-background);
  }

  &.__active {
    cursor: default;

    &:after {
      // for bottom line animation
      transform-origin: left;
      transform: scaleX(1);
    }
  }

  &:after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--color-primary);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform var(--transition-time-short) ease-out;
  }

  &.__disabled {
    cursor: not-allowed;
  }

  outline: none;

  &.focus-visible {
    &:before {
      @include outline;
    }
  }
}

.tab-panel {
  padding: var(--gap-3x) var(--gap-6x);
}
</style>
