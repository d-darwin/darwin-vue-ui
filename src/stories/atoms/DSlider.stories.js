import { DSlider } from "@";

import controlColor from "@/stories/helpers/controlColor";

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
    color: controlColor,
    error: {
      control: { type: "text" }
    },
    onUpdateValue: { actions: "update:value" }
  }
};

const Template = args => ({
  components: { DSlider },
  setup() {
    return { args };
  },
  template: '<DSlider v-bind="args" @update:value="args.onUpdateValue" />'
});

export const Primary = Template.bind({});
Primary.args = { color: "primary" };

export const Accent = Template.bind({});
Accent.args = { color: "accent" };

export const Text = Template.bind({});
Text.args = { color: "text" };
