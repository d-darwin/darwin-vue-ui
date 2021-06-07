import { mount } from "@vue/test-utils";
import "regenerator-runtime/runtime";

import DCopyright from "@/components/atoms/DCopyright";

const START_YEAR = 2011;
const CURRENT_YEAR = new Date().getFullYear();
const COMPANY = "Some company name";
const CONTENT_PATTERN = "© START_YEAR–CURRENT_YEAR COMPANY";
const CONTENT_SHORT_PATTERN = "© START_YEAR COMPANY";

describe("components/atoms/DCopyright", () => {
  const wrapper = mount(DCopyright, {
    props: {
      startYear: START_YEAR,
      company: COMPANY
    }
  });

  it("Renders .d-copyright element", () => {
    expect(wrapper.html().includes("d-copyright")).toBe(true);
  });

  it(`Content follows pattern ${CONTENT_PATTERN} if current year > props.startYear`, () => {
    const content = CONTENT_PATTERN.replace("START_YEAR", START_YEAR.toString())
      .replace("CURRENT_YEAR", CURRENT_YEAR.toString())
      .replace("COMPANY", COMPANY.toString());

    expect(wrapper.find(".d-copyright").text()).toBe(content);
  });

  it(`Content follows pattern ${CONTENT_SHORT_PATTERN} if current year === props.startYear`, async () => {
    const content = CONTENT_SHORT_PATTERN.replace(
      "START_YEAR",
      CURRENT_YEAR.toString()
    ).replace("COMPANY", COMPANY.toString());

    await wrapper.setProps({ startYear: CURRENT_YEAR });

    expect(wrapper.find(".d-copyright").text()).toBe(content);
  });
});
