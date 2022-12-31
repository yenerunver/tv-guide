<template
  v-if="
    schedule &&
    schedule[formattedDate] &&
    schedule[formattedDate][selectedCountry.code] &&
    schedule[formattedDate][selectedCountry.code].top5
  "
>
  <div class="pa-8">
    <v-row class="my-8">
      <v-col justify="start"></v-col>
      <v-col justify="end" cols="2">
        <CountrySelector :isLoading="isLoading" />
      </v-col>
    </v-row>
    <p
      v-if="
        !isLoading &&
        schedule[formattedDate][selectedCountry.code]?.top5.length === 0
      "
    >
      No shows with ratings found.
    </p>
    <v-list lines="two" v-if="!isLoading">
      <v-list-item
        v-for="(show, i) in schedule[formattedDate][selectedCountry.code].top5"
        :key="i"
        item-value="show.id"
        v-on:click.prevent="goToShowPage(show.id)"
      >
        <template v-slot:prepend>
          <v-avatar>
            {{ i + 1 }}
          </v-avatar>
        </template>

        <v-list-item-title>{{ show.getName() }}</v-list-item-title>
        <v-list-item-subtitle>{{
          show.getNetworkAndCountryName()
        }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-avatar v-if="show.getRating()">
            {{ show.getRating() }}
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from "@/router";
import CountrySelector from "@/components/CountrySelector.vue";
import { Episode } from "@/models/Episode";

export default {
  name: "TopList",
  components: { CountrySelector },
  computed: {
    formattedDate: {
      get: () => new Date().toISOString().split("T")[0],
    },
    ...mapState(["locale", "schedule", "selectedCountry"]),
  },
  data: () => ({
    isLoading: false,
  }),
  created() {
    this.$watch(
      () => this.selectedCountry,
      () => {
        this.fetchTop5(this.selectedCountry.code);
      },
      { deep: true, immediate: true }
    );
  },
  methods: {
    fetchTop5(countryCode) {
      if (this.isLoading) return;

      this.isLoading = true;

      if (
        this.schedule &&
        this.schedule[this.formattedDate] &&
        this.schedule[this.formattedDate][this.selectedCountry.code] &&
        this.schedule[this.formattedDate][this.selectedCountry.code].top5
      ) {
        this.isLoading = false;
        return;
      }

      fetch(
        `https://api.tvmaze.com/schedule?date=${this.formattedDate}&country=${countryCode}`
      )
        .then((res) => res.json())
        .then((entries) => {
          const episodes = entries.map((episode) => new Episode(episode));
          this.$store.dispatch("setSchedule", {
            episodes,
            formattedDate: this.formattedDate,
          });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => (this.isLoading = false));
    },
    goToShowPage: (showId) => router.push(`/shows/${showId}`),
  },
};
</script>
