import { DInput } from "@";

export default {
  title: "Atoms/Input",
  component: DInput,
  argTypes: {
    // TODO: use helper/util
    // TODO: move control size prop to mixins
    size: {
      control: { type: "select", options: ["large", "medium"] },
      defaultValue: "large"
    },
    // TODO: move to some helpers or utils
    roundness: {
      control: { type: "select", options: ["smooth", "rounded", "boxed"] },
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
    }
  }
};

const Template = args => ({
  components: { DInput },
  setup() {
    return { args };
  },
  template: '<DInput v-bind="args" />'
});

export const Large = Template.bind({});
Large.args = {
  size: "large"
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium"
};

// TODO: small ???
