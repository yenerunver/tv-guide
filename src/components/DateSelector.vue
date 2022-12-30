<template>
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
</template>

<script>
import { Country } from "@/models/Country";
import { mapState } from "vuex";

export default {
  name: "CountrySelector",
  computed: {
    countries: {
      get: () => Country.getAllCountries(),
    },
    ...mapState(["locale", "selectedDate"]),
  },
  data: () => ({
    date: null,
    dateString: "",
  }),
  watch: {
    date() {
      this.$store.dispatch("setSelectedDate", this.date);

      this.dateString = this.date.toLocaleDateString(this.locale.locale, {
        day: "numeric",
        year: "numeric",
        month: "long",
      });
    },
  },
  created() {
    this.date = this.selectedDate;
  },
  methods: {
    setDateOneDayBefore() {
      this.date = new Date(this.date.setDate(this.date.getDate() - 1));
    },
    setDateOneDayAfter() {
      this.date = new Date(this.date.setDate(this.date.getDate() + 1));
    },
  },
};
</script>
