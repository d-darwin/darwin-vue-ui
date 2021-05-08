import { DFullScreen, DPicture } from "@";

import "../assets/styles/containers/d-full-screen.scss";
import image from "../assets/programmer.jpg";

export default {
  title: "Containers/FullScreen",
  component: DFullScreen,
  argTypes: {
    linkText: { control: { type: "text" }, defaultValue: "Full Screen" },
    onUpdateFullscreen: { action: "update:fullscreen" }
  }
  /*parameters: {
    layout: "fullscreen"
  }*/
};

const Template = args => ({
  components: { DFullScreen, DPicture },
  setup() {
    return { args, image };
  },
  template: `
    <div id="d-full-screen-container">
      <DFullScreen v-bind="args" @update:fullscreen="args.onUpdateFullscreen">
        <DPicture :source="image" />
      </DFullScreen>
    </div>
  `
});

export const Picture = Template.bind({});

// TODO: add other content stories
