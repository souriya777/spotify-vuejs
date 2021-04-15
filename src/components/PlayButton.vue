<template>
  <button class="play-button">
    <play-icon class="play-button_icon" />
  </button>
</template>
<script>
import PlayIcon from "./icons/PlayIcon.vue";

export default {
  components: { PlayIcon },
};
</script>
<style>
.play-button {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: var(--color-text);
  background-color: var(--color-action);
  border-color: var(--color-action);
  border-style: solid;
  font-size: 1.2rem;
  outline: none;
}
.play-button:hover {
  transform: scale(1.06);
  transition: transform 33ms cubic-bezier(0.3, 0, 0, 1);
}
.play-button:hover > .play-button_icon {
  font-size: 1.2rem;
}
.play-button:active {
  transform: scale(1);
}
</style>
