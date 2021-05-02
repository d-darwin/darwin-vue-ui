import { DInputPassword } from "@";

import controlSizeList from "@/utils/controlSizeList";
import controlRoundnessList from "@/utils/controlRoundnessList";

export default {
  title: "Atoms/InputPassword",
  component: DInputPassword,
  argTypes: {
    size: {
      control: { type: "select", options: controlSizeList },
      defaultValue: "large"
    },
    roundness: {
      control: { type: "select", options: controlRoundnessList },
      defaultValue: "smooth"
    },
    label: {
      control: { type: "text" },
      defaultValue: "Input"
    },
    placeholder: {
      control: { type: "text" },
      defaultValue: "Placeholder"
    },
    value: {
      control: { type: "text" }
    },
    borderless: {
      control: { type: "boolean" }
    },
    error: {
      control: { type: "text" }
    },
    onUpdateValue: { action: "update:value" },
    onSubmit: { action: "submit" },
    onVisibilityChange: { acton: "visibility-change" }
  }
};

const Template = args => ({
  components: { DInputPassword },
  setup() {
    return { args };
  },
  template:
    '<DInputPassword v-bind="args" @update:value="args.onUpdateValue" />'
});

export const Large = Template.bind({});
Large.args = {
  size: "large"
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium"
};

export const Small = Template.bind({});
Small.args = {
  size: "small"
};
