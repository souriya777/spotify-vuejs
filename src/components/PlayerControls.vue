<template>
  <div class="player_controls">
    <div class="player_controls_buttons">
      <button @click="previous"><previous-icon /></button>
      <button @click="play"><play-icon /></button>
      <button @click="next"><next-icon /></button>
    </div>
    <div class="temp" style="display: none">
      <button>shuffle</button>
      <button @click="pause"><pause-icon /></button>
      <button>repeat 0</button>
      <button>repeat 1</button>
      <button>repeat 2</button>
    </div>
    <div class="player_bar">bar</div>
  </div>
</template>
<script>
import PlayIcon from "@/components/icons/PlayIcon";
import PauseIcon from "@/components/icons/PauseIcon";
import NextIcon from "@/components/icons/NextIcon";
import PreviousIcon from "@/components/icons/PreviousIcon";

export default {
  components: { PlayIcon, PauseIcon, NextIcon, PreviousIcon },
  methods: {
    play() {
      this.$bus.$emit("play");
    },
    pause() {
      this.$bus.$emit("pause");
    },
    previous() {
      this.$bus.$emit("previous");
    },
    next() {
      this.$bus.$emit("next");
    },
  },
};
</script>
<style>
.player_controls button {
  height: 3.2rem;
  width: 3.2rem;
  border: none;
  background-color: transparent;
  color: var(--color-text);
}
</style>
