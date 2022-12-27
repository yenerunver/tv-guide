<template>
  <div class="pa-8">
    <v-row class="my-8">
      <v-col justify="start">
        <a v-on:click.prevent="setDateOneDayBefore"><v-icon icon="mdi-arrow-left"></v-icon></a>
        <a>{{ dateString }}</a>
        <a v-on:click.prevent="setDateOneDayAfter"><v-icon icon="mdi-arrow-right"></v-icon></a>
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
    <v-row>
      <HorizontalGuide v-if="!isLoading" />
      <p v-if="isLoading">Loading...</p>
    </v-row>
  </div>
</template>

<script>
import HorizontalGuide from "@/components/HorizontalGuide.vue";
import { Country } from "@/models/Country";
import { mapState } from "vuex";

export default {
  name: "ScheduleItem",
  components: { HorizontalGuide },
  computed: {
    countries: {
      get: () => Country.getAllCountries(),
    },
    ...mapState(["locale", "schedule"]),
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

      this.fetchSchedule(this.country);
    },
  },
  created() {
    this.date = new Date();

    this.$watch(
      () => this.country,
      () => {
        this.fetchSchedule(this.country);
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
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
          this.$store.dispatch("setSchedule", entries);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => (this.isLoading = false));
    },
    setDateOneDayBefore() {
      console.log("date", this.date);
      this.date = new Date(this.date.setDate(this.date.getDate() - 1));
      console.log("date", this.date);
    },
    setDateOneDayAfter() {
      console.log("date", this.date);
      this.date = new Date(this.date.setDate(this.date.getDate() + 1));
      console.log("date", this.date);
    },
  },
};
</script>
