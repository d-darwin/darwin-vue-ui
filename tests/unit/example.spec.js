import { shallowMount } from "@vue/test-utils";
import DBackdrop from "@/components/atoms/DBackdrop";

describe("DBackdrop.vue", () => {
  it("Renders .d-backdrop element", () => {
    const wrapper = shallowMount(DBackdrop);
    expect(wrapper.find(".d-backdrop").element).toBeVisible();
  });
});
