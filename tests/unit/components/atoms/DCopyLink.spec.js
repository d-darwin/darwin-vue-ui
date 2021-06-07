import { mount } from "@vue/test-utils";
import "regenerator-runtime/runtime";

import DCopyLink from "@/components/atoms/DCopyLink";
import DLink from "@/components/atoms/DLink";

const LINK_TEXT = "Some link text";

describe("components/atoms/DCopyLink", () => {
  const wrapper = mount(DCopyLink, {
    props: {
      linkText: LINK_TEXT
    }
  });

  it("Renders .d-copy-link element", () => {
    expect(wrapper.html().includes("d-copy-link")).toBe(true);
  });

  it("Contains props.linkText", () => {
    expect(wrapper.html().includes(LINK_TEXT)).toBe(true);
  });

  it("Contains DLink component", () => {
    expect(wrapper.findComponent(DLink).exists()).toBe(true);
  });

  it("Emits copied on content copy", async () => {
    await wrapper.vm.copyLink();
    expect(!!wrapper.emitted().copied).toBe(true);
  });

  /*it("Push props.content to clipboard after click", () => {
    // TODO: jest can't use browser API, use puppeteer???
  })*/
});
