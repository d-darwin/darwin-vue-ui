import { mount } from "@vue/test-utils";
import DButton from "@/components/atoms/DButton";

const BUTTON_TEXT = "Button text";

const factory = props => {
  return mount(DButton, {
    props: {
      ...props
    }
  });
};

describe("components/atoms/DButton.vue", () => {
  const wrapper = factory({
    content: BUTTON_TEXT
  });

  it("Renders .d-button", () => {
    expect(wrapper.html().includes("d-button")).toBe(true);
  });

  it("Renders 'button' tag if 'href' and 'to' props are not presented", () => {
    expect(wrapper.vm.el).toBe("button");
  });

  it("Renders 'a' tag if 'href' props is presented", () => {
    const wrapper = factory({
      content: BUTTON_TEXT,
      href: "/some-link"
    });
    expect(wrapper.vm.el).toBe("a");
  });

  it("Renders 'router-link' tag if 'to' props is presented and vue-router module is installed", () => {
    const wrapper = factory({
      content: BUTTON_TEXT,
      to: "/some-route"
    });
    wrapper.setData({ hasRouter: true });
    expect(wrapper.vm.el).toBe("router-link");
  });

  it("Contains prop.content text", () => {
    expect(wrapper.html().includes(BUTTON_TEXT)).toBe(true);
  });

  // TODO: check all props

  it("Emits click event", () => {
    wrapper.vm.clickHandler();
    expect(!!wrapper.emitted().click).toBe(true);
  });
});
