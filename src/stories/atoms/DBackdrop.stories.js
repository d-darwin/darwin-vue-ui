import { DBackdrop } from "@";

export default {
  title: "Atoms/Backdrop",
  component: DBackdrop,
  argTypes: {
    onClick: { action: "click" }
  }
};

const Template = args => ({
  components: { DBackdrop },
  setup() {
    return { args };
  },
  template: "<DBackdrop v-bind='args' />"
});

export const Default = Template.bind({});
