<template>
  <v-container>
    <div class="my-8">
      <SearchShow />
    </div>
    <div class="my-8">
      <v-card>
        <v-card-title>TV Schedule</v-card-title>

        <v-tabs v-model="tab" fixed-tabs>
          <v-tab value="by-genre">By Genre</v-tab>
          <v-tab value="by-network">By Network</v-tab>
          <v-tab value="top-5">Top 5 Today</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="by-genre">
            <ScheduleItem :groupBy="'byGenre'" />
          </v-window-item>
          <v-window-item value="by-network">
            <ScheduleItem :groupBy="'byNetwork'" />
          </v-window-item>
          <v-window-item value="top-5">
            <TopList />
          </v-window-item>
        </v-window>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SearchShow from "@/components/SearchShow.vue";
import ScheduleItem from "@/components/ScheduleItem.vue";
import TopList from "@/components/TopList.vue";
import { Episode } from "@/models/Episode";

export default defineComponent({
  name: "ListView",

  data() {
    return {
      tab: "by-genre",
    };
  },

  components: {
    ScheduleItem,
    SearchShow,
    TopList,
  },

  methods: {
    getEpisodesByGenre: Episode.getEpisodesByGenre,
    getEpisodesByNetwork: Episode.getEpisodesByNetwork,
  },
});
</script>
