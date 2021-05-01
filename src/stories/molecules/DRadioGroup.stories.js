import { DRadioGroup } from "@";

export default {
  title: "Molecules/RadioGroup",
  component: DRadioGroup,
  argTypes: {
    itemList: {
      control: { type: "array" },
      defaultValue: [
        { label: "Label 1", value: "value_1" },
        { label: "Label 2", value: "value_2" },
        { label: "Label 3", value: "value_3" }
      ]
    },
    title: {
      control: { type: "text" },
      defaultValue: "Group title"
    },
    error: {
      control: { type: "text" }
    }
  }
};

const Template = args => ({
  components: { DRadioGroup },
  setup() {
    return { args };
  },
  template: '<DRadioGroup v-bind="args" />'
});

export const Default = Template.bind({});
