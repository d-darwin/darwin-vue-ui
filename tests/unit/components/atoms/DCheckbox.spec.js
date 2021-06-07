import { mount } from "@vue/test-utils";
import DCheckbox from "@/components/atoms/DCheckbox";

const LABEL = "Checkbox label";

describe("components/atoms/DCheckbox", () => {
  const wrapper = mount(DCheckbox, {
    props: {
      label: LABEL
    }
  });

  it("Renders .d-checkbox element", () => {
    expect(wrapper.html().includes(LABEL)).toBe(true);
  });
});
