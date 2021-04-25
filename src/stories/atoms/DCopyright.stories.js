import { DCopyright } from "@";

export default {
  title: "Atoms/Copyright",
  component: DCopyright,
  argTypes: {
    company: { control: { type: "text" }, defaultValue: "Acme Inc." },
    startYear: { control: { type: "number" }, defaultValue: 1998 },
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
  components: { DCopyright },
  setup() {
    return { args };
  },
  template: '<DCopyright v-bind="args" />'
});

export const Default = Template.bind({});
