import { DZoomIn, DPicture } from "@";

import "../assets/styles/containers/d-zoom-in.scss";
import image from "../assets/programmer.jpg";

export default {
  title: "Containers/ZoomIn",
  component: DZoomIn,
  argTypes: {
    onUpdateZoom: { action: "update:zoom" }
  }
};

const Template = args => ({
  components: { DZoomIn, DPicture },
  setup() {
    return { args, image };
  },
  template: `
    <div id="d-zoom-in-container">
      <DZoomIn v-bind="args" @update:zoom="args.onUpdateZoom">
        <DPicture :source="image" />
      </DZoomIn>
    </div>
  `
});

export const Picture = Template.bind({});
