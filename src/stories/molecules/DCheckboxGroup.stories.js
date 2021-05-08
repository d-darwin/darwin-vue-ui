import { DCheckboxGroup } from "@";

import controlColor from "@/stories/helpers/controlColor";

export default {
  title: "Molecules/CheckboxGroup",
  component: DCheckboxGroup,
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
    color: controlColor,
    error: {
      control: { type: "text" }
    }
  }
};

const Template = args => ({
  components: { DCheckboxGroup },
  setup() {
    return { args };
  },
  template: '<DCheckboxGroup v-bind="args" />'
});

export const Default = Template.bind({});
