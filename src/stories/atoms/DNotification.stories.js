import { DNotification } from "@";

export default {
  title: "Atoms/Notification",
  component: DNotification,
  argTypes: {
    content: {
      control: { type: "text" },
      defaultValue: "Notification <strong>HTML</strong> string"
    },
    displayDuration: {
      control: { type: "number" },
      defaultValue: 5
    },
    position: {
      // TODO: use helper/util
      control: {
        type: "select",
        options: [
          "top",
          "top-right",
          "right",
          "bottom-right",
          "bottom",
          "bottom-left",
          "left",
          "top-left"
        ]
      }
    }
  }
};

const Template = args => ({
  components: { DNotification },
  setup() {
    return { args };
  },
  template: `<DNotification v-bind="args" />`
});

export const Default = Template.bind({});
