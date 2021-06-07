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

  it("Shows component immediately if props.scrollOffset = 0", () => {
    expect(wrapper.vm.isShown).toBe(true);
  });

  it("Doesn't show component immediately if props.scrollOffset > 0", () => {
    const wrapper = factory({ scrollOffset: 400 });
    expect(wrapper.vm.isShown).toBe(false);
  });

  it("Emits click event", () => {
    wrapper.vm.clickHandler();
    expect(!!wrapper.emitted().click).toBe(true);
  });
});
