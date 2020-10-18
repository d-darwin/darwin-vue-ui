import { mount } from "@vue/test-utils";
import DTypography from "@/components/containers/DTypography";

describe("DTypography", () => {
  it("Тест 1", () => {
    const componentWrapper = mount(DTypography);
    expect(componentWrapper.exists()).toBe(true);
  });
});
