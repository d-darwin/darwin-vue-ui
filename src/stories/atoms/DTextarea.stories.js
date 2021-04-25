import { DTextarea } from "@";

export default {
  title: "Atoms/TextArea",
  component: DTextarea,
  argTypes: {
    // TODO: share with other components
    size: {
      control: { type: "select", options: ["large", "medium"] },
      defaultValue: "large"
    },
    // TODO: move to some helpers or utils
    roundness: {
      control: { type: "select", options: ["smooth", "rounded", "boxed"] },
      defaultValue: "smooth"
    },
    label: { control: { type: "text" }, defaultValue: "Textarea" },
    borderless: { control: { type: "boolean" } },
    error: { control: { type: "text" } }
  }
};

const Template = args => ({
  components: { DTextarea },
  setup() {
    return { args };
  },
  template: '<DTextarea v-bind="args" />'
});

export const Default = Template.bind({});
