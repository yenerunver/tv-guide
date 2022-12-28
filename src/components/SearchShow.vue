<template>
  <v-card>
    <v-card-title> Search for a TV show</v-card-title>

    <v-card-text>
      Search for your favourite TV show all over the world
    </v-card-text>

    <v-card-text>
      <v-text-field
        v-model="selectedShow"
        @input="onSearch"
        label="TV Show Search"
        placeholder="Start typing to search by show name"
        prepend-icon="mdi-database-search"
      ></v-text-field>
    </v-card-text>
    <v-list lines="two" v-if="!isLoading" :items="shows">
      <v-list-subheader v-if="shows.length">Results</v-list-subheader>
      <v-list-item
        v-for="(show, i) in shows"
        :key="i"
        :prepend-avatar="show.getImage('medium')"
      >
        <v-list-item-title
          >{{ show.getName()
          }}<span v-if="show.getRating()">
            (<v-icon icon="mdi-star" />{{ show.getRating() }})</span
          ></v-list-item-title
        >
        <v-list-item-subtitle>{{
          show.getNetworkAndCountryName()
        }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <div class="text-center" v-if="isLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { debounce } from "lodash";
import { Show } from "@/models/Show";

export default {
  data: () => ({
    searchFunction: null,
    selectedShow: null,
  }),
  computed: mapState(["shows", "isLoading"]),
  methods: {
    fetchShows(searchQuery) {
      if (this.isLoading) return;

      this.$store.dispatch("setIsLoading", true);

      fetch("https://api.tvmaze.com/search/shows?q=" + searchQuery)
        .then((res) => res.json())
        .then((entries) => {
          this.$store.dispatch(
            "setShows",
            entries.map((entry) => new Show(entry.show))
          );
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => this.$store.dispatch("setIsLoading", false));
    },
    onSearch(event) {
      // Cancel the old request if the user continues typing
      if (this.searchFunction) this.searchFunction.cancel();

      const searchQuery = event.target.value;
      if (!searchQuery) {
        // Empty list if the query is cleared
        this.$store.dispatch("setShows", []);
        return;
      }

      // In order to start searching 0.5s after the user stops typing
      this.searchFunction = debounce(() => this.fetchShows(searchQuery), 500);
      this.searchFunction();
    },
  },
};
</script>
