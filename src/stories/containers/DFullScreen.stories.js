import { DFullScreen, DPicture } from "@";
import image from "../assets/programmer.jpg";

export default {
  title: "Containers/FullScreen",
  component: DFullScreen,
  argTypes: {
    linkText: { control: { type: "text" }, defaultValue: "Full Screen" },
    onUpdateFullscreen: { action: "update:fullscreen" }
  }
};

const Template = args => ({
  components: { DFullScreen, DPicture },
  setup() {
    return { args, image };
  },
  template: `
    <DFullScreen v-bind="args" @update:fullscreen="args.onUpdateFullscreen">
      <DPicture :source="image" />
    </DFullScreen>
  `
});

export const Picture = Template.bind({});

// TODO: add other content stories
