import { DSelect } from "@";

import controlSizeList from "@/utils/controlSizeList";
import controlRoundnessList from "@/utils/controlRoundnessList";

export default {
  title: "Atoms/Select",
  component: DSelect,
  argTypes: {
    label: {
      control: { type: "text" },
      defaultValue: "Select"
    },
    options: {
      control: { type: "array" },
      defaultValue: [
        { value: 1, text: "option 1" },
        { value: 2, text: "option 2" },
        { value: 3, text: "option 3" }
      ]
    },
    selected: {
      control: { type: "number" },
      defaultValue: 2
    },
    disabled: {
      control: { type: "boolean" }
    },
    size: {
      control: { type: "select", options: controlSizeList },
      default: "large"
    },
    roundness: {
      control: { type: "select", options: controlRoundnessList },
      defaultValue: "smooth"
    },
    borderless: {
      control: { type: "boolean" }
    },
    error: {
      control: { type: "text" }
    },
    onUpdateValue: { actions: "update:value" }
  }
};

const Template = args => ({
  components: { DSelect },
  setup() {
    return { args };
  },
  template: '<DSelect v-bind="args" @update:value="args.onUpdateValue" />'
});

export const Large = Template.bind({});
Large.args = { size: "large" };

export const Medium = Template.bind({});
Medium.args = { size: "medium" };

export const Small = Template.bind({});
Small.args = { size: "small" };
