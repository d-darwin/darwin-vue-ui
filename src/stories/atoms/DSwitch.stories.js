import { DSwitch } from "@";

import controlColorList from "@/utils/controlColorList";

export default {
  title: "Atoms/Switch",
  component: DSwitch,
  argTypes: {
    color: {
      control: { type: "select", options: controlColorList },
      defaultValue: "primary"
    },
    labels: {
      control: { type: "object" },
      defaultValue: { truthy: "On", falsy: "Off" }
    },
    values: {
      control: { type: "object" },
      defaultValue: { truthy: "On", falsy: "Off" }
    },
    error: {
      control: { type: "text" }
    },
    onUpdateValue: { actions: "update:value" }
  }
};

const Template = args => ({
  components: { DSwitch },
  setup() {
    return { args };
  },
  template: '<DSwitch v-bind="args" @update:value="args.onUpdateValue" />'
});

export const Primary = Template.bind({});
Primary.args = { color: "primary" };

export const Accent = Template.bind({});
Accent.args = { color: "accent" };

export const Text = Template.bind({});
Text.args = { color: "text" };
