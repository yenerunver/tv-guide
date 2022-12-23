<template>
  <v-container>
    <SearchShow />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SearchShow from "@/components/SearchShow.vue";

export default defineComponent({
  name: "ListView",

  components: {
    SearchShow,
  },
});
</script>
