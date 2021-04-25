import { DInputPassword } from "@";

export default {
  title: "Atoms/InputPassword",
  component: DInputPassword,
  argTypes: {}
};

const Template = args => ({
  components: { DInputPassword },
  setup() {
    return { args };
  },
  template: "<DInputPassword />"
});

export const Default = Template.bind({});
