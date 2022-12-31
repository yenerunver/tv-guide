<template
  v-if="
    schedule &&
    schedule[formattedDate] &&
    schedule[formattedDate][selectedCountry.code] &&
    schedule[formattedDate][selectedCountry.code][groupBy]
  "
>
  <p
    class="text-center"
    v-if="selectedCountry.offset !== locale.country.offset"
  >
    The times shown are converted from<br />the origin country's timezone ({{
      selectedCountry.timezone
    }})<br />to the local timezone ({{ locale.country.timezone }})
  </p>
  <v-row
    v-for="group in Object.keys(
      schedule[formattedDate][selectedCountry.code][groupBy]
    )"
    :key="group"
    align="center"
  >
    <v-col :cols="mdAndUp ? 1 : 2">
      <div class="text-overline text-center text-vertical">
        {{ group }}
      </div>
    </v-col>
    <v-col :cols="mdAndUp ? 11 : 10">
      <div class="wrapper overflow-x-visible overflow-y-hidden my-8">
        <v-card
          v-for="episode in schedule[formattedDate][selectedCountry.code][
            groupBy
          ][group]"
          :key="episode"
          width="500"
          v-on:click.prevent="goToShowPage(episode.getShow().id)"
        >
          <v-row max-height="200">
            <v-col align-self="center" cols="4">
              <v-img :src="episode.getShow().getImage('medium')" width="150" />
            </v-col>
            <v-col>
              <h2>
                {{
                  episode.getAirTime(
                    selectedCountry.offset,
                    locale.country.offset
                  )
                }}
              </h2>
              <h4>
                {{ episode.getShow().getName()
                }}<span v-if="episode.getShow().getRating()">
                  (<v-icon icon="mdi-star" />{{
                    episode.getShow().getRating()
                  }})</span
                >
              </h4>
              <h5 v-if="groupBy === 'genre'">
                {{ episode.getShow().getNetworkName() }}
              </h5>
              <h5 v-if="groupBy === 'network'">
                {{ episode.getShow().getGenresJoint() }}
              </h5>
              <div
                v-html="episode.summary"
                class="overflow-y-auto"
                style="max-height: 100px"
              />
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<style>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 0 50px;
  grid-auto-flow: column;
}
.text-vertical {
  transform: rotate(270deg);
  white-space: nowrap;
}
</style>

<script>
import { useDisplay } from "vuetify";
import { mapState } from "vuex";
import router from "@/router";

export default {
  name: "HorizontalGuide",
  props: ["groupBy"],
  data: () => ({
    formattedDate: "",
  }),
  computed: mapState(["schedule", "locale", "selectedCountry", "selectedDate"]),
  created() {
    this.$watch(
      () => this.selectedDate,
      () => {
        this.formattedDate = this.selectedDate.toISOString().split("T")[0];
      },
      { deep: true, immediate: true }
    );
  },
  setup() {
    const { mdAndUp } = useDisplay();

    return { mdAndUp };
  },
  methods: {
    goToShowPage: (showId) => router.push(`/shows/${showId}`),
  },
};
</script>
