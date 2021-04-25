import { DLink } from "@";

export default {
  title: "Atoms/Link",
  component: DLink,
  argTypes: {
    type: {
      control: {
        type: "select",
        // TODO: make it more consistent with DButton types ???
        options: ["primary", "secondary", "tertiary", "inverse", "danger"]
      },
      defaultValue: "primary"
    },
    content: {
      control: { type: "text" },
      defaultValue: "Some link text"
    },
    href: {
      control: { type: "text" },
      defaultValue: "https://example.com"
    },
    // TODO: move to helper/util function
    size: {
      control: {
        type: "select",
        options: [
          "small",
          "general",
          "longread",
          "augmented",
          "h5",
          "h4",
          "h3",
          "h2",
          "h1"
        ]
      },
      defaultValue: "general"
    },
    hideExternalLinkIcon: {
      control: { type: "boolean" },
      defaultValue: true
    }
  }
};

const Template = args => ({
  components: { DLink },
  setup() {
    return { args };
  },
  template: '<DLink v-bind="args" />'
});

export const Primary = Template.bind({});
Primary.args = {
  type: "primary"
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: "secondary"
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  type: "tertiary"
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
