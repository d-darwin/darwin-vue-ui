import { DCopyLink } from "@";

export default {
  title: "Atoms/CopyLink",
  component: DCopyLink,
  argTypes: {
    linkText: {
      control: { type: "text" },
      defaultValue: "Copy link"
    },
    onCopied: { action: "copied" }
  }
};

const Template = args => ({
  components: { DCopyLink },
  setup() {
    return { args };
  },
  template: '<DCopyLink v-bind="args" />'
});

export const Default = Template.bind({});
