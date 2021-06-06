import { shallowMount } from "@vue/test-utils";
import DBackdrop from "@/components/atoms/DBackdrop.vue";

describe("DBackdrop.vue", () => {
  it("Renders .d-backdrop element", () => {
    const wrapper = shallowMount(DBackdrop, {});
    expect(wrapper.html().includes("d-backdrop")).toBe(true);
  });
});
