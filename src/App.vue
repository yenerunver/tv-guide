<template>
  <v-app theme="dark">
    <HeaderBar :backLink="$route.path !== '/'" />
    <v-main>
      <v-parallax :src="background">
        <router-view />
      </v-parallax>
    </v-main>
    <FooterCopyright />
  </v-app>
</template>

<script>
import { defineComponent } from "vue";

import HeaderBar from "@/components/HeaderBar.vue";
import FooterCopyright from "@/components/FooterCopyright.vue";

export default defineComponent({
  name: "App",
  components: {
    HeaderBar,
    FooterCopyright,
  },
  computed: {
    background: {
      get: () => `${import.meta.env.BASE_URL || "/"}background.jpg`,
    },
  },
});
</script>
