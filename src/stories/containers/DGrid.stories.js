import { DGrid } from "@";
import "../assets/styles/containers/d-grid.scss";

export default {
  title: "Containers/Grid",
  component: DGrid,
  argTypes: {
    columnCount: {},
    tag: { control: { type: "text" }, defaultValue: "div" },
    hasColumnGap: { control: { type: "boolean" }, defaultValue: true },
    hasRawGap: { control: { type: "boolean" }, defaultValue: true }
  }
};

const Template = args => ({
  components: { DGrid },
  setup() {
    return { args };
  },
  template: `
    <DGrid id="d-grid" v-bind="args">
      <div class="grid-item" v-text="'01'" />
      <div class="grid-item" v-text="'02'" />
      <div class="grid-item" v-text="'03'" />
      <div class="grid-item" v-text="'04'" />
      <div class="grid-item" v-text="'05'" />
      <div class="grid-item" v-text="'06'" />
      <div class="grid-item" v-text="'07'" />
      <div class="grid-item" v-text="'08'" />
      <div class="grid-item" v-text="'09'" />
      <div class="grid-item" v-text="'10'" />
      <div class="grid-item" v-text="'11'" />
      <div class="grid-item" v-text="'12'" />
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
    sm: 4,
    md: 4,
    lg: 4,
    xl: 4,
    xxl: 4
  }
};

export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
  columnCount: {
    sm: 3,
    md: 3,
    lg: 3,
    xl: 3,
    xxl: 3
  }
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  columnCount: {
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2,
    xxl: 2
  }
};

export const OneColumn = Template.bind({});
OneColumn.args = {
  columnCount: {
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
    xxl: 1
  }
};
