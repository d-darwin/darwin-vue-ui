import { DAspectRatio } from "@";
import "../assets/styles/containers/d-aspect-ratio.scss";

export default {
  title: "Containers/AspectRatio",
  component: DAspectRatio,
  argTypes: {
    aspectRatio: { control: { type: "text" } },
    tag: { control: { type: "text" }, defaultValue: "div" }
  }
};

const Template = args => ({
  components: { DAspectRatio },
  setup() {
    return { args };
  },
  template: `
    <DAspectRatio v-bind="args">
      <div class="content" >Content</div>
    </DAspectRatio>
  `
});

export const _1_1_ = Template.bind({});
_1_1_.args = {
  aspectRatio: "1:1"
};

export const _2_3_ = Template.bind({});
_2_3_.args = {
  aspectRatio: "2:3"
};

export const _9_16_ = Template.bind({});
_9_16_.args = {
  aspectRatio: "9:16"
};