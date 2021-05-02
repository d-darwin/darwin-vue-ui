import { DVideo } from "@";
import video from "../assets/sample-mp4-file.mp4";

export default {
  title: "Atoms/Video",
  component: DVideo,
  argTypes: {
    source: {
      control: { type: "text" }
    },
    caption: {
      control: { type: "text" },
      defaultValue: "Some caption"
    },
    aspectRatio: {
      control: { type: "text" },
      defaultValue: "9:16"
    },
    onLoaded: { action: "loaded" }
  }
};

const Template = args => ({
  components: { DVideo },
  setup() {
    return { args };
  },
  template: '<DVideo v-bind="args" />'
});

export const Youtube = Template.bind({});
Youtube.args = {
  source: "https://www.youtube.com/watch?v=ySkuZNgpd6U"
};

export const Local = Template.bind({});
Local.args = {
  source: video,
  format: "video/mp4",
  autoplay: true,
  controls: true
};
