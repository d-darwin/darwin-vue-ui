import { DNotification } from "@";

import positionFull from "@/stories/helpers/positionFull";

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
    position: positionFull,
    onUpdateVisibility: { action: "update:visibility" }
  }
};

const Template = args => ({
  components: { DNotification },
  setup() {
    return { args };
  },
  template: `<DNotification v-bind="args" @update:visibility="args.onUpdateVisibility" />`
});

export const Default = Template.bind({});
