import { DTypography } from "@";

export default {
  title: "Containers/Typography",
  component: DTypography,
  argTypes: {
    content: { control: { type: "text" }, defaultValue: "Some text string" },
    tag: { control: { type: "text" }, defaultValue: "div" },
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
      }
    }
  }
};

const Template = args => ({
  components: { DTypography },
  setup() {
    return { args };
  },
  template: '<DTypography v-bind="args" />'
});

export const General = Template.bind({});
General.args = {
  size: "general"
};

export const Small = Template.bind({});
Small.args = {
  size: "small"
};

export const Longread = Template.bind({});
Longread.args = {
  size: "longread"
};

export const Augmented = Template.bind({});
Augmented.args = {
  size: "augmented"
};

export const Heading_5 = Template.bind({});
Heading_5.args = {
  size: "h5"
};

export const Heading_4 = Template.bind({});
Heading_4.args = {
  size: "h4"
};

export const Heading_3 = Template.bind({});
Heading_3.args = {
  size: "h3"
};

export const Heading_2 = Template.bind({});
Heading_2.args = {
  size: "h2"
};

export const Heading_1 = Template.bind({});
Heading_1.args = {
  size: "h1"
};
