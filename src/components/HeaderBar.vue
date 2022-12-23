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
    <v-app-bar-title>TV Guide</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn>
      <v-select
        variant="solo"
        density="compact"
        :items="['US', 'AU', 'CN', 'DE', 'NL', 'TR', 'UK']"
      ></v-select>
    </v-btn>
  </v-app-bar>
</template>
