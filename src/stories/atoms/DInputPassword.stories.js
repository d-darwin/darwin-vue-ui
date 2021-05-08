import { DInputPassword } from "@";

import controlSize from "@/stories/helpers/controlSize";
import controlRoundness from "@/stories/helpers/controlRoundness";

export default {
  title: "Atoms/InputPassword",
  component: DInputPassword,
  argTypes: {
    size: controlSize,
    roundness: controlRoundness,
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
    onUpdateVisibility: { acton: "update:visibility" }
  }
};

const Template = args => ({
  components: { DInputPassword },
  setup() {
    return { args };
  },
  template: `
    <DInputPassword
      v-bind="args"
      @update:value="args.onUpdateValue"
      @update:visibility="args.onUpdateVisibility"
    />
  `
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
