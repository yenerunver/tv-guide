import { describe, it, expect } from "vitest";

import { shallowMount } from "@vue/test-utils";
import CountrySelector from "../CountrySelector.vue";
import { createStore } from "vuex";
import { Country } from "../../models/Country";
import { MOCK_COUNTRY } from "../../models/__tests__/__mocks__/Country.mock";

const store = createStore({
  state() {
    return {
      selectedCountry: new Country(MOCK_COUNTRY),
    };
  },
});
describe("CountrySelector", () => {
  it("renders properly", () => {
    // @ts-ignore
    const wrapper = shallowMount(CountrySelector, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.html()).toContain(
      `<v-select modelvalue="TR" name="country" variant="solo" density="compact" items="[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]" item-title="code" item-value="code"></v-select>`
    );
  });
});
