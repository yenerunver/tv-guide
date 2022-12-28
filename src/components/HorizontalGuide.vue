<template>
  <p v-if="loading">Loading...</p>
  <template v-if="!loading">
    <p
      class="text-center"
      v-if="selectedCountry.offset !== locale.country.offset"
    >
      The times shown are converted from<br />the origin country's timezone ({{
        selectedCountry.timezone
      }})<br />to the local timezone ({{ locale.country.timezone }})
    </p>
    <v-row v-for="group in Object.keys(schedule)" :key="group" align="center">
      <v-col :cols="mdAndUp ? 2 : 1">
        <div
          class="text-overline"
          style="transform(270deg); white-space: nowrap;"
        >
          {{ group }}
        </div>
      </v-col>
      <v-col :cols="mdAndUp ? 10 : 11">
        <div class="wrapper overflow-x-visible overflow-y-hidden my-8">
          <v-card v-for="episode in schedule[group]" :key="episode" width="500">
            <v-row max-height="200">
              <v-col align-self="center">
                <v-img :src="this.getImage(episode, 'medium')" width="250" />
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
                <h4>{{ episode.show.name }}</h4>
                <h5 v-if="groupBy === 'genre'">
                  {{ episode.getNetworkName() }}
                </h5>
                <h5 v-if="groupBy === 'network'">
                  {{ episode.getGenresJoint() }}
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
</template>

<style>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 0 50px;
  grid-auto-flow: column;
}
</style>

<script>
import { useDisplay } from "vuetify";
import { Episode } from "@/models/Episode";
import { mapState } from "vuex";

export default {
  name: "HorizontalGuide",
  props: ["loading", "schedule", "groupBy"],
  computed: mapState(["locale", "selectedCountry"]),
  setup() {
    const { mdAndUp } = useDisplay();

    return { mdAndUp };
  },
  methods: {
    getImage: (episode, size) => Episode.getImage(episode, size),
  },
};
</script>
