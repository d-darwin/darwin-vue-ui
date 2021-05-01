import { DDrawer } from "@";

export default {
  title: "Organisms/Drawer",
  component: DDrawer,
  argTypes: {
    isShown: {
      control: { type: "boolean" },
      defaultValue: true
    },
    position: {
      control: { type: "select", options: ["top", "right", "bottom", "left"] },
      defaultValue: "right"
    }
  }
};

const Template = args => ({
  components: { DDrawer },
  setup() {
    return { args };
  },
  // TODO: add some demo content
  // TODO: close on event
  template: '<DDrawer v-bind="args" />'
});

export const Default = Template.bind({});
