import { DEqualWidth, DButton } from "@";

export default {
  title: "Containers/EqualWidth",
  component: DEqualWidth,
  argTypes: {
    firstButtonText: { control: { type: "text" }, defaultValue: "Short" },
    secondButtonText: {
      control: { type: "text" },
      defaultValue: "Super long button text"
    }
  }
};

const Template = args => ({
  components: { DEqualWidth, DButton },
  setup() {
    return { args };
  },
  template: `
    <DEqualWidth>
      <DButton type="primary">{{ args.firstButtonText }}</DButton>
      <DButton type="secondary">{{ args.secondButtonText }}</DButton>
      <DButton v-if="args.thirdButtonText" type="alternative">{{ args.thirdButtonText }}</DButton>
    </DEqualWidth>
  `
});

export const TwoItems = Template.bind({});

export const ThreeItems = Template.bind({});
ThreeItems.args = {
  thirdButtonText: "Long text"
};
