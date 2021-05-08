import { DDrawer, DButton } from "@";

import "../assets/styles/organisms/d-drawer.scss";

export default {
  title: "Organisms/Drawer",
  component: DDrawer,
  argTypes: {
    isShown: {
      control: { type: "boolean" },
      defaultValue: false
    },
    position: {
      control: { type: "select", options: ["top", "right", "bottom", "left"] },
      defaultValue: "right"
    },
    onClose: { action: "close" }
  }
};

const Template = args => ({
  components: { DDrawer, DButton },
  setup() {
    return { args };
  },
  data() {
    return {
      isShown: false
    };
  },
  // TODO: add some demo content
  // TODO: close on event
  template: `
    <DButton @click="isShown = true">Show Drawer</DButton>
    <DDrawer v-bind="args" :is-shown="isShown || args.isShown" @close="isShown = false">
      <div id="d-drawer-content">content</div>
    </DDrawer>
  `
});

export const Default = Template.bind({});
