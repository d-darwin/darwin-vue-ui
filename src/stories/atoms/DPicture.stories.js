import { DPicture } from "@";
import image from "../assets/programmer.jpg";

export default {
  title: "Atoms/Picture",
  component: DPicture,
  argTypes: {
    // TODO: add responsive image also
    source: {
      control: { type: "text" },
      defaultValue: image
    },
    caption: {
      control: { type: "text" },
      defaultValue: "Some caption"
    },
    alt: {
      control: { type: "text" },
      defaultValue: "Some Alt"
    },
    aspectRatio: {
      control: { type: "text" },
      defaultValue: "2:3"
    },
    onLoaded: { action: "loaded" }
  }
};

const Template = args => ({
  components: { DPicture },
  setup() {
    return { args };
  },
  template: '<DPicture v-bind="args" />'
});

export const Default = Template.bind({});
