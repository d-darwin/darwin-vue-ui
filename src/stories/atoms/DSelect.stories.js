import { DSelect } from "@";

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
    // TODO: move to some helpers or utils
    size: {
      control: { type: "select", options: ["large", "medium"] },
      default: "large"
    },
    // TODO: move to some helpers or utils
    roundness: {
      control: { type: "select", options: ["smooth", "rounded", "boxed"] },
      defaultValue: "smooth"
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
  components: { DSelect },
  setup() {
    return { args };
  },
  template: '<DSelect v-bind="args" />'
});

export const Large = Template.bind({});
Large.args = { size: "large" };

export const Medium = Template.bind({});
Medium.args = { size: "medium" };
