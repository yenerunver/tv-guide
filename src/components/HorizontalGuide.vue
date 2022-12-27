<template>
  <v-row v-for="group in Object.keys(schedule)" :key="group" align="center">
    <v-col v-if="!loading" :cols="mdAndUp ? 2 : 3">
      <div class="text-overline">{{ group }}</div>
    </v-col>
    <v-col v-if="!loading" :cols="mdAndUp ? 10 : 9">
      <div class="wrapper overflow-x-visible overflow-y-hidden my-8">
        <v-card v-for="episode in schedule[group]" :key="episode" width="500">
          <v-row>
            <v-col>
              <v-img
                :src="this.getImage(episode, 'medium')"
                width="250"
              />
            </v-col>
            <v-col>
              <h1>{{ episode.airtime }}</h1>
              <h4>{{ episode.show.name }}</h4>
              <h6>{{ episode.show.network.name }}</h6>
              <p>{{ episode.summary }}</p>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-col>
    <v-col v-if="loading">Loading...</v-col>
  </v-row>
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

export default {
  name: "HorizontalGuide",
  props: ["loading", "schedule"],
  setup() {
    const { mdAndUp } = useDisplay();

    return { mdAndUp };
  },
  methods: {
    getImage: (episode, size) => Episode.getImage(episode, size),
  },
};
</script>
