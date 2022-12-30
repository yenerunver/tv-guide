<template>
  <div class="pa-8">
    <v-row class="my-8">
      <v-col justify="start">
        <DateSelector />
      </v-col>
      <v-col justify="end" cols="2">
        <CountrySelector />
      </v-col>
    </v-row>
    <div class="text-center" v-if="isLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <HorizontalGuide v-else :groupBy="groupBy" />
  </div>
</template>

<script>
import HorizontalGuide from "@/components/HorizontalGuide.vue";
import { mapState } from "vuex";
import { Episode } from "@/models/Episode";
import CountrySelector from "@/components/CountrySelector.vue";
import DateSelector from "@/components/DateSelector.vue";

export default {
  name: "ScheduleItem",
  props: ["groupBy"],
  components: { CountrySelector, DateSelector, HorizontalGuide },
  data: () => ({
    isLoading: false,
  }),
  computed: mapState(["locale", "schedule", "selectedCountry", "selectedDate"]),
  created() {
    this.$watch(
      () => this.selectedCountry && this.selectedDate,
      () => {
        this.fetchSchedule(this.selectedCountry.code);
      },
      { deep: true, immediate: true }
    );
  },
  methods: {
    fetchSchedule(countryCode) {
      if (this.isLoading) return;

      this.isLoading = true;

      const formattedDate = this.selectedDate.toISOString().split("T")[0];

      if (
        this.schedule &&
        this.schedule[formattedDate] &&
        this.schedule[formattedDate][this.selectedCountry.code] &&
        this.schedule[formattedDate][this.selectedCountry.code][this.groupBy]
      ) {
        this.isLoading = false;
        return;
      }

      fetch(
        `https://api.tvmaze.com/schedule?date=${formattedDate}&country=${countryCode}`
      )
        .then((res) => res.json())
        .then((entries) => {
          const episodes = entries.map((episode) => new Episode(episode));
          this.$store.dispatch("setSchedule", { episodes, formattedDate });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
