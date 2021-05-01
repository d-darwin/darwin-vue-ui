import { DAccordion } from "@";

export default {
  title: "Molecules/Accordion",
  component: DAccordion,
  argTypes: {
    itemList: {
      control: { type: "array" },
      defaultValue: [
        {
          summary: "Summary 1",
          content: "Content 1 with some <strong>HTML</strong> 🔥"
        },
        {
          summary: "Summary 2",
          content: "Content 2 with some <strong>HTML</strong> 🔥"
        },
        {
          summary: "Summary 3",
          content: "Content 3 with some <strong>HTML</strong> 🔥"
        }
      ]
    },
    isSolo: {
      control: { type: "boolean" }
    },
    // TODO: move to some helpers or utils
    size: {
      control: { type: "select", options: ["large", "medium", "small"] },
      defaultValue: "large"
    },
    // TODO: move to some helpers or utils
    roundness: {
      control: { type: "select", options: ["smooth", "rounded", "boxed"] },
      defaultValue: "smooth"
    }
  }
};

const Template = args => ({
  components: { DAccordion },
  setup() {
    return { args };
  },
  template: '<DAccordion v-bind="args" />'
});

export const Default = Template.bind({});

// TODO: add story with using slot
