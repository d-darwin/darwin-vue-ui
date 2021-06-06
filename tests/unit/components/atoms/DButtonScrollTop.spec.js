import { mount } from "@vue/test-utils";
import DButtonScrollTop from "@/components/atoms/DButtonScrollTop";

const factory = props => {
  return mount(DButtonScrollTop, {
    props: {
      ...props
    }
  });
};

describe("components/atoms/DButtonScrollTop", () => {
  const wrapper = factory({ scrollOffset: 0 });

  it("Should be teleported", () => {
    expect(wrapper.html().includes("<!--teleport start-->")).toBe(true);
  });

  it("Renders .d-button-scroll-top element immediately if props.scrollOffset = 0", () => {
    // const teleportedElement = document.querySelector(".d-button-scroll-top");
    // expect(!!teleportedElement).toBe(true);
    expect(wrapper.vm.isShown).toBe(true);
  });

  it("Doesn't render .d-button-scroll-top element immediately if props.scrollOffset > 0", () => {
    const wrapper = factory({ scrollOffset: 400 });
    expect(wrapper.vm.isShown).toBe(false);
  });

  it("Emits click event", () => {
    wrapper.vm.clickHandler();
    expect(!!wrapper.emitted().click).toBe(true);
  });
});
