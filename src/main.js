import { createApp } from "vue";
import App from "./App.vue";

// /!\ to be includ before any component
// otherwize it would not be a CSS normalizer...
// not include in vue.config.js because it's import for every loaded component...
import "normalize.css";

createApp(App).mount("#app");
