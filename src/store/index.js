import { createStore } from "vuex";

import spotify from "./modules/spotify";

export default createStore({
  modules: {
    spotify,
  },
});
