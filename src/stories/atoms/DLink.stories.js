import { DLink } from "@";

import controlTypeList from "@/utils/controlTypeList";
import typographySizeList from "@/utils/typographySizeList";

export default {
  title: "Atoms/Link",
  component: DLink,
  argTypes: {
    type: {
      control: {
        type: "select",
        options: controlTypeList
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
    size: {
      control: {
        type: "select",
        options: typographySizeList
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
