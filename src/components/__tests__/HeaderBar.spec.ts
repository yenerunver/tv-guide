import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HeaderBar from "../HeaderBar.vue";

describe("HeaderBar", () => {
  it("renders properly", () => {
    const wrapper = mount(HeaderBar, { props: {} });
    expect(wrapper.text()).toContain("TV Guide");
  });
});
