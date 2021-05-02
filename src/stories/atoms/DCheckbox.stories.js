import { DCheckbox } from "@";

import controlColorList from "@/utils/controlColorList";

export default {
  title: "Atoms/Checkbox",
  component: DCheckbox,
  argTypes: {
    id: { control: { type: "text" } },
    color: {
      control: { type: "select", options: controlColorList },
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
      // TODO: do we really need this ???
      control: { type: "select", options: ["general", "small"] },
      defaultValue: "general"
    },
    error: { control: { type: "text" } },
    // TODO: how to bind this automatically ???
    onUpdateValue: { action: "update:value" }
  }
};

const Template = args => ({
  components: { DCheckbox },
  setup() {
    return { args };
  },
  template: '<DCheckbox v-bind="args" @update:value="args.onUpdateValue" />'
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