<template>
  <v-select
    v-model="country"
    name="country"
    variant="solo"
    density="compact"
    :items="countries"
    :loading="isLoading"
    item-title="code"
    item-value="code"
  ></v-select>
</template>

<script>
import { Country } from "@/models/Country";
import { mapState } from "vuex";

export default {
  name: "CountrySelector",
  props: ["isLoading"],
  computed: {
    countries: {
      get: () => Country.getAllCountries(),
    },
    ...mapState(["locale", "selectedCountry"]),
  },
  data: () => ({
    country: "",
  }),
  watch: {
    country() {
      this.$store.dispatch(
        "setSelectedCountry",
        Country.getCountryByCode(this.country)
      );
    },
  },
  created() {
    this.$watch(
      () => this.selectedCountry,
      () => {
        if (this.country !== this.selectedCountry.code)
          this.country = this.selectedCountry.code;
      },
      { deep: true, immediate: true }
    );
  },
};
</script>
