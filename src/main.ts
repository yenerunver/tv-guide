import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const store = createStore({
  state() {
    return {
      country: {
        name: "United States",
        code: "US",
        timezone: "America/New_York",
      },
    };
  },
});

const app = createApp(App);

app.use(router);

app.mount("#app");

app.use(store);
