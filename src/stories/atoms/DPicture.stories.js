import { DPicture } from "@";
import image from "../assets/images/programmer.jpg";

export default {
  title: "Atoms/Picture",
  component: DPicture,
  argTypes: {
    // TODO: object type also
    source: {
      control: { type: "text" },
      defaultValue: image
    },
    caption: {
      control: { type: "text" },
      defaultValue: "Some caption"
    },
    aspectRatio: {
      control: { type: "text" },
      defaultValue: "2:3"
    }
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
