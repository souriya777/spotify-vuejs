<template>
  <div class="app">
    <Nav />
    <browser>
      <router-view />
    </browser>
  </div>
</template>

<script setup>
import Nav from "@/components/Nav.vue";
import Browser from "@/components/Browser.vue";
</script>

<style>
:root {
  /* FONT */
  --font-family: Avenir, Helvetica, Arial, sans-serif;
  --font-size-content: 1.6rem;
  --font-size-button: 1.4rem;

  /* COLOR */
  --color-background: #000;
  --color-background-2: #121212;
  --color-background-3: #181818;
  --color-text: #fff;
  --color-text-inactive: #b3b3b3;
  --color-button-active: #282828;
  --color-action: #1db954;

  /* HEIGHT */
  --height-player: 9.1rem;
}

html {
  font-size: 62.5%;
  word-spacing: 0.1rem;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body {
  font-size: var(--font-size-content);
}

.app {
  display: grid;
  grid-template-areas:
    "nav browser"
    "player player";
  grid-template-columns: 23rem 1fr;
  grid-template-rows: 1fr var(--height-player);
  height: 100vh;
  width: 100vw;
  font-family: var(--font-family);
  text-align: center;
  background-color: var(--color-background);
  color: var(--color-text);
}

.nav {
  grid-area: nav;
}
.browser {
  grid-area: browser;
  padding: 0 3.2rem;
}
.player {
  grid-area: player;
}
.content-title {
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 2.8rem;
  text-align: left;
}
</style>
