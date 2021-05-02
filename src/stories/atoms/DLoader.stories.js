import { DLoader } from "@";

export default {
  title: "Atoms/Loader",
  component: DLoader
};

const Template = args => ({
  components: { DLoader },
  setup() {
    return { args };
  },
  template: '<DLoader v-bind="args" />'
});

export const Default = Template.bind({});
