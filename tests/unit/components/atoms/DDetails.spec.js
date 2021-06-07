import { mount } from "@vue/test-utils";
import "regenerator-runtime/runtime";

import DDetails from "@/components/atoms/DDetails";

const SUMMARY = "Some title";
const CONTENT = "Content string";

describe("components/atoms/DDetails", () => {
  const wrapper = mount(DDetails, {
    props: {
      summary: SUMMARY,
      content: CONTENT
    }
  });

  it("Renders .d-details element", () => {
    expect(wrapper.html().includes("d-details")).toBe(true);
  });

  it("Contains props.summary text", () => {
    expect(wrapper.html().includes(SUMMARY)).toBe(true);
  });

  it("Contains props.content text", () => {
    expect(wrapper.html().includes(CONTENT)).toBe(true);
  });

  it("Should be opened after first click", async () => {
    await wrapper.vm.summaryClickHandler();
    await wrapper.vm.$nextTick();
    // wrapper.find(".summary").trigger("click");
    expect(wrapper.vm.isOpened).toBe(true);
  });

  it("Emits update:open on click on summary tag", () => {
    wrapper.find(".summary").trigger("click");
    expect(!!wrapper.emitted()["update:open"]).toBe(true);
  });
});
