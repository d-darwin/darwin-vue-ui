import { DFiles } from "@";

export default {
  title: "Atoms/Files",
  component: DFiles,
  argTypes: {
    multiple: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    label: { control: { type: "text" }, defaultValue: "Upload file(s)" },
    error: { control: { type: "text" } }
  }
};

const Template = args => ({
  components: { DFiles },
  setup() {
    return { args };
  },
  template: '<DFiles v-bind="args" />'
});

export const Single = Template.bind({});

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true
};
