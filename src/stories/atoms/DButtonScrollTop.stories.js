import { DButtonScrollTop, DTypography } from "@";
import "../assets/styles/atoms/d-button-scroll-top.scss";

export default {
  title: "Atoms/ButtonScrollTop",
  component: DButtonScrollTop,
  argTypes: {
    scrollOffset: { control: { type: "number" }, defaultValue: 400 }
    // TODO: add click emit
  }
};

const Template = args => ({
  components: { DButtonScrollTop, DTypography },
  setup() {
    return { args };
  },
  template: `
    <DTypography content="Scroll down to see the button" />
    <DButtonScrollTop v-bind='args' />
  `
});

export const Default = Template.bind({});
