import { DSwitch } from "@";

export default {
  title: "Atoms/Switch",
  component: DSwitch,
  argTypes: {
    // TODO: share with slider/radio
    color: {
      control: { type: "select", options: ["primary", "accent", "text"] },
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
    }
  }
};

const Template = args => ({
  components: { DSwitch },
  setup() {
    return { args };
  },
  template: '<DSwitch v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = { color: "primary" };

export const Accent = Template.bind({});
Accent.args = { color: "accent" };

export const Text = Template.bind({});
Text.args = { color: "text" };
