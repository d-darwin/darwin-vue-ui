import { DModal } from "@";

export default {
  title: "Organisms/Modal",
  component: DModal,
  argTypes: {
    isShown: {
      control: { type: "boolean" },
      defaultValue: true
    },
    heading: {
      control: { type: "text" },
      defaultValue: "Heading"
    },
    content: {
      control: { type: "text" },
      defaultValue: "Some <strong>HTML</strong> string 📦"
    }
  }
};

const Template = args => ({
  components: { DModal },
  setup() {
    return { args };
  },
  template: '<DModal v-bind="args" />'
});

export const Default = Template.bind({});
