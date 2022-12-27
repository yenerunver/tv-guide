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
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="by-genre">
            <ScheduleByGenre />
          </v-window-item>
          <v-window-item value="by-network">By Network</v-window-item>
        </v-window>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SearchShow from "@/components/SearchShow.vue";
import ScheduleByGenre from "@/components/ScheduleByGenre.vue";

export default defineComponent({
  name: "ListView",

  data() {
    return {
      tab: "by-genre",
    };
  },

  components: {
    ScheduleByGenre,
    SearchShow,
  },
});
</script>
