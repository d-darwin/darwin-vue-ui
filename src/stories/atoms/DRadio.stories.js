import { DRadio } from "@";

export default {
  title: "Atoms/Radio",
  component: DRadio,
  argTypes: {
    type: {
      control: { type: "select", options: ["base", "button"] },
      defaultValue: "base"
    },
    color: {
      control: { type: "select", options: ["primary", "accent", "text"] },
      defaultValue: "primary"
    },
    label: {
      control: { type: "text" },
      default: "Radio"
    },
    labelSize: {
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
    }
  }
};

const Template = args => ({
  components: { DRadio },
  setup() {
    return { args };
  },
  template: '<DRadio v-bind="args" />'
});

export const Base = Template.bind({});
Base.args = {
  type: "base"
};

export const Button = Template.bind({});
Button.args = {
  type: "button"
};
