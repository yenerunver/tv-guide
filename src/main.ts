import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createStore } from "vuex";
import { Country } from "@/models/Country";

const { locale = "en-US", timeZone: userTimezone = "Europe/Amsterdam" } =
  Intl.DateTimeFormat().resolvedOptions();

const store = createStore({
  state() {
    return {
      schedule: {},
      shows: [],
      isLoading: false,
      locale: {
        locale,
        country: Country.getCountryByTimezone(userTimezone),
      },
      selectedCountry: null,
    };
  },
  mutations: {
    SET_SCHEDULE(state, schedule) {
      state.schedule = schedule;
    },
    SET_SHOWS(state, shows) {
      state.shows = shows;
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_SELECTED_COUNTRY(state, selectedCountry) {
      state.selectedCountry = selectedCountry;
    },
  },
  actions: {
    setSchedule({ commit }, schedule) {
      commit("SET_SCHEDULE", schedule);
    },
    setShows({ commit }, shows) {
      commit("SET_SHOWS", shows);
    },
    setIsLoading({ commit }, isLoading) {
      commit("SET_IS_LOADING", isLoading);
    },
    setSelectedCountry({ commit }, selectedCountry) {
      commit("SET_SELECTED_COUNTRY", selectedCountry);
    },
  },
});

loadFonts().then();

createApp(App).use(router).use(vuetify).use(store).mount("#app");
