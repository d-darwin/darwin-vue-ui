import { mount } from "@vue/test-utils";
import DCopyContent from "@/components/atoms/DCopyContent";

const CONTENT = "Some content to copy";

describe("components/atoms/DCopyContent", () => {
  const wrapper = mount(DCopyContent, {
    props: {
      content: CONTENT
    }
  });

  it("Renders .d-copy-content element", () => {
    expect(wrapper.html().includes(".d-copy-content")).toBe(true);
  });
});
