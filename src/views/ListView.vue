<template>
  <HeaderBar />
  <v-container style="height: 1000px">
    <SearchItem />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import HeaderBar from "@/components/HeaderBar.vue";
import SearchItem from "@/components/SearchItem.vue";

export default defineComponent({
  name: "ListView",

  components: {
    HeaderBar,
    SearchItem,
  },
});
</script>
