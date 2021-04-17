import { DGrid } from "@";
import "../assets/styles/containers/d-grid.scss";

export default {
  title: "Containers/Grid",
  component: DGrid,
  argTypes: {
    columnCount: {},
    tag: { control: { type: "text" }, defaultValue: "div" },
    isCondensed: { control: { type: "boolean" }, defaultValue: false }
  }
};

const Template = args => ({
  components: { DGrid },
  setup() {
    return { args };
  },
  template: `
    <DGrid v-bind="args">
      <div class="grid-item" v-text="'item-01'" />
      <div class="grid-item" v-text="'item-02'" />
      <div class="grid-item" v-text="'item-03'" />
      <div class="grid-item" v-text="'item-04'" />
      <div class="grid-item" v-text="'item-05'" />
      <div class="grid-item" v-text="'item-06'" />
      <div class="grid-item" v-text="'item-07'" />
      <div class="grid-item" v-text="'item-08'" />
      <div class="grid-item" v-text="'item-09'" />
      <div class="grid-item" v-text="'item-10'" />
      <div class="grid-item" v-text="'item-11'" />
      <div class="grid-item" v-text="'item-12'" />
    </DGrid>`
});

export const Default = Template.bind({});

export const SixColumns = Template.bind({});
SixColumns.args = {
  columnCount: {
    md: 6,
    lg: 6,
    xl: 6,
    xxl: 6
  }
};

export const FourColumns = Template.bind({});
FourColumns.args = {
  columnCount: {
    md: 4,
    lg: 4,
    xl: 4,
    xxl: 4
  }
};

export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
  columnCount: {
    md: 3,
    lg: 3,
    xl: 3,
    xxl: 3
  }
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  columnCount: {
    md: 2,
    lg: 2,
    xl: 2,
    xxl: 2
  }
};

export const OneColumn = Template.bind({});
OneColumn.args = {
  columnCount: {
    md: 1,
    lg: 1,
    xl: 1,
    xxl: 1
  }
};
