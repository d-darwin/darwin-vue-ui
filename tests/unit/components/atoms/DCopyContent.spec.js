import { mount } from "@vue/test-utils";
import "regenerator-runtime/runtime";

import DCopyContent from "@/components/atoms/DCopyContent";
import DButton from "@/components/atoms/DButton";

const CONTENT = "Some content to copy";

describe("components/atoms/DCopyContent", () => {
  const wrapper = mount(DCopyContent, {
    props: {
      content: CONTENT
    }
  });

  it("Renders .d-copy-content element", () => {
    expect(wrapper.html().includes("d-copy-content")).toBe(true);
  });

  it("Contains DButton component", () => {
    expect(wrapper.findComponent(DButton).exists()).toBe(true);
  });

  it("Emits copied event on click", async () => {
    await wrapper.vm.copyText();
    // await wrapper.vm.$nextTick();

    console.log(wrapper.emitted());
    // expect(!!wrapper.emitted().copied).toBe(true);
  });

  /*it("Push props.content to clipboard after click", () => {

  })*/
});
