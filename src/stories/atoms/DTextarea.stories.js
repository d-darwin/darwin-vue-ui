import { DTextarea } from "@";

import controlSize from "@/stories/helpers/controlSize";
import controlRoundness from "@/stories/helpers/controlRoundness";

export default {
  title: "Atoms/Textarea",
  component: DTextarea,
  argTypes: {
    size: controlSize,
    roundness: controlRoundness,
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
