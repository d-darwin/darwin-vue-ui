import { DDetails } from "@";

import "../assets/styles/atoms/d-details.scss";

import controlSize from "@/stories/helpers/controlSize";
import controlRoundness from "@/stories/helpers/controlRoundness";

export default {
  title: "Atoms/Details",
  component: DDetails,
  argTypes: {
    open: { control: { type: "boolean" } },
    // TODO: storybook cannot understand the difference between slots and props with the same names
    summary: { control: { type: "text" }, defaultValue: "Summary" },
    content: {
      control: { type: "text" },
      defaultValue: "TODO: Details * Details * Details *"
    },
    size: controlSize,
    roundness: controlRoundness,
    onUpdateOpen: { action: "update:open" }
  }
};

const Template = args => ({
  components: { DDetails },
  setup() {
    return { args };
  },
  template: `
    <div id="d-details-container">
      <DDetails v-bind="args" @update:open="args.onUpdateOpen" />
    </div>
  `
});

export const Large = Template.bind({});
// TODO: check paddings
Large.args = { size: "large" };

export const Medium = Template.bind({});
// TODO: check paddings
Medium.args = { size: "medium" };

export const Small = Template.bind({});
// TODO: check paddings
Small.args = { size: "small" };
