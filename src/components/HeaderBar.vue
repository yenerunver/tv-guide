<template>
  <v-app-bar
    absolute
    color="#24283D"
    dark
    shrink-on-scroll
    prominent
    fade-img-on-scroll
    scroll-target="#scrolling-techniques-3"
  >
    <router-link :to="'/'" class="text-decoration-none px-4" v-if="backLink"><v-icon icon="mdi-arrow-left-drop-circle-outline"></v-icon
    ></router-link>

    <v-app-bar-title>TV Guide</v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderBar",
  props: ["backLink"],
}
</script>