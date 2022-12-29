<template>
  <v-container>
    <div class="my-8">
      <div class="text-center" v-if="isLoading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <v-card v-if="!isLoading">
        <v-card-title>{{ show.getName() }}</v-card-title>
        <v-row align="center">
          <v-col :cols="mdAndUp ? 4 : 12" align-self="center">
            <v-img :src="show.getImage('medium')" width="210" class="mx-auto" />
          </v-col>
          <v-col>
            <v-table theme="dark">
              <tbody>
                <tr>
                  <th>Network</th>
                  <td>{{ show.getNetworkAndCountryName() }}</td>
                </tr>
                <tr>
                  <th>Genres</th>
                  <td>{{ show.getGenresJoint() }}</td>
                </tr>
                <tr>
                  <th>Premiered</th>
                  <td v-if="show.premiered">
                    {{ show.getPremieredLocaleDate(locale.locale) }}
                  </td>
                </tr>
                <tr>
                  <th>Ended</th>
                  <td>{{ show.getEndedLocaleDate(locale.locale) }}</td>
                </tr>
                <tr>
                  <th>Rating Average</th>
                  <td><v-icon icon="mdi-star" />{{ show.getRating() }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
        <v-row class="px-4 py-2">
          <v-col>
            <p>Language: {{ show.language }}</p>
            <p>Runtime: {{ show.runtime }} minutes</p>
          </v-col>
          <v-col>
            <p v-if="show.officialSite">
              <a :href="show.officialSite" target="_blank">Official Site</a>
            </p>
            <p v-if="show.url">
              <a :href="show.url" target="_blank">TV Maze</a>
            </p>
            <p v-if="show.externals.imdb">
              <a :href="show.getExternals().getIMDbUrl()" target="_blank"
                >IMDb</a
              >
            </p>
            <p v-if="show.externals.thetvdb">
              <a :href="show.getExternals().getTheTVDBUrl()" target="_blank"
                >TheTVDB</a
              >
            </p>
            <p v-if="show.externals.tvrage">
              <a :href="show.getExternals().getTheTVRageUrl()" target="_blank"
                >TVRage</a
              >
            </p>
          </v-col>
        </v-row>
        <v-row class="px-4 py-2">
          <v-col>
            <div v-html="show.summary" />
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { useDisplay } from "vuetify";
import { mapState } from "vuex";
import { Show } from "@/models/Show";

export default {
  name: "DetailView",
  props: ["id"],
  data: () => ({
    isLoading: false,
  }),
  computed: mapState(["locale", "show"]),
  methods: {
    fetchShow(showId) {
      if (this.isLoading) return;

      this.isLoading = true;

      fetch(`https://api.tvmaze.com/shows/${showId}`)
        .then((res) => res.json())
        .then((entry) => {
          this.$store.dispatch("setShow", new Show(entry));
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchShow(this.id);
      },
      { immediate: true }
    );
  },
  setup() {
    const { mdAndUp } = useDisplay();

    return { mdAndUp };
  },
};
</script>
