import { DSlider } from "@";

export default {
  title: "Atoms/Slider",
  component: DSlider,
  argTypes: {
    label: {
      control: { type: "text" },
      defaultValue: "Slider"
    },
    value: {
      control: { type: "number" },
      defaultValue: 5
    },
    min: {
      control: { type: "number" },
      defaultValue: 0
    },
    max: {
      control: { type: "number" },
      defaultValue: 10
    },
    // TODO: share with slider/radio
    color: {
      control: { type: "select", options: ["primary", "accent", "text"] },
      defaultValue: "primary"
    },
    error: {
      control: { type: "text" }
    }
  }
};

const Template = args => ({
  components: { DSlider },
  setup() {
    return { args };
  },
  template: '<DSlider v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = { color: "primary" };

export const Accent = Template.bind({});
Accent.args = { color: "accent" };

export const Text = Template.bind({});
Text.args = { color: "text" };
