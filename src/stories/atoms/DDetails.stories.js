import { DDetails } from "@";

export default {
  title: "Atoms/Details",
  component: DDetails,
  argTypes: {
    open: { control: { type: "boolean" } },
    summary: { control: { type: "text" }, defaultValue: "Summary" },
    content: {
      control: { type: "text" },
      defaultValue: "Details * Details * Details *"
    },
    // TODO: move to some helpers or utils
    size: {
      control: { type: "select", options: ["large", "medium", "small"] },
      defaultValue: "large"
    },
    // TODO: move to some helpers or utils
    roundness: {
      control: { type: "select", options: ["smooth", "rounded", "boxed"] },
      defaultValue: "smooth"
    }
  }
};

const Template = args => ({
  components: { DDetails },
  setup() {
    return { args };
  },
  template: '<DDetails v-bind="args" />'
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
