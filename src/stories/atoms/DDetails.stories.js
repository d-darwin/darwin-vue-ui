import { DDetails } from "@";

import controlSizeList from "@/utils/controlSizeList";
import controlRoundnessList from "@/utils/controlRoundnessList";

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
    size: {
      control: { type: "select", options: controlSizeList },
      defaultValue: "medium"
    },
    roundness: {
      control: { type: "select", options: controlRoundnessList },
      defaultValue: "rounded"
    },
    onUpdateOpen: { action: "update:open" }
  }
};

const Template = args => ({
  components: { DDetails },
  setup() {
    return { args };
  },
  template: '<DDetails v-bind="args" @update:open="args.onUpdateOpen" />'
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
