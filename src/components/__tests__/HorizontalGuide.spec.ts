import { describe, it, expect } from "vitest";

import { mount, shallowMount } from "@vue/test-utils";
import HorizontalGuide from "../HorizontalGuide.vue";
import { createStore } from "vuex";
import { Country } from "../../models/Country";
import { Episode } from "../../models/Episode";
import { MOCK_COUNTRY } from "../../models/__tests__/__mocks__/Country.mock";
import { MOCK_EPISODE } from "../../models/__tests__/__mocks__/Episode.mock";
import { createVuetify } from "vuetify";

const groupBy = "byNetwork";
const country = new Country(MOCK_COUNTRY);
const selectedDate = new Date();
const formattedDate = selectedDate.toISOString().split("T")[0];
const episode = new Episode(MOCK_EPISODE);

const store = createStore({
  state() {
    return {
      selectedCountry: country,
      selectedDate,
      locale: {
        country,
      },
      schedule: {
        [formattedDate]: {
          [country.code]: {
            [groupBy]: Episode.getEpisodesByNetwork([episode]),
          },
        },
      },
    };
  },
});
describe("CountrySelector", () => {
  const vuetify = createVuetify();

  it("renders properly", () => {
    // @ts-ignore
    const wrapper = shallowMount(HorizontalGuide, {
      props: {
        groupBy,
      },
      global: {
        plugins: [store, vuetify],
      },
    });
    expect(wrapper.html()).toContain(
      `<div class="wrapper overflow-x-visible overflow-y-hidden my-8">`
    );
  });
});
