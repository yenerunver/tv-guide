<template>
  <v-col :cols="mdAndUp ? 2 : 3">
    <p>Genre 1</p>
  </v-col>
  <v-col :cols="mdAndUp ? 10 : 9">
    <div class="wrapper overflow-x-visible overflow-y-hidden my-8">
      <v-card v-for="i in [0, 1, 2, 3, 4]" :key="i" width="300">
        <v-row>
          <v-col>
            <v-img src="assets/placeholder.show.medium.png" width="110" />
          </v-col>
          <v-col>
            <h1>Title</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-col>
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

export default {
  name: "HorizontalGuide",
  setup() {
    const { mdAndUp } = useDisplay();

    return { mdAndUp };
  },
};
</script>
