import { DTabs } from "@";

export default {
  title: "Molecules/Tabs",
  component: DTabs,
  argTypes: {
    itemList: {
      control: { type: "array" },
      defaultValue: [
        {
          label: "Label ⚡ 1",
          content:
            "1 Lorem ipsum * Lorem ipsum * Lorem ipsum * Lorem ipsum * Lorem ipsum * Lorem ipsum * 1"
        },
        {
          label: "Label ⚡ 2",
          content:
            "2 Lorem ipsum * Lorem ipsum * Lorem ipsum * Lorem ipsum * Lorem ipsum * Lorem ipsum * 2"
        },
        {
          label: "Label ⚡ 3",
          content:
            "3 Lorem ipsum * Lorem ipsum * Lorem ipsum * Lorem ipsum * Lorem ipsum * Lorem ipsum * 3"
        }
      ]
    },
    isVertical: {
      control: { type: "boolean" },
      defaultValue: false
    },
    onUpdateSelected: { action: "update:selected" }
  }
};

const Template = args => ({
  components: { DTabs },
  setup() {
    return { args };
  },
  template: '<DTabs v-bind="args" @update:selected="args.onUpdateSelected" />'
});

export const Horizontal = Template.bind({});

export const Vertical = Template.bind({});
Vertical.args = {
  isVertical: true
};
