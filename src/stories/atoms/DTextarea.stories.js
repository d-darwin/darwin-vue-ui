import { DTextarea } from "@";

import controlSizeList from "@/utils/controlSizeList";
import controlRoundnessList from "@/utils/controlRoundnessList";

export default {
  title: "Atoms/Textarea",
  component: DTextarea,
  argTypes: {
    size: {
      control: { type: "select", options: controlSizeList },
      defaultValue: "large"
    },
    roundness: {
      control: { type: "select", options: controlRoundnessList },
      defaultValue: "smooth"
    },
    label: { control: { type: "text" }, defaultValue: "Textarea" },
    borderless: { control: { type: "boolean" } },
    error: { control: { type: "text" } },
    onUpdateValue: { actions: "update:value" }
  }
};

const Template = args => ({
  components: { DTextarea },
  setup() {
    return { args };
  },
  template: '<DTextarea v-bind="args" @update:value="args.onUpdateValue" />'
});

export const Large = Template.bind({});
Large.args = { size: "large" };

export const Medium = Template.bind({});
Medium.args = { size: "medium" };

export const Small = Template.bind({});
Small.args = { size: "small" };
