import { DButton } from "@";

import controlSize from "@/stories/helpers/controlSize";
import controlRoundness from "@/stories/helpers/controlRoundness";

export default {
  title: "Atoms/Button",
  component: DButton,
  argTypes: {
    content: { control: { type: "text" }, defaultValue: "Button" },
    type: {
      control: {
        type: "select",
        options: [
          "primary",
          "secondary",
          "alternative",
          "inverse",
          "danger",
          "backgroundless"
        ]
      },
      defaultValue: "primary"
    },
    size: controlSize,
    roundness: controlRoundness,
    iconOnly: {
      control: { type: "boolean" }
    },
    isFullWidth: {
      control: { type: "boolean" }
    },
    error: {
      control: { type: "text" }
    },
    // Not declared as props
    disabled: {
      control: { type: "boolean" }
    },
    onClick: { action: "click" }
  }
};

const Template = args => ({
  components: { DButton },
  setup() {
    return { args };
  },
  template: '<DButton v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = {
  type: "primary"
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: "secondary"
};

export const Alternative = Template.bind({});
Alternative.args = {
  type: "alternative"
};

export const Inverse = Template.bind({});
Inverse.args = {
  type: "inverse"
};
Inverse.parameters = {
  backgrounds: { default: "dark" }
};

export const Danger = Template.bind({});
Danger.args = {
  type: "danger"
};

export const Backgroundless = Template.bind({});
Backgroundless.args = {
  // TODO: rename, disable state
  type: "backgroundless"
};

// TODO: add with icon

// TODO: add with icon + text / text + icon

// TODO: add with emoji
