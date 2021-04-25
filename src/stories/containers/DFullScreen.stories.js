import { DFullScreen, DPicture } from "@";
import image from "../assets/programmer.jpg";

export default {
  title: "Containers/FullScreen",
  component: DFullScreen,
  argTypes: {
    linkText: { control: { type: "text" }, defaultValue: "Full Screen" }
  }
};

const Template = args => ({
  components: { DFullScreen, DPicture },
  setup() {
    return { args, image };
  },
  template: `
    <DFullScreen>
      <DPicture :source="image" />
    </DFullScreen>
  `
});

export const Picture = Template.bind({});
