import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createStore } from "vuex";
import { Country } from "@/models/Country";
import { Episode } from "@/models/Episode";
import { Show } from "@/models/Show";

interface IState {
  schedule: {
    [date: string]: {
      byGenre: { [genre: string]: Episode[] };
      byNetwork: { [network: string]: Episode[] };
      top5: Episode[];
    };
  } | null;
  show: Show | null;
  shows: Show[];
  top5: Show[];
  isLoading: boolean;
  locale: {
    locale: string | null;
    country: Country | null;
  };
  selectedCountry: Country | null;
  selectedDate: Date | null;
}

const { locale = "en-US", timeZone: userTimezone = "Europe/Amsterdam" } =
  Intl.DateTimeFormat().resolvedOptions();

const store = createStore({
  state: (): IState => ({
    schedule: null,
    show: null,
    shows: [],
    top5: [],
    isLoading: false,
    locale: {
      locale,
      country: Country.getCountryByTimezone(userTimezone),
    },
    selectedCountry: Country.getCountryByCode("NL"),
    selectedDate: new Date(),
  }),
  mutations: {
    SET_SCHEDULE(state, schedule) {
      state.schedule = schedule;
    },
    SET_SHOW(state, show) {
      state.show = show;
    },
    SET_TOP5(state, top5) {
      state.top5 = top5;
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
    SET_SELECTED_DATE(state, selectedDate) {
      state.selectedDate = selectedDate;
    },
  },
  actions: {
    // somehow void is not accepted as a return type for this action
    // @ts-ignore
    setSchedule(
      { commit, state }: { commit: Function; state: IState },
      {
        episodes,
        formattedDate,
      }: {
        episodes: Episode[];
        formattedDate: string;
      }
    ): void {
      const newSchedule = {
        byGenre: Episode.getEpisodesByGenre(episodes),
        byNetwork: Episode.getEpisodesByNetwork(episodes),
        top5: Show.getTop5(
          episodes.map((episode: Episode) => episode.getShow())
        ),
      };

      const mergedSchedule = {
        ...(state.schedule || {}),
        [formattedDate]: {
          ...(state.schedule && state.schedule[formattedDate]
            ? state.schedule[formattedDate]
            : {}),
          [state.selectedCountry!.code]: newSchedule,
        },
      };

      commit("SET_SCHEDULE", mergedSchedule);
    },
    setShow({ commit }, show) {
      commit("SET_SHOW", show);
    },
    setShows({ commit }, shows) {
      commit("SET_SHOWS", shows);
    },
    setTop5({ commit }, top5) {
      commit("SET_TOP5", top5);
    },
    setIsLoading({ commit }, isLoading) {
      commit("SET_IS_LOADING", isLoading);
    },
    setSelectedCountry({ commit }, selectedCountry) {
      commit("SET_SELECTED_COUNTRY", selectedCountry);
    },
    setSelectedDate({ commit }, selectedDate) {
      commit("SET_SELECTED_DATE", selectedDate);
    },
  },
});

loadFonts().then();

createApp(App).use(router).use(vuetify).use(store).mount("#app");
