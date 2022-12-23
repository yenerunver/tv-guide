<template>
  <v-app theme="dark">
    <HeaderBar />
    <v-main>
      <v-parallax
        src="assets/background.jpg"
      >
        <router-view />
      </v-parallax>
    </v-main>
    <FooterCopyright />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HeaderBar from "@/components/HeaderBar.vue";
import FooterCopyright from "@/components/FooterCopyright.vue";

export default defineComponent({
  name: "App",

  components: {
    HeaderBar,
    FooterCopyright,
  },
});
</script>
