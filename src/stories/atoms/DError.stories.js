import { DError } from "@";

export default {
  title: "Atoms/Error",
  component: DError,
  argTypes: {
    content: {
      control: { type: "text" },
      defaultValue: "Some error <strong>HTML</strong> string"
    }
  }
};

const Template = args => ({
  components: { DError },
  setup() {
    return { args };
  },
  template: '<DError v-bind="args" />'
});

export const Default = Template.bind({});
// TODO: how to check transition ???
