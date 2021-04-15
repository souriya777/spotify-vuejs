import { createApp } from "vue";
import App from "@/App.vue";
import { router } from "@/router";
import store from "@/store";
import { registerComponents } from "@/register-components";

// /!\ to be includ before any component
// otherwize it would not be a CSS normalizer...
// not include in vue.config.js because it's import for every loaded component...
import "normalize.css";

const app = createApp(App);
app.use(router);
app.use(store);

registerComponents(app);

app.mount("#app");
