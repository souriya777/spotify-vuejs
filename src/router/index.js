import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: async () => import("@/views/Home.vue"),
  },
  {
    path: "/spotify-tokens/",
    name: "spotify-tokens",
    component: async () => import("@/views/SpotifyTokens.vue"),
  },
  {
    path: "/albums",
    name: "albums",
    component: async () => import("@/views/Albums.vue"),
  },
  {
    path: "/albums/:albumId",
    name: "album",
    component: async () => import("@/views/Album.vue"),
    props: true,
  },
  {
    path: "/playlists",
    name: "playlists",
    component: async () => import("@/views/Playlists.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: async () => import("@/views/Search.vue"),
  },
];

export const routerHistory = createWebHistory();

export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes,
});
