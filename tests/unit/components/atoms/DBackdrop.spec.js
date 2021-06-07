import { mount } from "@vue/test-utils";
import DBackdrop from "@/components/atoms/DBackdrop";

describe("components/atoms/DBackdrop.vue", () => {
  const wrapper = mount(DBackdrop, {});

  it("Renders .d-backdrop element", () => {
    expect(wrapper.html().includes("d-backdrop")).toBe(true);
  });

  it("Emits click event", () => {
    wrapper.vm.clickHandler();
    expect(!!wrapper.emitted().click).toBe(true);
  });
});
