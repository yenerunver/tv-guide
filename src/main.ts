import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createStore } from "vuex";
import { Country } from "@/models/Country";

const { timeZone: userTimezone = "Europe/Amsterdam" } =
  Intl.DateTimeFormat().resolvedOptions();

const store = createStore({
  state() {
    return {
      shows: [],
      isLoading: false,
      locale: {
        country: Country.getCountryByTimezone(userTimezone),
      },
    };
  },
  mutations: {
    SET_SHOWS(state, shows) {
      state.shows = shows;
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    setShows({ commit }, shows) {
      commit("SET_SHOWS", shows);
    },
    setIsLoading({ commit }, isLoading) {
      commit("SET_IS_LOADING", isLoading);
    },
  },
});

loadFonts().then();

createApp(App).use(router).use(vuetify).use(store).mount("#app");
