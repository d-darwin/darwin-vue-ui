import { DCheckbox } from "@";

export default {
  title: "Atoms/Checkbox",
  component: DCheckbox,
  argTypes: {
    id: { control: { type: "text" } },
    color: {
      control: { type: "select", options: ["primary", "accent", "text"] },
      defaultValue: "primary"
    },
    label: {
      control: { type: "text" },
      defaultValue: "Checkbox"
    },
    checked: {
      control: { type: "boolean" },
      defaultValue: true
    },
    labelSize: {
      control: { type: "select", options: ["general", "small"] },
      defaultValue: "general"
    },
    error: { control: { type: "text" } }
  }
};

const Template = args => ({
  components: { DCheckbox },
  setup() {
    return { args };
  },
  template: '<DCheckbox v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = {
  color: "primary"
};

export const Accent = Template.bind({});
Accent.args = {
  color: "accent"
};

export const Text = Template.bind({});
Text.args = {
  color: "text"
};
