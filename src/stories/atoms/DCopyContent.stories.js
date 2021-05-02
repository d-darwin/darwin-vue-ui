import { DCopyContent } from "@";

export default {
  title: "Atoms/CopyContent",
  component: DCopyContent,
  argTypes: {
    content: {
      control: { type: "text" },
      defaultValue: "Some text to copy"
    },
    onCopied: { action: "copied" }
  }
};

const Template = args => ({
  components: { DCopyContent },
  setup() {
    return { args };
  },
  template: '<DCopyContent v-bind="args" />'
});

export const Default = Template.bind({});
