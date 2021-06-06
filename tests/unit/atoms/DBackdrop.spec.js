import { mount } from "@vue/test-utils";
import DBackdrop from "@/components/atoms/DBackdrop.vue";

describe("DBackdrop.vue", () => {
  const wrapper = mount(DBackdrop, {});

  it("Renders .d-backdrop element", () => {
    expect(wrapper.html().includes("d-backdrop")).toBe(true);
  });
});
