import { DModal, DButton } from "@";

export default {
  title: "Organisms/Modal",
  component: DModal,
  argTypes: {
    isShown: {
      control: { type: "boolean" },
      defaultValue: false
    },
    heading: {
      control: { type: "text" },
      defaultValue: "Heading"
    },
    content: {
      control: { type: "text" },
      defaultValue: "Some <strong>HTML</strong> string 📦"
    },
    onClose: { action: "close" },
    onCancel: { action: "cancel" },
    onAccept: { action: "accept" }
  }
};

const Template = args => ({
  components: { DModal, DButton },
  setup() {
    return { args };
  },
  data() {
    return {
      isShown: false
    };
  },
  template: `
    <DButton @click="isShown = true">Show Modal</DButton>
    <DModal v-bind="args" :is-shown="isShown || args.isShown" @close="isShown = false" />
  `
});

export const Default = Template.bind({});
