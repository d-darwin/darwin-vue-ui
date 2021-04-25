import { DZoomIn, DPicture } from "@";
import image from "../assets/programmer.jpg";

export default {
  title: "Containers/ZoomIn",
  component: DZoomIn
};

const Template = args => ({
  components: { DZoomIn, DPicture },
  setup() {
    return { args, image };
  },
  template: `
    <DZoomIn>
      <DPicture :source="image" />
    </DZoomIn>
  `
});

export const Picture = Template.bind({});
