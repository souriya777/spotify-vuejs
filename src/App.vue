<template>
  <div class="app">
    <Nav />
    <browser>
      <div style="text-align: left">width: {{ currentWidth }}px</div>
      <router-view />
    </browser>
    <player />
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Browser from '@/components/Browser'
import Player from '@/components/Player'

export default {
  components: { Nav, Browser, Player },
  data() {
    return {
      currentWidth: 0
    }
  },
  methods: {
    calculateWidth() {
      this.currentWidth = document
        .getElementsByClassName('browser')[0]
        .getBoundingClientRect().width
    }
  },
  mounted() {
    this.calculateWidth()
    window.addEventListener('resize', this.calculateWidth)
  },
  destroyed() {
    window.removeEventListener('resize', this.calculateWidth)
  }
}
</script>

<style lang="stylus">
html
  font-size: 62.5%
  word-spacing: 0.1rem
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box

*, *:before, *:after
  box-sizing: border-box
  margin: 0

body
  font-size: font-size-content

.app
  display: grid
  grid-template-areas: 'nav browser'\
                       'player player'
  grid-template-columns: 23rem 1fr
  grid-template-rows: 1fr 9.1rem
  height: 100vh
  width: 100vw
  font-family: font-family
  text-align: center
  background-color: color-background
  color: color-text

.nav
  grid-area: nav

.browser
  grid-area: browser

.player
  grid-area: player
</style>
