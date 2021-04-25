import { DButton } from "@";

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
    // TODO: move to some helpers or utils
    size: {
      control: { type: "select", options: ["large", "medium", "small"] },
      defaultValue: "large"
    },
    // TODO: move to some helpers or utils
    roundness: {
      control: { type: "select", options: ["smooth", "rounded", "boxed"] },
      defaultValue: "smooth"
    },
    iconOnly: {
      control: { type: "boolean" }
    },
    error: {
      control: { type: "text" }
    },
    // Not declared as props
    disabled: {
      control: { type: "boolean" }
    }
    // onClick: {} // TODO
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
