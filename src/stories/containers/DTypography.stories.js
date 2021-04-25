import DTypography from "@/components/containers/DTypography";
// import "@/assets/styles/tokens/_typography.scss";

export default {
  title: "Atoms/Typography",
  component: DTypography,
  argTypes: {
    content: { control: { type: "text" }, defaultValue: "Some text string" },
    tag: { control: { type: "text" }, defaultValue: "div" },
    fontSize: {
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
  fontSize: "general"
};

export const Small = Template.bind({});
Small.args = {
  fontSize: "small"
};

export const Longread = Template.bind({});
Longread.args = {
  fontSize: "longread"
};

export const Augmented = Template.bind({});
Augmented.args = {
  fontSize: "augmented"
};

export const Heading_5 = Template.bind({});
Heading_5.args = {
  fontSize: "h5"
};

export const Heading_4 = Template.bind({});
Heading_4.args = {
  fontSize: "h4"
};

export const Heading_3 = Template.bind({});
Heading_3.args = {
  fontSize: "h3"
};

export const Heading_2 = Template.bind({});
Heading_2.args = {
  fontSize: "h2"
};

export const Heading_1 = Template.bind({});
Heading_1.args = {
  fontSize: "h1"
};
