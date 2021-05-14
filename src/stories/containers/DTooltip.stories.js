import { DTooltip, DTypography } from "@";

import positionFull from "@/stories/helpers/positionFull";

export default {
  title: "Containers/Tooltip",
  component: DTooltip,
  argTypes: {
    position: positionFull,
    content: {
      control: { type: "text" },
      defaultValue: "Some tooltip content"
    }
    // TODO: add show/hide events
  }
};

const Template = args => ({
  components: { DTooltip, DTypography },
  setup() {
    return { args };
  },
  template: `
    <DTooltip v-bind="args">
      <DTypography content="Hover me to see the tooltip." />
    </DTooltip>
  `
});

export const Top = Template.bind({});
Top.args = {
  position: "top"
};

export const Right = Template.bind({});
Right.args = {
  position: "right"
};

export const Bottom = Template.bind({});
Bottom.args = {
  position: "bottom"
};

export const Left = Template.bind({});
Left.args = {
  position: "left"
};
