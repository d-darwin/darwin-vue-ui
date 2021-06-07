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

  it("Contains props.content", () => {
    expect(wrapper.html().includes(CONTENT)).toBe(true);
  });

  it("Contains DButton component", () => {
    expect(wrapper.findComponent(DButton).exists()).toBe(true);
  });

  it("Emits copied on content copy", async () => {
    await wrapper.vm.copyText();
    expect(!!wrapper.emitted().copied).toBe(true);
  });

  /*it("Push props.content to clipboard after click", () => {
    // TODO: jest can't use browser API, use puppeteer???
  })*/
});
