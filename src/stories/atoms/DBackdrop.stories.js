import { DBackdrop } from "@";

export default {
  title: "Atoms/Backdrop",
  component: DBackdrop
};

const Template = args => ({
  components: { DBackdrop },
  setup() {
    return { args };
  },
  template: "<DBackdrop />"
});

export const Default = Template.bind({});
