import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HeaderBar from "../HeaderBar.vue";

describe("HeaderBar", () => {
  it("renders properly", () => {
    const wrapper = mount(HeaderBar, { props: { backLink: false } });
    expect(wrapper.text()).toContain("TV Guide");
  });

  it("renders with back link", () => {
    const wrapper = mount(HeaderBar, { props: { backLink: true } });
    expect(wrapper.html()).toContain(
      `<v-icon icon="mdi-arrow-left-drop-circle-outline"></v-icon>`
    );
  });
});
