import { DProgressBar } from "@";

export default {
  title: "Atoms/ProgressBar",
  component: DProgressBar,
  argTypes: {
    value: {
      control: { type: "number" },
      defaultValue: 50
    }
  }
};

const Template = args => ({
  components: { DProgressBar },
  setup() {
    return { args };
  },
  template: '<DProgressBar v-bind="args" />'
});

export const Default = Template.bind({});
