<template>
  <div class="pa-8">
    <v-row class="my-8">
      <v-col justify="start">
        <a
          href=""
          class="text-decoration-none"
          v-on:click.prevent="setDateOneDayBefore"
          ><v-icon icon="mdi-arrow-left-drop-circle-outline"></v-icon
        ></a>
        <a class="mx-4">{{ dateString }}</a>
        <a
          href=""
          class="text-decoration-none"
          v-on:click.prevent="setDateOneDayAfter"
          ><v-icon icon="mdi-arrow-right-drop-circle-outline"></v-icon
        ></a>
      </v-col>
      <v-col justify="end" cols="2">
        <v-select
          v-model="country"
          name="country"
          variant="solo"
          density="compact"
          :items="countries"
          item-title="code"
          item-value="code"
        ></v-select>
      </v-col>
    </v-row>
    <HorizontalGuide
      :loading="isLoading"
      :schedule="schedule"
      :groupBy="groupBy"
    />
  </div>
</template>

<script>
import HorizontalGuide from "@/components/HorizontalGuide.vue";
import { Country } from "@/models/Country";
import { mapState } from "vuex";
import { Episode } from "@/models/Episode";

export default {
  name: "ScheduleItem",
  props: ["groupBy", "groupByFunction"],
  components: { HorizontalGuide },
  computed: {
    countries: {
      get: () => Country.getAllCountries(),
    },
    ...mapState(["locale", "schedule", "selectedCountry"]),
  },
  data: () => ({
    country: "TR",
    date: null,
    dateString: "",
    isLoading: false,
  }),
  watch: {
    date() {
      this.dateString = this.date.toLocaleDateString(this.locale.locale, {
        day: "numeric",
        year: "numeric",
        month: "long",
      });
    },
  },
  created() {
    this.date = new Date();

    this.$watch(
      () => this.country && this.date,
      () => {
        this.$store.dispatch(
          "setSelectedCountry",
          Country.getCountryByCode(this.country)
        );
        this.fetchSchedule(this.country);
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { deep: true, immediate: true }
    );
  },
  methods: {
    fetchSchedule(countryCode) {
      if (this.isLoading) return;

      this.isLoading = true;

      const formattedDate = this.date.toISOString().split("T")[0];

      fetch(
        `https://api.tvmaze.com/schedule?date=${formattedDate}&country=${countryCode}`
      )
        .then((res) => res.json())
        .then((entries) => {
          const episodes = entries.map((episode) => new Episode(episode));
          this.$store.dispatch("setSchedule", this.groupByFunction(episodes));
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => (this.isLoading = false));
    },
    setDateOneDayBefore() {
      this.date = new Date(this.date.setDate(this.date.getDate() - 1));
    },
    setDateOneDayAfter() {
      this.date = new Date(this.date.setDate(this.date.getDate() + 1));
    },
  },
};
</script>
