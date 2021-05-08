import { DEqualWidth, DButton } from "@";
import "../assets/styles/containers/d-equal-width.scss";

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
    <div id="d-equal-width-container">
      <DEqualWidth>
        <DButton type="primary">{{ args.firstButtonText }}</DButton>
        <DButton type="secondary">{{ args.secondButtonText }}</DButton>
        <DButton v-if="args.thirdButtonText" type="alternative">{{ args.thirdButtonText }}</DButton>
      </DEqualWidth>
    </div>
  `
});

export const TwoItems = Template.bind({});

export const ThreeItems = Template.bind({});
ThreeItems.args = {
  thirdButtonText: "Long text"
};
