import { DRadio } from "@";

import controlColor from "@/stories/helpers/controlColor";

export default {
  title: "Atoms/Radio",
  component: DRadio,
  argTypes: {
    type: {
      control: { type: "select", options: ["base", "button"] },
      defaultValue: "base"
    },
    color: controlColor,
    label: {
      control: { type: "text" },
      default: "Radio"
    },
    labelSize: {
      // TODO: do we really need this ???
      control: { type: "select", options: ["general", "small"] },
      defaultValue: "general"
    },
    error: {
      control: { type: "text" },
      default: "Radio"
    },
    checked: {
      control: { type: "boolean" },
      defaultValue: true
    },
    onUpdateValue: { action: "update:value" }
  }
};

const Template = args => ({
  components: { DRadio },
  setup() {
    return { args };
  },
  template: '<DRadio v-bind="args" @update:value="args.onUpdateValue" />'
});

export const Base = Template.bind({});
Base.args = {
  type: "base"
};

export const Button = Template.bind({});
Button.args = {
  type: "button"
};
